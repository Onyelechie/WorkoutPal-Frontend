import { useState, useRef, useEffect } from "react";
import "./UserSearch.css";
import { getRequest } from "../../utils/apiRequests";
import type { User } from "../../types/api";

interface UserSearchProps {
  onUserSelect?: (user: User) => void;
}

function UserSearch({ onUserSelect }: UserSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<number | null>(null);
  // sequence counter to ignore out-of-order responses
  const seq = useRef(0);
  const lastHandledSeq = useRef(0);

  const searchUsers = async (term: string) => {
    const q = term.trim();
    if (!q) {
      setUsers([]);
      return;
    }

    const mySeq = ++seq.current;
    setLoading(true);
    try {
      const response = await getRequest(
        `/users?search=${encodeURIComponent(term)}`,
      );
      // ignore older responses
      if (mySeq < lastHandledSeq.current) return;
      lastHandledSeq.current = mySeq;

      const results = (response.data || []) as typeof users;
      const ql = q.toLowerCase();

      // scoring: prefix matches on name/username come first, then contains, then others
      const scoreFor = (u: any) => {
        const name = (u.name || "").toLowerCase();
        const username = (u.username || "").toLowerCase();
        if (name.startsWith(ql)) return 0;
        if (username.startsWith(ql)) return 1;
        const nameIdx = name.indexOf(ql);
        const userIdx = username.indexOf(ql);
        if (nameIdx >= 0) return 10 + nameIdx;
        if (userIdx >= 0) return 20 + userIdx;
        return 1000;
      };

      results.sort((a: any, b: any) => {
        const sa = scoreFor(a);
        const sb = scoreFor(b);
        if (sa !== sb) return sa - sb;
        // tie-breaker: alphabetical by name then username
        const na = (a.name || "") as string;
        const nb = (b.name || "") as string;
        if (na !== nb) return na.localeCompare(nb);
        return ((a.username || "") as string).localeCompare(
          (b.username || "") as string,
        );
      });

      setUsers(results);
    } catch (error) {
      console.error("Error searching users:", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    // debounce requests to avoid spamming the API
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = window.setTimeout(() => {
      searchUsers(value);
    }, 250) as unknown as number;
  };

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  return (
    <div className="user-search">
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={handleInputChange}
          className="search-input"
        />
        {loading && <div className="search-loading">🔍</div>}
      </div>

      {users.length > 0 && (
        <div className="search-results">
          {users.map((user) => (
            <div
              key={user.id}
              className="search-result-item"
              onClick={() => onUserSelect?.(user)}
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="result-avatar"
              />
              <div className="result-info">
                <span className="result-name">{user.name}</span>
                <span className="result-username">@{user.username}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserSearch;

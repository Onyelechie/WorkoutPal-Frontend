import { useState } from "react";
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

  const searchUsers = async (term: string) => {
    if (!term.trim()) {
      setUsers([]);
      return;
    }

    setLoading(true);
    try {
      const response = await getRequest(`/users?search=${encodeURIComponent(term)}`);
      setUsers(response.data || []);
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
    searchUsers(value);
  };

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
          {users.map(user => (
            <div 
              key={user.id} 
              className="search-result-item"
              onClick={() => onUserSelect?.(user)}
            >
              <img src={user.avatar} alt={user.name} className="result-avatar" />
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
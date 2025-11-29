import { useState, useEffect } from "react";
import { relationshipService } from "../../services/relationshipService";
import type { FollowRequest } from "../../services/relationshipService";
import "./FollowRequestsModal.css";

interface FollowRequestsModalProps {
  userId: number;
  onClose: () => void;
}

function FollowRequestsModal({ userId, onClose }: FollowRequestsModalProps) {
  const [requests, setRequests] = useState<FollowRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<number | null>(null);

  useEffect(() => {
    fetchRequests();
  }, [userId]);

  const fetchRequests = async () => {
    setLoading(true);
    const data = await relationshipService.getPendingFollowRequests(userId);
    setRequests(data);
    setLoading(false);
  };

  const handleAccept = async (requestId: number) => {
    setProcessingId(requestId);
    const success = await relationshipService.respondToFollowRequest(requestId, "accept");
    if (success) {
      // Remove from list
      setRequests(requests.filter(req => req.id !== requestId));
      // Notify to refresh user data
      window.dispatchEvent(new Event("me:refresh"));
        // Notify header to update count
        window.dispatchEvent(new Event("followRequest:update"));
    }
    setProcessingId(null);
  };

  const handleReject = async (requestId: number) => {
    setProcessingId(requestId);
    const success = await relationshipService.respondToFollowRequest(requestId, "reject");
    if (success) {
      // Remove from list
      setRequests(requests.filter(req => req.id !== requestId));
        // Notify header to update count
        window.dispatchEvent(new Event("followRequest:update"));
    }
    setProcessingId(null);
  };

  return (
    <div className="follow-requests-modal-overlay" onClick={onClose}>
      <div className="follow-requests-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="follow-requests-modal-header">
          <h2>Follow Requests</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        
        <div className="follow-requests-list">
          {loading ? (
            <div className="loading-state">Loading requests...</div>
          ) : requests.length === 0 ? (
            <div className="empty-state">No pending follow requests</div>
          ) : (
            requests.map((request) => (
              <div key={request.id} className="follow-request-item">
                <img
                  src={request.user?.avatar || "https://via.placeholder.com/50"}
                  alt={request.user?.name}
                  className="request-avatar"
                />
                <div className="request-info">
                  <span className="request-name">{request.user?.name}</span>
                  <span className="request-username">@{request.user?.username}</span>
                </div>
                <div className="request-actions">
                  <button
                    className="accept-btn"
                    onClick={() => handleAccept(request.id)}
                    disabled={processingId === request.id}
                  >
                    {processingId === request.id ? "..." : "Accept"}
                  </button>
                  <button
                    className="reject-btn"
                    onClick={() => handleReject(request.id)}
                    disabled={processingId === request.id}
                  >
                    {processingId === request.id ? "..." : "Reject"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default FollowRequestsModal;

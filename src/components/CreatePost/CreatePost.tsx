import { useState } from "react";
import { usePosts } from "../../hooks/usePosts";
import "./CreatePost.css";

interface CreatePostProps {
  onPostCreated: () => void;
  onCancel: () => void;
  initialData?: {
    title?: string;
    caption?: string;
    body?: string;
  };
}

export function CreatePost({ onPostCreated, onCancel, initialData }: CreatePostProps) {
  const { createPost, isCreating, error } = usePosts();
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    caption: initialData?.caption || "",
    body: initialData?.body || "",
    status: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createPost({
        ...formData,
        postedBy: 1, // TODO: Get actual user ID from auth context
      });
      onPostCreated();
    } catch (err) {
      // Error is handled by the hook
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="create-post-container" onClick={(e) => e.stopPropagation()}>
        <h2>Create New Post</h2>
        <form onSubmit={handleSubmit} className="create-post-form">
          <input
            type="text"
            name="title"
            placeholder="Post title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="caption"
            placeholder="Caption"
            value={formData.caption}
            onChange={handleChange}
            required
          />
          <textarea
            name="body"
            placeholder="What's on your mind?"
            value={formData.body}
            onChange={handleChange}
            required
          />
          {error && <div className="error-message">{error.message}</div>}
          <div className="form-buttons">
            <button type="button" onClick={onCancel}>Cancel</button>
            <button type="submit" disabled={isCreating}>
              {isCreating ? "Creating..." : "Create Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
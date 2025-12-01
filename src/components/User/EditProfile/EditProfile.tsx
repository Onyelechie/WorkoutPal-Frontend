import { useState } from "react";
import "./EditProfile.css";
import { patchRequest, postRequest } from "../../../utils/apiRequests";
import type { User } from "../../../types/api";
import { getAvatarUrlOrNull } from "../../../utils/imageUtils";

interface EditProfileProps {
  user: User;
  onSave: (updatedUser: User) => void;
  onCancel: () => void;
}

function EditProfile({ user, onSave, onCancel }: EditProfileProps) {
  const [formData, setFormData] = useState({
    name: user.name || "",
    username: user.username || "",
    email: user.email || "",
    age: user.age || 0,
    height: user.height || 0,
    weight: user.weight || 0,
    heightMetric: user.heightMetric || "cm",
    weightMetric: user.weightMetric || "kg",
    avatar: user.avatar || "",
    isPrivate: user.isPrivate ?? false,
    showMetricsToFollowers: user.showMetricsToFollowers ?? false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>(getAvatarUrlOrNull(user.avatar) || "");
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "age"
          ? parseInt(value) || 0
          : name === "height" || name === "weight"
          ? parseFloat(value) || 0
          : value,
    }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        return;
      }
      setAvatarFile(file);
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setError(''); // Clear any previous errors
    }
  };

  const uploadAvatar = async (): Promise<string | null> => {
    if (!avatarFile) return null;
    
    setUploadingAvatar(true);
    try {
      // Convert file to base64
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(avatarFile);
      });
      
      const response = await postRequest(`/users/${user.id}/avatar`, {
        avatar: base64
      });
      
      return response.data.avatar;
    } catch (error: any) {
      console.error('Avatar upload error:', error);
      setError(error.message || 'Failed to upload avatar');
      return null;
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let updatedFormData = { ...formData };
      
      // Upload avatar first if a new one was selected
      if (avatarFile) {
        const avatarUrl = await uploadAvatar();
        if (avatarUrl) {
          updatedFormData.avatar = avatarUrl;
        } else {
          setLoading(false);
          return; // Stop if avatar upload failed
        }
      }
      
      const response = await patchRequest(`/users/${user.id}`, updatedFormData);
      onSave(response.data);
    } catch (error: any) {
      console.error("Update error:", error);
      setError(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-profile-modal">
      <div className="modal-overlay" onClick={onCancel}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Edit Profile</h2>
            <button className="close-btn" onClick={onCancel}>
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="edit-form">
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label>Profile Picture</label>
              <div className="avatar-upload-section">
                {avatarPreview && (
                  <div className="avatar-preview">
                    <img 
                      src={avatarPreview} 
                      alt="Avatar preview" 
                      className="avatar-preview-img"
                    />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="avatar-input"
                />
                <small className="file-info">Max file size: 5MB. Supported formats: JPG, PNG, GIF</small>
              </div>
            </div>

            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    name="isPrivate"
                    checked={formData.isPrivate}
                    onChange={handleInputChange}
                  />
                  Make my profile private
                </label>
              </div>

              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    name="showMetricsToFollowers"
                    checked={formData.showMetricsToFollowers}
                    onChange={handleInputChange}
                  />
                  Show my metrics to followers
                </label>
              </div>
            </div>

            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label>Height</label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleInputChange}
                  min="0"
                  step="0.1"
                />
              </div>

              <div className="form-group">
                <label>Height Unit</label>
                <select
                  name="heightMetric"
                  value={formData.heightMetric}
                  onChange={handleInputChange}
                >
                  <option value="cm">cm</option>
                  <option value="ft">ft</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Weight</label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  min="0"
                  step="0.1"
                />
              </div>

              <div className="form-group">
                <label>Weight Unit</label>
                <select
                  name="weightMetric"
                  value={formData.weightMetric}
                  onChange={handleInputChange}
                >
                  <option value="kg">kg</option>
                  <option value="lbs">lbs</option>
                </select>
              </div>
            </div>

            <div className="form-actions">
              <button type="button" onClick={onCancel} className="cancel-btn">
                Cancel
              </button>
              <button type="submit" disabled={loading || uploadingAvatar} className="save-btn">
                {uploadingAvatar ? "Uploading..." : loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;

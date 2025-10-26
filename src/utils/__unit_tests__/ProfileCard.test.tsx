import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import { relationshipService } from '../../services/relationshipService';
import type { User } from '../../types/api';

vi.mock('../../services/relationshipService');

const mockUser: User = {
  id: 1,
  name: 'Test User',
  username: 'testuser',
  email: 'test@example.com',
  age: 25,
  height: 175,
  weight: 70,
  heightMetric: 'cm',
  weightMetric: 'kg',
  avatar: '',
  isVerified: false,
  Achievements: [],
  followers: [],
  following: [],
  goals: [],
  Posts: [],
  Routines: [],
  googleId: null,
  provider: 'local'
};

describe('ProfileCard', () => {
  const mockOnUserUpdate = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders user information correctly', () => {
    render(
      <ProfileCard
        avatar=""
        name="Test User"
        username="testuser"
        email="test@example.com"
        userId={1}
        postsCount={5}
        followersCount={10}
        followingCount={15}
        user={mockUser}
        onUserUpdate={mockOnUserUpdate}
      />
    );

    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('@testuser')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument();
  });

  it('opens edit profile modal when edit button is clicked', () => {
    render(
      <ProfileCard
        avatar=""
        name="Test User"
        username="testuser"
        email="test@example.com"
        userId={1}
        user={mockUser}
        onUserUpdate={mockOnUserUpdate}
      />
    );

    const editButton = screen.getByRole('button', { name: 'Edit Profile' });
    fireEvent.click(editButton);
    expect(screen.getByRole('heading', { name: 'Edit Profile' })).toBeInTheDocument();
  });

  it('opens followers modal when followers stat is clicked', async () => {
    const mockFollowers = [
      { id: 2, name: 'Follower 1', username: 'follower1', avatar: '' }
    ];
    (relationshipService.getFollowers as any).mockResolvedValue(mockFollowers);

    render(
      <ProfileCard
        avatar=""
        name="Test User"
        username="testuser"
        email="test@example.com"
        userId={1}
        followersCount={1}
        user={mockUser}
        onUserUpdate={mockOnUserUpdate}
      />
    );

    const followersButton = screen.getByText('Followers').closest('.stat-item');
    fireEvent.click(followersButton!);

    expect(relationshipService.getFollowers).toHaveBeenCalledWith(1);
  });
});
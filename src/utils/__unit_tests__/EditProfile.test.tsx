import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EditProfile from '../../components/EditProfile/EditProfile';
import { patchRequest } from '../apiRequests';
import type { User } from '../../types/api';

vi.mock('../apiRequests');

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
  Routines: []
};

describe('EditProfile', () => {
  const mockOnSave = vi.fn();
  const mockOnCancel = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders form with user data', () => {
    render(
      <EditProfile
        user={mockUser}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    );

    expect(screen.getByDisplayValue('Test User')).toBeInTheDocument();
    expect(screen.getByDisplayValue('testuser')).toBeInTheDocument();
    expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('25')).toBeInTheDocument();
  });

  it('calls onCancel when cancel button is clicked', () => {
    render(
      <EditProfile
        user={mockUser}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    );

    fireEvent.click(screen.getByText('Cancel'));
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it('submits form and calls onSave with updated data', async () => {
    const updatedUser = { ...mockUser, age: 26 };
    (patchRequest as any).mockResolvedValue({ data: updatedUser });

    render(
      <EditProfile
        user={mockUser}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    );

    const ageInput = screen.getByDisplayValue('25');
    fireEvent.change(ageInput, { target: { value: '26' } });

    fireEvent.click(screen.getByText('Save Changes'));

    await waitFor(() => {
      expect(patchRequest).toHaveBeenCalledWith('/users/1', expect.objectContaining({
        age: 26
      }));
      expect(mockOnSave).toHaveBeenCalledWith(updatedUser);
    });
  });
});
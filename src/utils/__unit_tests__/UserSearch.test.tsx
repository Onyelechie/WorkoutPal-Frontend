import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UserSearch from '../../components/UserSearch/UserSearch';
import { getRequest } from '../apiRequests';
import { relationshipService } from '../../services/relationshipService';

vi.mock('../apiRequests');
vi.mock('../../services/relationshipService');

describe('UserSearch', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders search input', () => {
    render(<UserSearch />);
    expect(screen.getByPlaceholderText('Search users...')).toBeInTheDocument();
  });

  it('searches for users when input changes', async () => {
    const mockUsers = [
      { id: 1, name: 'Test User', username: 'testuser', email: 'test@example.com' }
    ];
    (getRequest as any).mockResolvedValue({ data: mockUsers });

    render(<UserSearch />);
    
    const searchInput = screen.getByPlaceholderText('Search users...');
    fireEvent.change(searchInput, { target: { value: 'test' } });

    await waitFor(() => {
      expect(getRequest).toHaveBeenCalledWith('/users?search=test');
    });
  });

  it('displays search results', async () => {
    const mockUsers = [
      { id: 1, name: 'Test User', username: 'testuser', email: 'test@example.com' }
    ];
    (getRequest as any).mockResolvedValue({ data: mockUsers });

    render(<UserSearch />);
    
    const searchInput = screen.getByPlaceholderText('Search users...');
    fireEvent.change(searchInput, { target: { value: 'test' } });

    await waitFor(() => {
      expect(screen.getByText('Test User')).toBeInTheDocument();
      expect(screen.getByText('@testuser')).toBeInTheDocument();
    });
  });


});
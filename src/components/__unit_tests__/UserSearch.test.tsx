import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UserSearch from "../User/UserSearch/UserSearch";
import { getRequest } from "../../utils/apiRequests";

vi.mock("../../utils/apiRequests");

describe("UserSearch", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("renders search input", () => {
    render(<UserSearch />);
    expect(screen.getByPlaceholderText("Search users...")).toBeInTheDocument();
  });

  it("searches for users when input changes", async () => {
    const mockUsers = [
      {
        id: 1,
        name: "Test User",
        username: "testuser",
        email: "test@example.com",
      },
    ];
    (getRequest as any).mockResolvedValue({ data: mockUsers });

    render(<UserSearch />);

    const searchInput = screen.getByPlaceholderText("Search users...");
    fireEvent.change(searchInput, { target: { value: "test" } });

    await waitFor(() => {
      expect(getRequest).toHaveBeenCalledWith("/users?search=test");
    });
  });

  it("displays search results", async () => {
    const mockUsers = [
      {
        id: 1,
        name: "Test User",
        username: "testuser",
        email: "test@example.com",
      },
    ];
    (getRequest as any).mockResolvedValue({ data: mockUsers });

    render(<UserSearch />);

    const searchInput = screen.getByPlaceholderText("Search users...");
    fireEvent.change(searchInput, { target: { value: "test" } });

    await waitFor(() => {
      expect(screen.getByText("Test User")).toBeInTheDocument();
      expect(screen.getByText("@testuser")).toBeInTheDocument();
    });
  });
});

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter, Routes, Route, } from 'react-router';
import Login from '../../pages/Auth/Login';
describe("Login acceptance test", () => {

  it("", () => {
    render(
          <MemoryRouter initialEntries={['/auth/login']}>
            <Routes>
              <Route path='/auth/login' element={<Login />}/>
            </Routes>
          </MemoryRouter>
    );
    // screen.debug();

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(true).toBe(true);    
  });
});

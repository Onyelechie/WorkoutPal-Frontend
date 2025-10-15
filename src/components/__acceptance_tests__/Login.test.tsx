import { render, screen } from '@testing-library/react';
import { it, expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route, } from 'react-router';
import Login from '../../pages/Auth/Login';
import Register from '../../pages/Auth/Register';


  it("must be able to register and login", async () => {
    const user = userEvent.setup();
    
    render(
      <MemoryRouter initialEntries={['/auth/login']}>
        <Routes>
          <Route path='/auth/login' element={<Login />}/>
          <Route path='/auth/register' element={<Register />}/>

        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    
    // https://testing-library.com/docs/user-event/intro
    // navigate to Register
    await user.click(screen.getByText("Create Account"));
     
    const inputName = screen.getByPlaceholderText("Name");
    const inputUsername = screen.getByPlaceholderText(/username/i);
    const inputEmail = screen.getByPlaceholderText(/email/i);
    const inputPass = screen.getByPlaceholderText("Password");
    const inputConfirmPass = screen.getByPlaceholderText("Confirm Password");

    await user.type(inputName, "John");
    await user.type(inputUsername, "John");
    await user.type(inputEmail, "john@test.com");
    await user.type(inputPass, "HelloWorld");
    await user.type(inputConfirmPass, "HelloWorld");

    const createAccButton = screen.getByRole("button", {name: /create account/i});
    //must navigate back to Login
    await user.click(createAccButton);
    
    // print current page
    screen.debug();

  });

import React from 'react';

const Navbar = () => {
  return (
    <nav style={{ background: '#333', padding: '1rem' }}>
      <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0 }}>
        <li style={{ marginRight: '1rem' }}>
          <a href="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</a>
        </li>
        <li style={{ marginRight: '1rem' }}>
          <a href="/profile" style={{ color: '#fff', textDecoration: 'none' }}>Profile</a>
        </li>
        <li>
          <a href="/login" style={{ color: '#fff', textDecoration: 'none' }}>Login</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
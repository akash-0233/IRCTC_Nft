import React from 'react';
import './Navbar.css';
import irctcLogo from '../irctc.png';

function Navbar({Toggle}) {
  const toggle = ()=>{
    Toggle();
  }
  return (
    <header className="header">
      <div className="header-inner">
        <img src={irctcLogo} alt="IRCTC Logo" className="logo" />
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item"><a href="/" className="nav-link">Home</a></li>
            <li className="nav-item"><a href="/TicketBuyer" className="nav-link">Book Tickets</a></li>
            <li className="nav-item"><a href="/MyTickets" className="nav-link">MyTickets</a></li>
            <li className="nav-item"><a href="#" className="nav-link" onClick={toggle}>IRCTC</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;

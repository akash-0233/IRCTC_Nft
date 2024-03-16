import React from 'react';
import './Hero.css';
import { useNavigate } from "react-router-dom";

function Hero() {

  
  const NavigateTo = useNavigate();
  const Navigate = ()=>{
    NavigateTo("/TicketBuyer");
  }
  return (

    <section className="hero">
      <div className="hero-content">
        <h2 className="hero-title">Welcome to IRCTC NFT Ticket Buying</h2>
        <p className="hero-text">Buy your train tickets as NFTs and celebrate Holi with joy and colors!</p>
        <a href="#" className="btn btn-primary" onClick={Navigate}>Get Started</a>
      </div>
    </section>
  );
}

export default Hero;

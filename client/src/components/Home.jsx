import React, { useState } from 'react';
import Hero from "./homepage/Hero";
import Navbar from "./homepage/Navbar";
import KeyFeatures from "./homepage/KeyFeatures";
import TicketBuyer from "./Tickets/TicketBuyer";
import MyTickets from "./Tickets/MyTickets";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Irctc from "./Irctc/Irctc";
import Alert from './alert/Alert';

function Home() {
    const [state, setState] = useState({
        web3: null,
        contract: null
    
      });
      const [address, setAddress] = useState("");
      const [alert, setAlert] = useState({type: "",msg: ""});
    
      function SetAlert(type, msg) {
        setAlert({ type: type, msg: msg });
        setTimeout(() => {
          setAlert({ type: "", msg: "" });
    
        }, 4000);
      }
   
    return (
        <>

            <Router>
                <div>
                    <Navbar setState={setState} setAddress={setAddress}  SetAlert={SetAlert} />
                    <Alert alert={alert}></Alert>
                    <Routes> 
                        <Route path="/" element={<Hero />} />
                        <Route path="/TicketBuyer" element={<TicketBuyer state={state} address={address} SetAlert={SetAlert} />} />
                        <Route path="/MyTickets" element={<MyTickets  state={state} address={address} SetAlert={SetAlert}/>} />
                        <Route path="/Irctc" element={<Irctc  state={state} address={address} SetAlert={SetAlert}/>} />
                    </Routes> 
                    <KeyFeatures></KeyFeatures>
                </div>
            </Router>
        </>
    );
}

export default Home;

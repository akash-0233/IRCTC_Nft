import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from 'react';
import Hero from "./homepage/Hero";
import Navbar from "./homepage/Navbar";
import KeyFeatures from "./homepage/KeyFeatures";
import TicketBuyer from "./Tickets/TicketBuyer";
import MyTickets from "./Tickets/MyTickets";

function Home({state,address,Toggle}) {


 
    const router = createBrowserRouter([
        { path: '/', element: <Hero /> },
        { path: '/TicketBuyer', element: <TicketBuyer state={state} address={address}/> },
        { path: '/MyTickets', element: <MyTickets state={state} address={address} /> }
      ])


    return (
        <>
            <Navbar Toggle={Toggle}></Navbar>
            <RouterProvider router={router} />
            <KeyFeatures></KeyFeatures>

            
        </>
    );
}

export default Home;

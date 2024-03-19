
import React, { useState } from 'react';
import './TicketBuyer.css';
import trainIcon from '../train-icon.png';
import irctcStamp from '../irctc.png';

function TicketBuyer({ state, address, SetAlert }) {
    const [trainNumber, setTrainNumber] = useState('');
    const [trainClass, setTrainClass] = useState('');
    const [departureDate, setDepartureDate] = useState('');



    function convertToTimestamp(day, month, year) {
        const date = new Date(year, month - 1, day); // Note: month is 0-indexed in JavaScript
        const timestamp = date.getTime();
        return Math.floor(timestamp / 1000);
    }

    const handleBuyTicket = async (event) => {
        event.preventDefault();
        if (state.contract !== null) {

            const timestamp = convertToTimestamp(departureDate.day, departureDate.month, departureDate.year);
            try {
                await state.contract.methods.buyTicket(trainNumber, trainClass, timestamp).send({
                    from: address,
                    value: 100
                });
                SetAlert("success", "Ticket Booked");
            } catch (error) {
                console.error('Error buying ticket:', error);
            }
        } else if (window.ethereum) {
            SetAlert("error", "Connect Metamask");
        } else {
            SetAlert("error", "Install Metamask");
        }

    };
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i);


    return (
        <div className="ticket-buyer-container">
            <div className="header">
                <img src={trainIcon} alt="Train Icon" className="train-icon" />
                <h1 className="ticket-buyer-title">Book Your Train Ticket</h1>
            </div>
            <form className="ticket-buyer-form" onSubmit={handleBuyTicket}>
                <div className="form-group select-wrapper">
                    <label htmlFor="trainNumber">Train Number</label>
                    <select id="trainNumber" value={trainNumber} onChange={(e) => setTrainNumber(e.target.value)}>
                        <option value="">Select Train Number</option>
                        <option value="82501">82501</option>
                        <option value="85502">82502</option>
                        <option value="85502">82503</option>
                    </select>
                    <input type="text" placeholder="Or type here" value={trainNumber} onChange={(e) => setTrainNumber(e.target.value)} />
                </div>
                <div className="form-group select-wrapper">
                    <label htmlFor="trainClass">Class</label>
                    <select id="trainClass" value={trainClass} onChange={(e) => setTrainClass(e.target.value)}>
                        <option value="">Select Class</option>
                        <option value="Executive Class">General Class</option>
                        <option value="Chair Car">ChairCar Class</option>
                        <option value="Executive Class">Executive Class</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="departureDate">Departure Date</label>
                    <div className="departure-date select-wrapper">
                        <select value={departureDate.day} onChange={(e) => setDepartureDate({ ...departureDate, day: e.target.value })}>
                            <option value="">Day</option>
                            {days.map(day => <option key={day} value={day}>{day}</option>)}
                        </select>
                        <select value={departureDate.month} onChange={(e) => setDepartureDate({ ...departureDate, month: e.target.value })}>
                            <option value="">Month</option>
                            {months.map((month, index) => <option key={index} value={index + 1}>{month}</option>)}
                        </select>
                        <select value={departureDate.year} onChange={(e) => setDepartureDate({ ...departureDate, year: e.target.value })}>
                            <option value="">Year</option>
                            {years.map(year => <option key={year} value={year}>{year}</option>)}
                        </select>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Buy Ticket</button>
            </form>
            <img src={irctcStamp} alt="IRCTC Stamp" className="irctc-stamp" />
        </div>
    );
}

export default TicketBuyer;

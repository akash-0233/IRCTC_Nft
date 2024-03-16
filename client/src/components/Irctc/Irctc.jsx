import React, { useState } from 'react'
import './Irctc.css'

export default function Irctc({ state, address, Toggle }) {

    const [tNumber, setTNumber] = useState(""); // Number format
    const [nftUri, setNftUri] = useState("");   // string format
    const [getUri, setGeturi] = useState("");   // string format
    const [tPrice, setTPrice] = useState(""); // Number format   
    const [tLimit, setTLimit] = useState(""); // Number format
    const [dLocation, setDLocation] = useState("");  // string format
    const [dTime, setDTime] = useState(""); // Want TimeStamp
    const [aLocation, setALocation] = useState("");  // string format
    const [aTime, setATime] = useState(""); // Want TimeStamp

    // SetTrainNumber(uint);
    const SetTrainNumber = async () => {
        try {
            await state.contract.methods.SetTrainNumber(tNumber).send({
                from: address
            });
            alert("Train Number Added");
        } catch (error) {
            console.error('Error Adding train Number:', error);
        }
    }

    // setNftURI(string);
    const SetNftUri = async () => {
        try {
            await state.contract.methods.setNftURI(nftUri).send({ from: address });
            alert("Nft Uri Changed");
        } catch (error) {
            console.error("Error while Changing Nft Uri : ", error);
        }
    }

    // getNftUri();
    const GetNftUri = () => {
        state.contract.methods.getNftURI().call()
            .then(uri => {
                console.log(uri); // This should log the actual URI value
                console.log(typeof uri); // This should log "string"
            })
            .catch(error => {
                console.error("Error fetching NFT URI:", error);
            });
    }

    // setTicketPrice(uint);
    const SetTicketPrice = async () => {
        try {
            await state.contract.methods.setTicketPrice(tPrice).call();
            alert("Ticket Price Updated");
        } catch (error) {
            console.error("Error on ticket price updating :", error);
        }
    }

    // setTransactionLimit(uint);
    const SetTransactionLimit = async () => {
        try {
            await state.contract.methods.setTransactionLimit(tLimit).send({ from: address });
            alert("Transaction Limit Updated");
        } catch (error) {
            console.error("Error while Updating Transaction Limit :", error);
        }
    }

    // setSchedule(uint Tnumber, string DLocation, uint DTime,  string ALocation, uint A time);
    const SetSchedule = async () => {
        try {
            await state.contract.methods.setSchedule(tNumber, dLocation, dTime, aLocation, time).send({ from: address });
            alert("Schedule Updated");
        } catch (error) {
            console.error("Error While Updating Schedule :", error);
        }
    }


    return (
        <>
            <div className="irctc-container">
            <div className="irctc-section">
                <h2>Set Train Number</h2>
                <div className="input-group">
                    <label htmlFor="tNumber">Train Number:</label>
                    <input type="text" id="tNumber" value={tNumber} onChange={(e) => setTNumber(e.target.value)} />
                </div>
                <button onClick={SetTrainNumber}>Set Train Number</button>
            </div>
            
            <div className="irctc-section">
                <h2>Set NFT URI</h2>
                <div className="input-group">
                    <label htmlFor="nftUri">NFT URI:</label>
                    <input type="text" id="nftUri" value={nftUri} onChange={(e) => setNftUri(e.target.value)} />
                </div>
                <button onClick={SetNftUri}>Set NFT URI</button>
            </div>
            
            <div className="irctc-section">
                <h2>Get NFT URI</h2>
                <button onClick={GetNftUri}>Get NFT URI</button>
                <p>{getUri}</p>
            </div>
            
            <div className="irctc-section">
                <h2>Set Ticket Price</h2>
                <div className="input-group">
                    <label htmlFor="tPrice">Ticket Price:</label>
                    <input type="text" id="tPrice" value={tPrice} onChange={(e) => setTPrice(e.target.value)} />
                </div>
                <button onClick={SetTicketPrice}>Set Ticket Price</button>
            </div>
            
            <div className="irctc-section">
                <h2>Set Transaction Limit</h2>
                <div className="input-group">
                    <label htmlFor="tLimit">Transaction Limit:</label>
                    <input type="text" id="tLimit" value={tLimit} onChange={(e) => setTLimit(e.target.value)} />
                </div>
                <button onClick={SetTransactionLimit}>Set Transaction Limit</button>
            </div>

                <div className="irctc-section">
                    <h2>Set Schedule</h2>
                    <div className="schedule-inputs">
                        <div className="input-group">
                            <label htmlFor="dLocation">Departure Location:</label>
                            <input type="text" id="dLocation" value={dLocation} onChange={(e) => setDLocation(e.target.value)} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="dTime">Departure Time:</label>
                            <input type="text" id="dTime" value={dTime} onChange={(e) => setDTime(e.target.value)} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="aLocation">Arrival Location:</label>
                            <input type="text" id="aLocation" value={aLocation} onChange={(e) => setALocation(e.target.value)} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="aTime">Arrival Time:</label>
                            <input type="text" id="aTime" value={aTime} onChange={(e) => setATime(e.target.value)} />
                        </div>
                    </div>
                    <div className="schedule-actions">
                        <button onClick={SetSchedule}>Set Schedule</button>
                    </div>
                </div>

            </div>
        </>
    )
}

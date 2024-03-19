import React, { useState } from 'react'
import './Irctc.css'

export default function Irctc({ state, address,SetAlert }) {

    const [tNumber, setTNumber] = useState("");
    const [trainNumber, setTrainNumber] = useState("");
    const [nftUri, setNftUri] = useState("");
    const [getUri, setGeturi] = useState("");
    const [tPrice, setTPrice] = useState("");
    const [tLimit, setTLimit] = useState("");
    const [dLocation, setDLocation] = useState("");
    const [dTime, setDTime] = useState("");
    const [aLocation, setALocation] = useState("");
    const [aTime, setATime] = useState("");
    const [uri, setUri] = useState("");

    const SetTrainNumber = async () => {
        if (state.contract !== null) {
             try {
            await state.contract.methods.SetTrainNumber(trainNumber).send({
                from: address
            });
            SetAlert("success","Train number added");
        } catch (error) {
            console.error('Error Adding train Number:', error);
        }
        } else if(window.ethereum){
            SetAlert("error","Connect Metamask");            
        }else{
            SetAlert("error","Install Metamask");
        }
       
    }

    const SetNftUri = async () => {
        if (state.contract !== null) {
            try {
            await state.contract.methods.setNftURI(nftUri).send({ from: address });
            SetAlert("success", "NFT uri added");
        } catch (error) {
            console.error("Error while Changing Nft Uri : ", error);
        }
        } else if(window.ethereum){
            SetAlert("error","Connect Metamask");            
        }else{
            SetAlert("error","Install Metamask");
        }
        
    }

    const GetNftUri = async () => {
        if (state.contract !== null) {
            try {
            const _uri = await state.contract.methods.getNftURI().call();
            setUri(_uri);
        } catch (error) {
            console.error("Error fetching NFT URI:", error);

        }
        } else if(window.ethereum){
            SetAlert("error","Connect Metamask");            
        }else{
            SetAlert("error","Install Metamask");
        }
        


    }

    const SetTicketPrice = async () => {
        if (state.contract !== null) {
             try {
            await state.contract.methods.setTicketPrice(tPrice).send({ from: address });
            SetAlert("success","Ticket Price Updated");
        } catch (error) {
            console.error("Error on ticket price updating :", error);
        }
        } else if(window.ethereum){
            SetAlert("error","Connect Metamask");            
        }else{
            SetAlert("error","Install Metamask");
        }
       
    }

    const SetTransactionLimit = async () => {
        if (state.contract !== null) {
             try {
            await state.contract.methods.setTransactionLimit(tLimit).send({ from: address });
            SetAlert("success","Transaction Limit Updated");
        } catch (error) {
            console.error("Error while Updating Transaction Limit :", error);
        }
        } else if(window.ethereum){
            SetAlert("error","Connect Metamask");            
        }else{
            SetAlert("error","Install Metamask");
        }
       
    }

    const SetSchedule = async () => {
        if (state.contract !== null) {
             try {
                console.log(tNumber);
                console.log(dLocation);
                console.log(dTime);
                console.log(aLocation);
                console.log(aTime);
            await state.contract.methods.SetSchedule(tNumber, dLocation, dTime, aLocation, aTime).send({ from: address });
            SetAlert("success","Schedule Updated");
        } catch (error) {
            console.error("Error While Updating Schedule :", error);
        }
        } else if(window.ethereum){
            SetAlert("error","Connect Metamask");            
        }else{
            SetAlert("error","Install Metamask");
        }
       
    }


    return (
        <>
            <div className="irctc-container">
                <div className="irctc-section">
                    <h2>Set Train Number</h2>
                    <div className="input-group">
                        <label htmlFor="tNumber">Train Number:</label>
                        <input type="text" id="tNumber" value={trainNumber} onChange={(e) => setTrainNumber(e.target.value)} />
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
                    <div className="uri-container">
                        <p className="uri-text">{uri}</p>
                    </div>
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
                            <label htmlFor="trainNumber">Train Number:</label>
                            <input type="text" id="trainNumber" value={tNumber} onChange={(e) => setTNumber(e.target.value)} />
                        </div>
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

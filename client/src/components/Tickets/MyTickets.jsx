import React, { useState, useEffect } from 'react';
import './MyTickets.css';

function MyTickets({ state, address }) {
    const [pinataTicketId, setPinataTicketId] = useState();
    const [nftId, setNftId] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    const GetNftId = async () => {
        console.log("Get Id Called");
        try {
            const tokenIdsObject = await state.contract.methods.tokensOf(address).call();
            const tokenIds = Object.values(tokenIdsObject).map(bigInt => Number(bigInt));
            tokenIds.push(11);
            tokenIds.push(11);
            tokenIds.push(11);
            setNftId(tokenIds);
        } catch (error) {
            console.error("Error fetching token IDs:", error);
        }
    }

    useEffect(() => {
        state.contract && address && GetNftId();
        const GetNftUri = () => {
            console.log("get uri called");
            state.contract.methods.getNftURI().call()
                .then(uri => {
                    console.log(uri);
                    console.log(typeof uri);
                    setPinataTicketId(uri);
                })
                .catch(error => {
                    console.error("Error fetching NFT URI:", error);
                });
        }
        state.contract && address && GetNftUri();
    }, [])

    const handleImageClick = (imageId) => {
        setSelectedImage(imageId);
    }

    const handleCloseModal = () => {
        setSelectedImage(null);
    }

    return (
        <div className="my-tickets-container">
    <h2 className="my-tickets-info">My Tickets</h2>
 
    {nftId.map((num, index) => (
        <div key={index} className="ticket-container">
            <img
                src={`https://gateway.pinata.cloud/ipfs/${pinataTicketId}`}
                alt={`Ticket ${index}`}
                className="ticket-image"
                onClick={() => handleImageClick(index)}
            />
            {selectedImage === index && (
                <div className="modal" onClick={handleCloseModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <span className="close" onClick={handleCloseModal}>&times;</span>
                        <img
                            src={`https://gateway.pinata.cloud/ipfs/${pinataTicketId}`}
                            alt={`Ticket ${selectedImage}`}
                            className="modal-image"
                        />
                        <p className="modal-text">Hello</p>
                    </div>
                </div>
            )}
        </div>
    ))}
</div>

    );
}

export default MyTickets;

import React, { useState, useEffect } from 'react';
import './MyTickets.css';

function MyTickets({ state, address, SetAlert }) {
    const [pinataTicketId, setPinataTicketId] = useState();
    const [nftId, setNftId] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [data, setData]= useState([]);
    const [tStatus, setTStatus] = useState();


    const GetNftId = async () => {
        if (state.contract !== null) {
                try {
            const tokenIdsObject = await state.contract.methods.tokensOf(address).call();
            const tokenIds = Object.values(tokenIdsObject).map(bigInt => Number(bigInt));
            tokenIds.length===0?setTStatus("You dont have any Tickets"):null;

            setNftId(tokenIds);

        } catch (error) {
            console.error("Error fetching token IDs:", error);
        }
        } else if(window.ethereum){
            SetAlert("error","Connect Metamask");            
        }else{
            SetAlert("error","Install Metamask");
        }
    
    }

    useEffect(() => {
        if (state.contract !== null) {
             setTimeout(() => {
            state.contract && address && GetNftId();
            const GetNftUri = async () => {
                await state.contract.methods.getNftURI().call()
                    .then(uri => {

                        setPinataTicketId(uri);
                    })
                    .catch(error => {
                        console.error("Error fetching NFT URI:", error);
                    });
            }
            state.contract && address && GetNftUri();
        }, 500);
        } else if(window.ethereum){
            SetAlert("error","Connect Metamask");            
        }else{
            SetAlert("error","Install Metamask");
        }
       

    }, [state, address]);

    const handleImageClick = (imageId) => {
        setSelectedImage(imageId);
        GetMetaData(imageId);
    }

    const handleCloseModal = () => {
        setSelectedImage(null);
    }
    const GetMetaData = async (id) => {
        setData([]);
        const MetaData = await state.contract.methods.GetMetadata(nftId[id]).call()
        for (let index = 0; index <= 7; index++) {
            setData(prevItems =>[...prevItems,MetaData[index]]);
            console.log(`"Data ${index} is ${MetaData[index]}`);;

        }

        
    }

    function TimeConverter(time24) {
        // Ensure time24 is a number between 1 and 24
        console.log("Input time is : ", time24)
        if (typeof time24 !== 'number' || time24 < 1 || time24 > 24) {
            console.error('Input is not a valid hour (must be a number between 1 and 24)',time24);
            return null; // Or handle the error in a different way
        }

        // Determine AM/PM and adjust hours accordingly
        const meridian = time24 >= 12 ? 'PM' : 'AM';
        const adjustedHours = time24 % 12 || 12; // Ensure 12-hour format for 0 and 12

        // Construct the 12-hour time string
        const time12 = `${adjustedHours}:00 ${meridian}`;
        console.log("Time12 is :", time12);

        return time12;
    }

    function date(timestamp) {
        
        console.log("TimeStam is: ",timestamp);
        const date = new Date(timestamp * 1000); // Convert Unix timestamp to milliseconds
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' }); // Get month name
        const year = date.getFullYear();
        console.log("date is", day, month, year);
        // alert(`Day${day}-Month${month}-Year${year}`)
        return `${day}-${month}-${year}`;
    }

    return (
        <div className="my-tickets-container">
            <h2 className="my-tickets-info">My Tickets</h2><br></br>
            <h3 className='my-tickets-info'>{tStatus}</h3><br></br>
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
                                <p className="modal-text">{Number(data[0])}</p>
                                <p className="modal-text1">{data[1]}</p>
                                <p className="modal-text7">↗️DEPARTURE ↘️ARRIVAL</p>
                                <p className="modal-text2" >{data[2]}</p>
                                <p className="modal-text4">{TimeConverter(Number(data[4]))} <span style={{ marginLeft: '7px' }}/>| {date(Number(data[3]))}</p>
                                <p className='modal-text5'>{data[5]} </p>
                                <p className="modal-text6">{TimeConverter(Number(data[6]))}<span style={{ marginLeft: '7px' }}/>| {date(Number(data[3]))}</p>                             

                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>

    );
}

export default MyTickets;

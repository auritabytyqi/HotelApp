import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'antd';
import  availableRoom from './../assets/availableRoom1.png'
import useFetchRooms from '../hooks/useFetchRooms';




const RoomTable = (filter :{filter: string}) => {
  const [selectedItem, setSelectedItem] = useState(null);
 
  let roomData = useFetchRooms()[0]
  const handleClick = (item: any) => {
    setSelectedItem(item);
  };
 

 
  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  const getColor = (index: any)  => {
    if(roomData[index].isFree){
        return "#0b8009"
    }
    else { return "#d11919" }
  }


  return (
  
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: "0vw", marginTop: "3vh" }}>
      <div style={{ maxHeight: '70vh', overflowY: 'scroll' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(16, 1fr)', gridTemplateRows: 'repeat(6, 1fr)', gap: '10px' }}>
          {roomData.map((item: any, index) => (
            <div
              key={index}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: getColor(index), borderRadius: '5px', cursor: 'pointer', padding: '5px', color: "white" }}
              onClick={() => handleClick(index)}
            >
              <div style={{ fontSize: '14px' }}>{item.roomNumber}</div>
              <div style={{  backgroundImage: `url(${availableRoom})`, backgroundRepeat: "no-repeat",backgroundSize: "cover", width: "55px", height: "50px" }}></div>
            </div>
          ))}
        </div>
      </div>

      {selectedItem!==null && (
        <Modal
          visible={selectedItem!==0? selectedItem: true}
          title={`Room ${roomData[selectedItem].roomNumber}`}
          onCancel={handleCloseModal}
          footer={null}
        >
         {roomData[selectedItem].floor && <p><b>Floor:</b> {roomData[selectedItem].floor}</p>}
         {roomData[selectedItem].numberOfPeople && <p><b>Number of People: </b>{roomData[selectedItem].numberOfPeople}</p>}
         {roomData[selectedItem].price && <p><b>Price: </b>{roomData[selectedItem].price} $ per one night</p>}
         {roomData[selectedItem].bathroom && <p> <b>Has Bathroom? </b> {roomData[selectedItem].bathroom? 'Yes': 'No'} </p>}
         {roomData[selectedItem].snacks && <p><b>Has Snacks? </b> {roomData[selectedItem].snacks? 'Yes': 'No'} </p>}
         {roomData[selectedItem].telephone && <p><b>Has Telephone? </b> {roomData[selectedItem].telephone? 'Yes': 'No'} </p>}
         {roomData[selectedItem].view &&<p><b>View: </b> {roomData[selectedItem].view} </p>}
        </Modal>
      )}
    </div>
  );
};

export default RoomTable;

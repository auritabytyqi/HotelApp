import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'antd';
import  availableRoom from './../assets/availableRoom1.png'
import useFetchAvailableRooms from '../hooks/useFetchAvailableRooms';
import { doc, updateDoc } from 'firebase/firestore';
import { firebaseDB } from '../utils/firebaseConfig';
import useToast from '../hooks/useToast';
import { reload } from 'firebase/auth';
import useGetRoom from '../hooks/useGetRoom';
import { useAppSelector } from '../app/hooks';
import { RoomType } from "../utils/types";
// const roomData = [
//     {
//         id: "isdnansi",
//         roomNumber: 101,
//         floor: 1,
//         bathroom: true,
//         isFree: true,
//         numberOfPeople: 3,
//         price: 20,
//         telephone: false,
//         snacks: true, 
//         view: "Sea View"
//     },
//     {
//         id: "isdnansi",
//         roomNumber: 101,
//         floor: 1,
//         bathroom: true,
//         isFree: true,
//         numberOfPeople: 2,
//         price: 20,
//         telephone: false,
//         snacks: true
//     },
//     {
//         id: "isdnansi",
//         roomNumber: 101,
//         floor: 1,
//         bathroom: true,
//         isFree: true,
//         numberOfPeople: 2,
//         price: 20,
//         telephone: false,
//         snacks: true
//     },
//     {
//         id: "isdnansi",
//         roomNumber: 101,
//         floor: 1,
//         bathroom: true,
//         isFree: true,
//         numberOfPeople: 2,
//         price: 20,
//         telephone: false,
//         snacks: true
//     },
//     {
//         id: "isdnansi",
//         roomNumber: 101,
//         floor: 1,
//         bathroom: true,
//         isFree: true,
//         numberOfPeople: 2,
//         price: 20,
//         telephone: false,
//         snacks: true
//     }, {
//         id: "isdnansi",
//         roomNumber: 101,
//         floor: 1,
//         bathroom: true,
//         isFree: true,
//         numberOfPeople: 2,
//         price: 20,
//         telephone: false,
//         snacks: true
//     },
//     {
//         id: "isdnansi",
//         roomNumber: 101,
//         floor: 1,
//         bathroom: true,
//         isFree: true,
//         numberOfPeople: 2,
//         price: 20,
//         telephone: false,
//         snacks: true
//     },
//     {
//         id: "isdnansi",
//         roomNumber: 101,
//         floor: 1,
//         bathroom: true,
//         isFree: true,
//         numberOfPeople: 2,
//         price: 20,
//         telephone: false,
//         snacks: true
//     },
//     {
//         id: "isdnansi",
//         roomNumber: 101,
//         floor: 1,
//         bathroom: true,
//         isFree: true,
//         numberOfPeople: 2,
//         price: 20,
//         telephone: false,
//         snacks: true
//     },
//     {
//         id: "isdnansi",
//         roomNumber: 101,
//         floor: 1,
//         bathroom: true,
//         isFree: true,
//         numberOfPeople: 2,
//         price: 20,
//         telephone: false,
//         snacks: true
//     }, {
//         id: "isdnansi",
//         roomNumber: 101,
//         floor: 1,
//         bathroom: true,
//         isFree: true,
//         numberOfPeople: 2,
//         price: 20,
//         telephone: false,
//         snacks: true
//     },
//     {
//         id: "isdnansi",
//         roomNumber: 101,
//         floor: 1,
//         bathroom: true,
//         isFree: true,
//         numberOfPeople: 3,
//         price: 20,
//         telephone: false,
//         snacks: true
//     },
//     {
//         id: "isdnansi",
//         roomNumber: 101,
//         floor: 1,
//         bathroom: true,
//         isFree: true,
//         numberOfPeople: 4,
//         price: 20,
//         telephone: false,
//         snacks: true
//     }, {
//         id: "isdnansi",
//         roomNumber: 101,
//         floor: 1,
//         bathroom: true,
//         isFree: true,
//         numberOfPeople: 3,
//         price: 20,
//         telephone: false,
//         snacks: true
//     },
//     {
//         id: "isdnansi",
//         roomNumber: 101,
//         floor: 1,
//         bathroom: true,
//         isFree: true,
//         numberOfPeople: 2,
//         price: 20,
//         telephone: false,
//         snacks: true
//     },
//     {
//         id: "isdnansi",
//         roomNumber: 101,
//         floor: 1,
//         bathroom: true,
//         isFree: true,
//         numberOfPeople: 2,
//         price: 20,
//         telephone: false,
//         snacks: true
//     },
//     {
//         id: "isdnansi",
//         roomNumber: 101,
//         floor: 1,
//         bathroom: true,
//         isFree: true,
//         numberOfPeople: 2,
//         price: 20,
//         telephone: false,
//         snacks: true
//     },
//     {
//         id: "isdnansi",
//         roomNumber: 101,
//         floor: 1,
//         bathroom: true,
//         isFree: true,
//         numberOfPeople: 2,
//         price: 20,
//         telephone: false,
//         snacks: true
//     }, {
//         id: "isdnansi",
//         roomNumber: 101,
//         floor: 1,
//         bathroom: true,
//         isFree: true,
//         numberOfPeople: 2,
//         price: 20,
//         telephone: false,
//         snacks: true
//     },
//     {
//         id: "isdnansi",
//         roomNumber: 101,
//         floor: 1,
//         bathroom: true,
//         isFree: true,
//         numberOfPeople: 2,
//         price: 20,
//         telephone: false,
//         snacks: true
//     },
//     {
//         id: "isdnansi",
//         roomNumber: 101,
//         floor: 1,
//         bathroom: true,
//         isFree: true,
//         numberOfPeople: 2,
//         price: 20,
//         telephone: false,
//         snacks: true
//     },
//     {
//         id: "isdnansi",
//         roomNumber: 101,
//         floor: 1,
//         bathroom: true,
//         isFree: true,
//         numberOfPeople: 2,
//         price: 20,
//         telephone: false,
//         snacks: true
//     },
//     {
//         id: "isdnansi",
//         roomNumber: 101,
//         floor: 1,
//         bathroom: true,
//         isFree: true,
//         numberOfPeople: 2,
//         price: 20,
//         telephone: false,
//         snacks: true,
//         view: "Sea View"
//     }, {
//         id: "isdnansi",
//         roomNumber: 101,
//         floor: 1,
//         bathroom: true,
//         isFree: true,
//         numberOfPeople: 2,
//         price: 20,
//         telephone: false,
//         snacks: true
//     },
//     {
//         id: "isdnansi",
//         roomNumber: 101,
//         floor: 1,
//         bathroom: true,
//         isFree: true,
//         numberOfPeople: 3,
//         price: 20,
//         telephone: false,
//         snacks: true
//     },
//     {
//         id: "isdnansi",
//         roomNumber: 101,
//         floor: 1,
//         bathroom: true,
//         isFree: true,
//         numberOfPeople: 4,
//         price: 20,
//         telephone: false,
//         snacks: true,
//         view: "City View"
//     }
//   ]


const FreeRoomTable = (filter :{filter: string}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedRoomItem, setSelectedRoomItem] = useState(false);
  let roomData = useFetchAvailableRooms()[0]
  const uid = useAppSelector((zoomApp) => zoomApp.auth.userInfo?.uid);
  let room = useGetRoom();
  
  

  const [createToast] = useToast();
 
    switch(filter.filter){
        case "sea":
            roomData = roomData.filter((room)=>room.view === "Sea View")
            break;
        case "city": 
            roomData = roomData.filter((room)=>room.view === "City View")
            break;
        case "1":
            roomData = roomData.filter((room)=>room.floor === parseInt(filter.filter))
            break;
        case "2":
            roomData = roomData.filter((room)=>room.floor === parseInt(filter.filter))
            break;
        case "3":
            roomData = roomData.filter((room)=>room.floor === parseInt(filter.filter))
                    break;
        case "4":
            roomData = roomData.filter((room)=>room.floor === parseInt(filter.filter))
            break;
        case "5":
            roomData = roomData.filter((room)=>room.floor === parseInt(filter.filter))
            break;
        case "6":
            roomData = roomData.filter((room)=>room.floor === parseInt(filter.filter))
            break;
        default: 
            roomData = roomData
            break;    
      }
 
 

 const editRoom = async (roomId: string, userId: string) => {
    const editedRoom = {
      isFree: false,
      user: userId
    };
    const docRef = doc(firebaseDB, "rooms", roomId!);
    await updateDoc(docRef, editedRoom);
    createToast({ title: "Room is booked", type: "success" });
    handleCloseModal()
    window.location.reload()
  };

  const leaveRoom = async (roomId: string, userId: string) => {
    const editedRoom = {
      isFree: true,
      user: ""
    };
    const docRef = doc(firebaseDB, "rooms", roomId!);
    await updateDoc(docRef, editedRoom);
    createToast({ title: "You left the room", type: "success" });
    handleCloseModal2()
    window.location.reload()
  };
  const handleClick = (item: any) => {
    setSelectedItem(item);
  };
 
  function HandleBookRoomClick (roomId: string, uid: string) {
    if(room[0].length<1){
    editRoom(roomId, uid)
   
   }
   else {
    createToast({ title: "You have a room", type: "danger" });
   }
  }

  function HandleLeaveRoomClick (roomId: string, uid: string) {
   
    leaveRoom(roomId, uid)    
   }
  const handleCloseModal = () => {
    setSelectedItem(null);
  };
  const handleCloseModal2 = () => {
    setSelectedRoomItem(false);
  };

  return (
  
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: "-35vw", marginTop: "3vh" }}>
        <Button style={{backgroundColor: "red", marginLeft: "65vw", marginTop: "-15vh", marginBottom:"3vh" , borderColor: "red", color:"white"}} onClick={() =>setSelectedRoomItem(true)}>Your Room</Button>
        {room[0][0] && <Modal
          visible={selectedRoomItem}
          title={`Room ${room[0][0].roomNumber}`}
          onCancel={handleCloseModal2}
          footer={null}
        >
         {room[0][0].floor && <p><b>Floor:</b> {room[0][0].floor}</p>}
         {room[0][0].numberOfPeople && <p><b>Number of People: </b>{room[0][0].numberOfPeople}</p>}
         {room[0][0].price && <p><b>Price: </b>{room[0][0].price} $ per one night</p>}
         {room[0][0].bathroom && <p> <b>Has Bathroom? </b> {room[0][0].bathroom? 'Yes': 'No'} </p>}
         {room[0][0].snacks && <p><b>Has Snacks? </b> {room[0][0].snacks? 'Yes': 'No'} </p>}
         {room[0][0].telephone && <p><b>Has Telephone? </b> {room[0][0].telephone? 'Yes': 'No'} </p>}
         {room[0][0].view &&<p><b>View: </b> {room[0][0].view} </p>}
         <Button type='primary' style={{ marginLeft: " 200px", marginTop: '10px', backgroundColor: "red"}} onClick={() => HandleLeaveRoomClick(room[0][0].roomId, uid? uid: "")}> Leave Room</Button>

        </Modal> }
      
      <div style={{ maxHeight: '60vh', overflowY: 'scroll' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gridTemplateRows: 'repeat(6, 1fr)', gap: '10px' }}>
          {roomData.map((item: any, index) => (
            <div
              key={index}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#327fa8', borderRadius: '5px', cursor: 'pointer', padding: '5px', color: "white" }}
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
         <Button type='primary' style={{ marginLeft: " 200px", marginTop: '10px', backgroundColor: "green"}} onClick={() => HandleBookRoomClick(roomData[selectedItem].roomId, uid? uid: "")}> Book Room</Button>
        </Modal>
      )}
    </div>
  );
};

export default FreeRoomTable;

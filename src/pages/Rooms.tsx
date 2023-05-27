import React, { useEffect, useState } from "react";
import { EuiCard, EuiFlexGroup, EuiFlexItem, EuiImage, EuiTextColor } from "@elastic/eui";
import { useNavigate } from "react-router-dom";

import room from "../assets/roomImage.jpg";
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";
import RoomRable from "./RoomTable";

import { useAppSelector } from "../app/hooks";


function Rooms() {
  useAuth();
  const [darkTheme, setDarkTheme] = useState(false);
  const isDarkTheme = useAppSelector((zoomApp) => zoomApp.auth.isDarkTheme);
  const [selectedKeyValue, setSelectedKeyValue] = useState("");
  useEffect(()=>{
    if(isDarkTheme){
        setDarkTheme(true);
    }
  }, [isDarkTheme])


  const theme = darkTheme? "dark": "light"
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
         
        }}
      >
        <Header />

        <EuiFlexGroup
          justifyContent="center"
          alignItems="center"
          style={{ margin: "0vh 0vw"}}
        > 
         <EuiFlexItem style={{ width: "30vw"}}>
            <RoomRable filter={selectedKeyValue}/>
         </EuiFlexItem>
         </EuiFlexGroup>
        
      </div>
    </>
  );
}

export default Rooms;
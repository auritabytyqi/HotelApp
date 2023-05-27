import React from "react";
import { EuiCard, EuiFlexGroup, EuiFlexItem, EuiImage, EuiTextColor } from "@elastic/eui";
import { useNavigate } from "react-router-dom";
import dashboard1 from "../assets/dashboard1.png";
import dashboard2 from "../assets/dashboard2.png";
import dashboard3 from "../assets/dashboard3.png";
import roomBook from "../assets/roomBook.png";
import room from "../assets/roomImage.jpg";
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";
import LeftMenu from "../components/LeftMenu";
import { Button } from "antd";


function HomePageClient() {
  useAuth();
  const navigate = useNavigate();

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          backgroundImage: `url(${room})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Header />

        <EuiFlexGroup
          justifyContent="center"
          alignItems="center"
          style={{ margin: "0vh 0vw"}}
        > 
          <EuiFlexItem>
          
              <EuiCard
              icon={<EuiImage src={roomBook} alt="icon" size="7rem" />}
              title={<span style={{ fontSize: '50pt', fontFamily: 'Pacifico'}}>Book your room</span>}
              description="Discover our restaurant's exclusive room booking services. Reserve a private space for your next event or gathering. Our team will create a personalized experience tailored to your needs."
              onClick={() => navigate("/book-room")}
              paddingSize="xl"
              style={{margin: "3vh 10vw", height: "50vh", paddingTop: '8vh', opacity: '0.8'}}

            />
             <Button type="primary" onClick={() => navigate("/meeting-page")} style={{margin: "0vh 25vw", borderRadius: "0", color: "black", backgroundColor: "#eb7a34", height: "7vh", opacity: 0.8, fontFamily: 'Pasific', fontSize: "20pt"}}>
          Contact Us
        </Button>
          </EuiFlexItem> 
         </EuiFlexGroup>
        
      </div>
    </>
  );
}

export default HomePageClient;
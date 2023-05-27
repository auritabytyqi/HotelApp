import React, { useEffect, useState } from "react";
import { EuiCard, EuiFlexGroup, EuiFlexItem, EuiImage, EuiTextColor } from "@elastic/eui";
import { useNavigate } from "react-router-dom";

import room from "../assets/roomImage.jpg";
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";
import FreeRoomRable from "./FreeRoomTable";

import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  FunnelPlotFilled,
  CameraFilled
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';
import { useAppSelector } from "../app/hooks";
import DarkTheme from "../components/Themes/DarkTheme";

type MenuItem = Required<MenuProps>['items'][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Floor 1', '1', <FunnelPlotFilled />),
  getItem('Floor 2', '2', <FunnelPlotFilled />),
  getItem('Floor 3', '3', <FunnelPlotFilled />),
  getItem('Floor 4', '4', <FunnelPlotFilled />),
  getItem('Floor 5', '5', <FunnelPlotFilled />),
  getItem('Floor 6', '6', <FunnelPlotFilled />),

  getItem('Select Your View', 'sub1', <CameraFilled />, [
    getItem('Sea View', 'sea'),
    getItem('City View', 'city'),

  ]),


];


function BookRoomPage() {
  useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);
  const isDarkTheme = useAppSelector((zoomApp) => zoomApp.auth.isDarkTheme);
  const [selectedKeyValue, setSelectedKeyValue] = useState("");
  useEffect(()=>{
    if(isDarkTheme){
        setDarkTheme(true);
    }
  }, [isDarkTheme])

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

 const handleMenuItemClick = (key: React.Key) => {
    setSelectedKeyValue(key.toString())
 }
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
          <EuiFlexItem>
        <Menu
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
        style={{marginRight: "30vw", width: "20vw", height: "85vh"}}
        onClick={({ key }) => handleMenuItemClick(key)}
      />
         </EuiFlexItem> 
         <EuiFlexItem style={{ width: "30vw"}}>
            <FreeRoomRable filter={selectedKeyValue}/>
         </EuiFlexItem>
         </EuiFlexGroup>
        
      </div>
    </>
  );
}

export default BookRoomPage;
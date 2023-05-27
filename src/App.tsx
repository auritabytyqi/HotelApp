import {
  EuiGlobalToastList,
  EuiProvider,
  EuiThemeProvider,
} from "@elastic/eui";
import { EuiThemeColorMode } from "@elastic/eui/src/services/theme";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { useAppSelector } from "./app/hooks";
import { setToasts } from "./app/slices/MeetingSlice";
import ThemeSelector from "./components/ThemeSelector";
import CreateMeeting from "./pages/CreateMeeting";
import Dashboard from "./pages/Dashboard";
import JoinMeeting from "./pages/JoinMeeting";
import Login from "./pages/Login";
import Meeting from "./pages/Meeting";
import MyMeetings from "./pages/MyMeetings";
import OneOnOneMeeting from "./pages/OneOnOneMeeting";
import VideoConference from "./pages/VideoConference";
import { getDocs, query, where } from "firebase/firestore";
import { usersRef } from "./utils/firebaseConfig";
import HomePageClient from "./pages/HomePageClient";
import HomePageStaff from "./pages/HomePageStaff";
import useFetchUsers from "./hooks/useFetchUsers";
import useFetchUser from "./hooks/useFetchUser";
import BookRoomPage from "./pages/BookRoomPage";
import Rooms from "./pages/Rooms";

export default function App() {
  const dispatch = useDispatch();
  const isDarkTheme = useAppSelector((zoomApp) => zoomApp.auth.isDarkTheme);
  const [isInitialEffect, setIsInitialEffect] = useState(true);
  const toasts = useAppSelector((zoom) => zoom.meetings.toasts);
  
  const removeToast = (removedToast: { id: string }) => {
    dispatch(
      setToasts(
        toasts.filter((toast: { id: string }) => toast.id !== removedToast.id)
      )
    );
  };
  const [theme, setTheme] = useState<EuiThemeColorMode>("light");
  useEffect(() => {
    const theme = localStorage.getItem("zoom-theme");
    if (theme) {
      setTheme(theme as EuiThemeColorMode);
    } else {
      localStorage.setItem("zoom-theme", "light");
    }
  }, []);

  useEffect(() => {
    if (isInitialEffect) setIsInitialEffect(false);
    else {
      window.location.reload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDarkTheme]);

  const overrides = {
    colors: {
      LIGHT: { primary: "#0b5cff" },
      DARK: { primary: "#0b5cff" },
    },
  };

  const [user] = useFetchUser();
 console.log(user[0]? user[0].userStaff: "ss")
  const isStaff = user[0]? user[0].userStaff: false
  const isClient = !isStaff;
  return (
    <ThemeSelector>
      <EuiProvider colorMode={theme}>
        <EuiThemeProvider modify={overrides}>
          {isStaff && 
            <Routes>
           <Route path="/" element={<HomePageStaff/>} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create" element={<CreateMeeting />} />
            <Route path="/create1on1" element={<OneOnOneMeeting />} />
            <Route path="/videoconference" element={<VideoConference />} />
            <Route path="/mymeetings" element={<MyMeetings />} />
            <Route path="/join/:id" element={<JoinMeeting />} />
            <Route path="/meetings" element={<Meeting />} />
            <Route path="/meeting-page" element={<Dashboard />} />
            <Route path="*" element={<Login />} />
          </Routes>
          }
          {isClient && 
            <Routes>
           <Route path="/" element={<HomePageClient/>} />
            <Route path="/book-room" element={<BookRoomPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create" element={<CreateMeeting />} />
            <Route path="/create1on1" element={<OneOnOneMeeting />} />
            <Route path="/videoconference" element={<VideoConference />} />
            <Route path="/mymeetings" element={<MyMeetings />} />
            <Route path="/join/:id" element={<JoinMeeting />} />
            <Route path="/meetings" element={<Meeting />} />
            <Route path="/meeting-page" element={<Dashboard />} />
            <Route path="*" element={<Login />} />
          </Routes>
          }
          <EuiGlobalToastList
            toasts={toasts}
            dismissToast={removeToast}
            toastLifeTimeMs={4000}
          />
        </EuiThemeProvider>
      </EuiProvider>
    </ThemeSelector>
  );
}

import {
  EuiButtonIcon,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHeader,
  EuiText,
  EuiTextColor,
} from "@elastic/eui";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { changeTheme } from "../app/slices/AuthSlice";
import {
  getCreateMeetingsPageBreadCrumbs,
  getCreateMeetingBreadCrumbs,
  getRoomPageBreadCrumbs,
  getDashboardBreadCrumbs,
  getMeetingsBreadCrumbs,
  getMyMeetingsBreadCrumbs,
  getOneOnOneMeetingBreadCrumbs,
  getVideoConferenceBreadCrumbs,
  getBookRoomBreadCrumbs
} from "../utils/breadcrumbs";
import { firebaseAuth } from "../utils/firebaseConfig";
import { BreadCrumbsType } from "../utils/types";
import { HomeOutlined } from '@ant-design/icons';


export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const userName = useAppSelector((zoomApp) => zoomApp.auth.userInfo?.name);
  const isDarkTheme = useAppSelector((zoomApp) => zoomApp.auth.isDarkTheme);
  const [breadCrumbs, setBreadCrumbs] = useState<Array<BreadCrumbsType>>([
    {
      text: "Dashboard",
    },
  ]);
  const dispatch = useDispatch();
  const [isResponsive, setIsResponsive] = useState(false);

  useEffect(() => {
    const { pathname } = location;
    if (pathname === "/") setBreadCrumbs(getDashboardBreadCrumbs(navigate));
    else if (pathname === "/meeting-page")
      setBreadCrumbs(getCreateMeetingsPageBreadCrumbs(navigate));
      else if (pathname === "/book-room")
      setBreadCrumbs(getRoomPageBreadCrumbs(navigate));
      else if (pathname === "/rooms")
      setBreadCrumbs(getBookRoomBreadCrumbs(navigate));
    else if (pathname === "/create")
      setBreadCrumbs(getCreateMeetingBreadCrumbs(navigate));
    else if (pathname === "/create1on1")
      setBreadCrumbs(getOneOnOneMeetingBreadCrumbs(navigate));
    else if (pathname === "/videoconference")
      setBreadCrumbs(getVideoConferenceBreadCrumbs(navigate));
    else if (pathname === "/mymeetings")
      setBreadCrumbs(getMyMeetingsBreadCrumbs(navigate));
    else if (pathname === "/meetings") {
      setBreadCrumbs(getMeetingsBreadCrumbs(navigate));
    }
  }, [location, navigate]);

  const logout = () => {
    signOut(firebaseAuth);
  };

  const invertTheme = () => {
    const theme = localStorage.getItem("zoom-theme");
    localStorage.setItem("zoom-theme", theme === "light" ? "dark" : "light");
    dispatch(changeTheme({ isDarkTheme: !isDarkTheme }));
  };

  const section = [
    {
      items: [
        <Link to="/">
          <EuiText>
            <h2 style={{ padding: "0 1vw",  fontSize: '30pt', fontFamily: 'Pacifico' }}>
              <EuiTextColor color="#0b5cff" style={{marginLeft: "4vw"}}><HomeOutlined /> HotelAL</EuiTextColor>
            </h2>
        </EuiText>
      </Link>,
    ],
  },
  {
    items: [
      <>
        
            <EuiText>
              <h3>
                <EuiTextColor style={{fontFamily: '-moz-initial', marginLeft: "-2vw"}} ><em>"Luxury Redefined, Unforgettable Experiences" </em></EuiTextColor>
              </h3>
            </EuiText>
     
      </>,
    ],
  },
  {
    items: [
      <EuiFlexGroup
        justifyContent="center"
        alignItems="center"
        direction="row"
        style={{ gap: "2vw" }}
      >
        <EuiFlexItem grow={false} style={{ flexBasis: "fit-content" }}>
          {isDarkTheme ? (
            <EuiButtonIcon
              onClick={invertTheme}
              iconType="sun"
              display="fill"
              size="s"
              color="warning"
              aria-label="theme-button-light"
            />
          ) : (
            <EuiButtonIcon
              onClick={invertTheme}
              iconType="moon"
              display="fill"
              size="s"
              color="ghost"
              aria-label="theme-button-dark"
            />
          )}
        </EuiFlexItem>
        <EuiFlexItem grow={false} style={{ flexBasis: "fit-content" }}>
          <EuiButtonIcon
            onClick={logout}
            iconType="lock"
            display="fill"
            size="s"
            aria-label="logout-button"
          />
        </EuiFlexItem>
      </EuiFlexGroup>,
    ],
  },
];

const responsiveSection = [
  {
    items: [
      <Link to="/">
        <EuiText>
          <h2 style={{ padding: "0 1vw" }}>
              <EuiTextColor color="#0b5cff">Zoom</EuiTextColor>
          </h2>
        </EuiText>
      </Link>,
    ],
  },
  {
    items: [
      <EuiFlexGroup
        justifyContent="center"
        alignItems="center"
        direction="row"
        style={{ gap: "2vw" }}
      >
        <EuiFlexItem grow={false} style={{ flexBasis: "fit-content" }}>
          {isDarkTheme ? (
            <EuiButtonIcon
              onClick={invertTheme}
              iconType="sun"
              display="fill"
              size="s"
              color="warning"
              aria-label="theme-button-light"
            />
          ) : (
            <EuiButtonIcon
              onClick={invertTheme}
              iconType="moon"
              display="fill"
              size="s"
              color="ghost"
              aria-label="theme-button-dark"
            />
          )}
        </EuiFlexItem>
        <EuiFlexItem grow={false} style={{ flexBasis: "fit-content" }}>
          <EuiButtonIcon
            onClick={logout}
            iconType="lock"
            display="fill"
            size="s"
            aria-label="logout-button"
          />
        </EuiFlexItem>
      </EuiFlexGroup>,
    ],
  },
];

useEffect(() => {
  if (window.innerWidth < 480) {
      // sectionSpliced.splice(1, 1);
      // setSection(sectionSpliced);
    setIsResponsive(true);
  }
}, []);

return (
  <>
    <EuiHeader
        style={{ minHeight: "5vh", border: '0px', margin: '0', opacity: 0.8 }}
 
      sections={isResponsive ? responsiveSection : section}
    />
    <EuiHeader
        style={{ minHeight: "2vh", border: '0px', marginTop: '0.05vh', opacity: 0.8 }}
      sections={[
        {
          breadcrumbs: breadCrumbs,
        },
      ]}
    />
  </>
);
}

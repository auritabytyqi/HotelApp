import { getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { roomsRef } from "../utils/firebaseConfig";
import { RoomType } from "../utils/types";

function useFetchAvailableRooms() {
  const [rooms, setRooms] = useState<Array<RoomType>>([]);
  const uid = useAppSelector((zoomApp) => zoomApp.auth.userInfo?.uid);

  useEffect(() => {
    if (uid) {
      const getRooms= async () => {
        const firestoreQuery = query(roomsRef);
        const data = await getDocs(firestoreQuery);
        const firebaseRooms: Array<RoomType> = [];

        data.forEach((room) => {
          const roomData: RoomType = room.data() as RoomType;
          firebaseRooms.push({
            ...roomData,
          });
        });
        setRooms(firebaseRooms);
      };
      getRooms();
    }
  }, [uid]);
  return [rooms];
}

export default useFetchAvailableRooms;

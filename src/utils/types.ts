export interface ToastType {
  id: string;
  title: string;
  color: "success" | "primary" | "warning" | "danger" | undefined;
}

export interface BreadCrumbsType {
  text: string;
  href?: string;
  onClick?: () => void;
}

export type MeetingJoinType = "anyone-can-join" | "video-conference" | "1-on-1";

export interface MeetingType {
  docId?: string;
  createdBy: string;
  invitedUsers: Array<string>;
  maxUsers: number;
  meetingDate: string;
  meetingId: string;
  meetingName: string;
  meetingType: MeetingJoinType;
  status: boolean;
}

export interface UserType {
  email: string;
  name: string;
  uid: string;
  label?: string;
  userStaff: boolean;
}

export interface RoomType {
    roomId: string;
    bathroom: boolean;
    isFree: boolean;
    numberOfPeople: number;
    price: number;
    snacks: boolean;
    telephone: boolean;
    view: string;
    roomNumber: number;
    user: string;
    floor: number;

}

export interface FieldErrorType {
  show: boolean;
  message: Array<string>;
}

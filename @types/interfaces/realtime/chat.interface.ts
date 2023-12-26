export interface IMessage {
  senderId: string;
  messageType: "text" | "image";
  content?: string;
  fileUrl: string;
  timestamp: string;
}

export interface IChatRoom {
  _id:any;
  name: string;
  description: string;
  courseId: string;
  members: [{ userId: string; isAdmin: boolean; isCreator: boolean }];
  messages: [IMessage];
}

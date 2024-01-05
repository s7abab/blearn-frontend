import socketIO from "socket.io-client";

const ENDPOINT = "wss://www.mintapp.online" || "";
export const SOCKET = socketIO(ENDPOINT, { transports: ["websocket"] });

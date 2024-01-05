import socketIO from "socket.io-client";

const ENDPOINT = "https://www.mintapp.online" || "";
export const SOCKET = socketIO(ENDPOINT, { transports: ["websocket"] });

import socketIO from "socket.io-client";

const ENDPOINT = "wss://www.mintcounseling.online" || "";
export const SOCKET = socketIO(ENDPOINT);
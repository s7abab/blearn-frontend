import io from "socket.io-client";

const SOCKET = io("wss://www.mintapp.online");

export default SOCKET;
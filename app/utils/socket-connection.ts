import socketIO from "socket.io-client";

const ENDPOINT = `${process.env.NEXT_PUBLIC_REALTIME_SRV_URL}/socket.io/` || "";
export const SOCKET = socketIO(ENDPOINT, { transports: ["websocket"] });

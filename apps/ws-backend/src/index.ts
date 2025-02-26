import { WebSocketServer } from "ws";
import jwt, { decode } from "jsonwebtoken";
import {JWT_TOKEN} from "./config";
const wss = new WebSocketServer({port: 8080});

wss.on("connection", (ws, request) => {

    const url = request.url;
    if(!url)
    {
        return;
    }
    const queryParams = new URLSearchParams(url.split('?')[1]);
    const token = queryParams.get('token') ?? "";

    const decoded = jwt.verify(token, JWT_TOKEN);
    if(!decoded || (typeof decoded === "object" && !decoded.userId))
    {
        ws.close();
        return;
    }
    ws.on('error', console.error);
    ws.on('message', (data) => {
        ws.send("pong");
    })
})
import express from "express";
import jwt from "jsonwebtoken";
import { JWT_TOKEN } from "./config";
import { middleware } from "./middleware";
const app = express();

app.post('/signup', (req, res) => {
    res.json({
        message: "succeful"
    })
})

app.post('/signin', (req,res) => {

    const userid = 2;
    const token = jwt.sign({
        userid
    },JWT_TOKEN);

    res.json({
        token
    })
})

app.post('/create-room', middleware, (req, res) => {
    res.json({
        roomId: 123
    })
})
app.listen(3002);
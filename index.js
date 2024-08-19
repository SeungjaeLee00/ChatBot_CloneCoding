const cors = require('cors');
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();

const config = require("./server/config/keys");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// cors error 해결, https://velog.io/@wiostz98kr/React-Express-CORS-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0 참고함
app.use(cors({ origin: 'http://localhost:3000'}));

// app.use를 통해 Text Query Route, Event Query Route가 있는 route > dialogflow.js을 라우팅
app.use('/api/dialogflow', require('./server/routes/dialogflow'));

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server Running at ${port}`)
});
const express = require('express');
const router = express.Router();
const dialogflow = require('dialogflow');

const config = require('../config/keys');

const projectId = config.googleProjectID
const sessionId = config.dialogFlowSessionID
const languageCode = config.dialogFlowSessionLanguageCode


// 새로운 세션 생성
const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.sessionPath(projectId, sessionId);


// Text Query Route
router.post('/textQuery', async (req, res) => {
    // client에서 dialogflow API로 오는 정보 보내기
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: req.body.text,
                languageCode: languageCode,
            },
        },
    };

    // request 보내고 결과
    const responses = await sessionClient.detectIntent(request);
    console.log('Detected intent');
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);

    res.send(result)
})


module.exports = router;
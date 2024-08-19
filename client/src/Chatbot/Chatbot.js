import React, { useEffect } from "react";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { saveMessage } from "../_actions/message_actions";
import { RobotOutlined, SmileFilled } from "@ant-design/icons";
import { List, Avatar } from "antd";

function Chatbot() {
  const dispatch = useDispatch();
  const messagesFromRedux = useSelector((state) => state.message.messages);

  useEffect(() => {
    eventQuery("greeting");
  }, []);

  // Text Query
  const textQuery = async (text) => {
    let conversation = {
      who: "user",
      content: {
        text: {
          text: text,
        },
      },
    };

    dispatch(saveMessage(conversation));
    // console.log("text I send", conversation);

    const textQueryVariables = {
      text: text,
    };

    try {
      const response = await Axios.post(
        // 왜 url을 다 써야 응답하지
        "http://localhost:4000/api/dialogflow/textQuery",
        textQueryVariables
      );
      const content = response.data.fulfillmentMessages[0];

      conversation = {
        who: "bot",
        content: {
          text: {
            text: content.text ? content.text.text[0] : "No text found",
          },
        },
      };

      dispatch(saveMessage(conversation));
      console.log(conversation);
    } catch (error) {
      conversation = {
        who: "bot",
        content: {
          text: {
            text: "Error juse occured, please check the problem",
          },
        },
      };

      dispatch(saveMessage(conversation));
      // console.log(conversation);
    }
  };

  // Event Query
  const eventQuery = async (event) => {
    const eventQueryVariables = {
      event,
    };

    try {
      const response = await Axios.post(
        "http://localhost:4000/api/dialogflow/eventQuery",
        eventQueryVariables
      );
      const content = response.data.fulfillmentMessages[0];

      let conversation = {
        who: "bot",
        content: {
          text: {
            // text: content,
            text: content.text ? content.text.text[0] : "No text found",
          },
        },
      };

      dispatch(saveMessage(conversation));
      // console.log(conversation);
    } catch (error) {
      let conversation = {
        who: "bot",
        content: {
          text: {
            text: "Error juse occured, please check the problem",
          },
        },
      };

      dispatch(saveMessage(conversation));
      // console.log(conversation);
    }
  };

  const keyPressHandler = (e) => {
    if (e.key === "Enter") {
      if (!e.target.value) {
        return alert("you need to type something first");
      }
      // text query route로 request 전송
      textQuery(e.target.value);
      e.target.value = "";
    }
  };

  const renderOneMessage = (message, i) => {
    console.log("message", message);
    const AvatarSrc =
      message.who === "bot" ? <RobotOutlined /> : <SmileFilled />;

    return (
      <div>
        <List.Item style={{ padding: "1rem", listStyleType: 'none' }}>
          <List.Item.Meta
            avatar={<Avatar icon={AvatarSrc} />}
            title={message.who}
            description={message.content.text.text}  
            />
        </List.Item>
      </div>
    );
  };

  const renderMessage = (returnedMessages) => {
    if (returnedMessages) {
      return returnedMessages.map((message, i) => {
        return renderOneMessage(message, i);
      });
    } else {
      return null;
    }
  };

  return (
    <div
      style={{
        height: 700,
        width: 700,
        border: "3px solid black",
        borderRadius: "7px",
      }}
    >
      <div style={{ height: 639, width: "100%", overflow: "auto" }}>
        {renderMessage(messagesFromRedux)}
      </div>

      <input
        style={{
          margin: 0,
          width: "98.5%",
          height: 50,
          borderRadius: "4px",
          padding: "5px",
          fontSize: "1rem",
        }}
        placeholder="Send a message..."
        onKeyDown={keyPressHandler}
        type="text"
      />
    </div>
  );
}
export default Chatbot;

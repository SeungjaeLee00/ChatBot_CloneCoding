import React, { useEffect } from "react";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { saveMessage } from "../_actions/message_actions";

function Chatbot() {
  const dispatch = useDispatch();

  useEffect(() => {
    eventQuery("greeting");
    // eslint-disable-next-line 
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
    console.log("text I send", conversation);

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
            text: content,
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
      console.log(conversation);
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
            text: content,
          },
        },
      };

      dispatch(saveMessage(conversation));
      console.log(conversation);
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
      console.log(conversation);
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
  return (
    <div
      style={{
        height: 700,
        width: 700,
        border: "3px solid black",
        borderRadius: "7px",
      }}
    >
      <div style={{ height: 639, width: "100%", overflow: "auto" }}></div>

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

import React from "react";
import Axios from "axios";

function Chatbot() {
  const textQuery = async (text) => {
    // 내가 보낸 메세지 보관
    let conversation = {
      who: "user",
      content: {
        text: {
          text: text,
        },
      },
    };

    // chatbot이 보낸 메세지 보관
    const textQueryVariables = {
      text: text,
    };

    try {
      // text query route에 request 전송
      const response = await Axios.post("api/dialogflow/textQuery", textQueryVariables);
      const content = response.data.fulfillmentMessages[0];

      conversation = {
        who: "bot",
        content: {
          text: {
            text: content,
          },
        },
      };

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

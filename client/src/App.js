import React from "react";
import { Typography } from "antd";
import Icon from "@ant-design/icons"; // On upgrading the version of Ant Design to v4, Icon is no longer exported from antd package. Instand we use @ant-design/icons.
import Chatbot from './Chatbot/Chatbot';
const { Title } = Typography;

function App() {
  return (
    <div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
      >
        <Title level={2}>
          CHAT BOT APP&nbsp;
          <Icon type="robot" />
        </Title>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Chatbot />
      </div>
    </div>
  );
}

export default App;

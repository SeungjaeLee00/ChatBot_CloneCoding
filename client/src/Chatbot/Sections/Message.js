import { RobotOutlined, SmileFilled } from "@ant-design/icons";
import { List, Avatar } from "antd";
import React from "react";

function Message(props) {
  const AvatarSrc = props.who === "bot" ? <RobotOutlined /> : <SmileFilled />;

  return (
    <div style={{ display: "flex", alignItems: "flex-start", padding: "1rem" }}>
      <div style={{ marginRight: "1rem" }}>
        <Avatar icon={AvatarSrc} />
      </div>
      <div>
        <div style={{ fontWeight: "bold" }}>{props.who}</div>
        <div>{props.text}</div>
      </div>
    </div>
  );
}

export default Message;

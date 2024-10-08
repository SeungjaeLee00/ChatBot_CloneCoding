import React from "react";
import { Card } from "antd";
import { RobotOutlined } from "@ant-design/icons";

const { Meta } = Card;

function CardComponent(props) {
  return (
    <Card
      style={{ width: 300 }}
      actions={[
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={props.cardInfo.fields.link.stringValue}
        >
          <RobotOutlined type="ellipsis" key="ellipsis" />
        </a>,
      ]}
    >
      <Meta
        title={props.cardInfo.fields.stack.stringValue}
        description={props.cardInfo.fields.description.stringValue}
      />
    </Card>
  );
}

export default CardComponent;

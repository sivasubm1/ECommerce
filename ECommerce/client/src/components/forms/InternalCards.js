import React from "react";
import { Card } from "antd";
import moment from "moment";

const InternalCards = ({ id, title, storypoints, deadline }) => {
  const { Meta } = Card;

  return (
    <div className="container-fluid">
      return (
      <div className="site-card-wrapper" key={id}>
        <Card hoverable style={{ width: 200, marginTop: 16, marginLeft: -20 }}>
          <Meta title={title} />
          <br />
          <div>
            <p>{storypoints} </p>
            <p>{moment(deadline).format("MM/DD/YYYY")}</p>
          </div>
        </Card>
      </div>
      );
    </div>
  );
};

export default InternalCards;

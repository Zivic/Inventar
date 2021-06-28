import React from "react";
import { Card } from "react-bootstrap";

const SkladisteCard = (props) => {
  const { title, subtitle, text1, text2, text3 } = props;
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{subtitle}</Card.Subtitle>
        <Card.Text>{text1}</Card.Text>
        <Card.Text>{text2}</Card.Text>
        <Card.Text>{text3}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default SkladisteCard;

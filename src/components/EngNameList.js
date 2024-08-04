import React from "react";
import { Accordion } from "react-bootstrap";

const EngNameList = (props) => {
  return (
    <Accordion>
      {props.aiResponse.map((item, i) => (
        <Accordion.Item eventKey={i}>
          <Accordion.Header>{item.name}</Accordion.Header>
          <Accordion.Body>
            <p>{item.reason}</p>
            <p>뜻: {item.meaning}</p>
            <p>성격: {item.personality}</p>
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default EngNameList;

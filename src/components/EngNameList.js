import React from "react";
import { useSelector } from "react-redux";

import { Accordion } from "react-bootstrap";

const EngNameList = () => {
  const { response, status, error } = useSelector((state) => state.ai);
  // const response = useSelector((state) => state.ai.response);
  // const status = useSelector((state) => state.ai.status);
  // const error = useSelector((state) => state.ai.error);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  // console.log(response);
  // console.log(response[0].names);

  let list;
  if (Array.isArray(response[0].names)) list = response[0].names;
  else list = response;

  return (
    <Accordion>
      {status === "succeeded" && response ? (
        list.map((item, i) => (
          <Accordion.Item eventKey={i} key={i}>
            <Accordion.Header>{item.name}</Accordion.Header>
            <Accordion.Body>
              <p>{item.reason}</p>
              <p>뜻: {item.meaning}</p>
              <p>성격: {item.personality}</p>
            </Accordion.Body>
          </Accordion.Item>
        ))
      ) : (
        <p>No response yet</p>
      )}
    </Accordion>
  );
};

export default EngNameList;

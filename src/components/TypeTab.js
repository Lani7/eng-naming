import React from "react";
import { Nav, Tab } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { changeType } from "../slices/typeSlice";

const TypeTab = () => {
  const dispatch = useDispatch();

  const handleChangeType = (type) => {
    if (type === "sound") dispatch(changeType("sound"));
    else if (type === "meaning") dispatch(changeType("meaning"));
  };

  return (
    <div style={{ padding: "20px 0" }}>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Nav variant="pills" className="flex-column">
          <Nav.Item>
            <Nav.Link
              eventKey="first"
              onClick={() => handleChangeType("sound")}
            >
              초성
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="second"
              onClick={() => handleChangeType("meaning")}
            >
              의미
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="first">
            작성하신 한글 이름의 발음에 가까운 영어 이름을 추천합니다.
          </Tab.Pane>
          <Tab.Pane eventKey="second">
            작성하신 한글 이름의 뜻에 가까운 영어 이름을 추천합니다. <br />
            한자로 적으시면 더 정확한 결과가 나올 가능성이 높아집니다.
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
};

export default TypeTab;

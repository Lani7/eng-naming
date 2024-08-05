import React, { useState } from "react";
// import { Button, InputGroup, Form } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Title from "./components/Title";
import EngNameList from "./components/EngNameList";
import InputForm from "./components/InputForm";

function App() {
  const [opened, setOpened] = useState(false);

  return (
    <div className="App">
      <Title />
      <InputForm setOpened={setOpened} />
      {/* <Form>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="한글 이름을 작성하세요."
            aria-label="Username"
            aria-describedby="basic-addon1"
            onChange={(e) => handleChangeSearch(e)}
          />
          <Button variant="link" onClick={() => handleClick()}>
            Search
          </Button>
        </InputGroup>
      </Form> */}
      {opened ? <EngNameList /> : null}
    </div>
  );
}

export default App;

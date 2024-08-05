import React from "react";
import { Button, InputGroup, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { changeName } from "../slices/searchSlice";
import { fetchAiResponse } from "../slices/aiSlice";

const InputForm = (props) => {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search.value);

  const handleChangeSearch = (e) => {
    dispatch(changeName(e.target.value));
  };

  const handleClick = () => {
    if (!isValid(search)) {
      alert("유효하지 않은 입력입니다.");
      return;
    }
    dispatch(fetchAiResponse(search));
    props.setOpened(true);
  };

  const isValid = (value) => {
    console.log("isValid - " + value.payload);
    const regex = /^(?=.*[^\s])[a-zA-Zㄱ-ㅎ가-힣]*$/;
    return regex.test(value.payload.trim());
  };

  return (
    <Form>
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
    </Form>
  );
};

export default InputForm;

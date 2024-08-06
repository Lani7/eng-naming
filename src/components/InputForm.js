import React from "react";
import { Button, InputGroup, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { changeName } from "../slices/koNameSlice";
import { setGender } from "../slices/genderSlice";
import { fetchAiResponse } from "../slices/aiSlice";

const InputForm = (props) => {
  const dispatch = useDispatch();
  const koName = useSelector((state) => state.koName.value);
  const gender = useSelector((state) => state.gender.value);

  const handleOptionChange = (e) => {
    console.log(e.target.value);
    dispatch(setGender(e.target.value));
  };

  const handleChangeSearch = (e) => {
    dispatch(changeName(e.target.value));
  };

  const handleClick = () => {
    if (!isValid(koName)) {
      alert("유효하지 않은 입력입니다.");
      return;
    }
    dispatch(fetchAiResponse({ koName, gender }));
    props.setOpened(true);
  };

  const isValid = (value) => {
    console.log("isValid - " + value);
    const regex = /^(?=.*[^\s])[a-zA-Zㄱ-ㅎ가-힣]*$/;
    return regex.test(value.trim());
  };

  return (
    <Form>
      <div className="gender_radio">
        {["radio"].map((type) => (
          <div key={`inline-${type}`} className="mb-3">
            <Form.Check
              inline
              label="남자"
              name="gender"
              type={type}
              id={`inline-${type}-1`}
              value={"male"}
              onChange={(e) => handleOptionChange(e)}
            />
            <Form.Check
              inline
              label="여자"
              name="gender"
              type={type}
              id={`inline-${type}-2`}
              value={"female"}
              onChange={(e) => handleOptionChange(e)}
            />
          </div>
        ))}
      </div>
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

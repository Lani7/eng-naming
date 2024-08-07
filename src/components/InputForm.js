import React, { useEffect } from "react";
import { Button, InputGroup, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { changeName } from "../slices/koNameSlice";
import { setGender } from "../slices/genderSlice";
import { setBirth } from "../slices/birthSlice";
import { fetchAiResponse } from "../slices/aiSlice";

const InputForm = (props) => {
  const dispatch = useDispatch();
  const koName = useSelector((state) => state.koName.value);
  const gender = useSelector((state) => state.gender.value);
  const birthYear = useSelector((state) => state.birthYear.value);

  // 현재 연도 가져오기
  const currentYear = new Date().getFullYear();
  const startYear = 1920;
  // 출생 연도 범위 설정
  const years = Array.from(
    new Array(currentYear - startYear + 1),
    (val, index) => startYear + index
  );

  useEffect(() => {
    // 페이지 로딩 시 기본 선택 값 설정
  }, []);

  const handleYearChange = (e) => {
    console.log(e.target.value);
    dispatch(setBirth(e.target.value));
  };

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
    dispatch(fetchAiResponse({ koName, gender, birthYear }));
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
        <h6>성별</h6>
        {["radio"].map((type) => (
          <div key={`inline-${type}`} className="mb-3">
            <Form.Check
              inline
              label="남자"
              name="gender"
              type={type}
              id={`inline-${type}-1`}
              value={"male"}
              checked={gender === "male"}
              onChange={(e) => handleOptionChange(e)}
            />
            <Form.Check
              inline
              label="여자"
              name="gender"
              type={type}
              id={`inline-${type}-2`}
              value={"female"}
              checked={gender === "female"}
              onChange={(e) => handleOptionChange(e)}
            />
          </div>
        ))}
      </div>
      <h6>출생연도</h6>
      <Form.Select
        aria-label="birthYear"
        value={birthYear}
        onChange={(e) => handleYearChange(e)}
      >
        <option>연도를 선택하세요</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </Form.Select>
      <h6>한글이름</h6>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="한글 이름을 작성하세요."
          aria-label="korName"
          aria-describedby="basic-addon1"
          onChange={(e) => handleChangeSearch(e)}
        />
        <Button variant="dark" onClick={() => handleClick()}>
          Search
        </Button>
      </InputGroup>
    </Form>
  );
};

export default InputForm;

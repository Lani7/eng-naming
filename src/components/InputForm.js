import React from "react";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchAiResponse } from "../slices/aiSlice";
import Gender from "./Gender";
import BirthYear from "./BirthYear";
import KorName from "./KorName";

const InputForm = (props) => {
  const dispatch = useDispatch();
  const koName = useSelector((state) => state.koName.value);
  const gender = useSelector((state) => state.gender.value);
  const birthYear = useSelector((state) => state.birthYear.value);

  const handleClick = () => {
    if (!isValid(koName)) {
      alert("유효하지 않은 입력입니다.");
      return;
    }
    dispatch(fetchAiResponse({ koName, gender, birthYear }));
    props.setOpened(true);
  };

  const isValid = (value) => {
    const regex = /^(?=.*[^\s])[a-zA-Zㄱ-ㅎ가-힣]*$/;
    return regex.test(value.trim());
  };

  return (
    <>
      <Gender />
      <BirthYear />
      <KorName />
      <Button variant="dark" onClick={() => handleClick()}>
        Search
      </Button>
    </>
  );
};

export default InputForm;

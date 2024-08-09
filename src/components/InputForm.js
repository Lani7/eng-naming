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
  const type = useSelector((state) => state.type.value);

  const handleClick = () => {
    if (!isValid(koName)) {
      alert("유효하지 않은 입력입니다.");
      return;
    }
    dispatch(fetchAiResponse({ koName, gender, birthYear, type }));
    props.setOpened(true);
  };

  const isValid = (value) => {
    // 알파벳 대소문자, 한글, 한자만 허용
    const regex = /^(?=.*[^\s])[a-zA-Zㄱ-ㅎ가-힣\u4E00-\u9FFF]*$/;
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

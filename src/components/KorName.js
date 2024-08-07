import React from "react";
import { InputGroup, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { changeName } from "../slices/koNameSlice";

const KorName = () => {
  const dispatch = useDispatch();

  const handleChangeSearch = (e) => {
    dispatch(changeName(e.target.value));
  };

  return (
    <div>
      <h6>한글이름</h6>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="한글 이름을 작성하세요."
          aria-label="korName"
          aria-describedby="basic-addon1"
          onChange={(e) => handleChangeSearch(e)}
        />
      </InputGroup>
    </div>
  );
};

export default KorName;

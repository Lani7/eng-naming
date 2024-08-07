import React from "react";
import { Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setBirth } from "../slices/birthSlice";

const BirthYear = () => {
  const dispatch = useDispatch();
  const birthYear = useSelector((state) => state.birthYear.value);

  // 현재 연도 가져오기
  const currentYear = new Date().getFullYear();
  const startYear = 1920;
  // 출생 연도 범위 설정
  const years = Array.from(
    new Array(currentYear - startYear + 1),
    (val, index) => startYear + index
  );

  const handleYearChange = (e) => {
    dispatch(setBirth(e.target.value));
  };

  return (
    <div>
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
    </div>
  );
};

export default BirthYear;

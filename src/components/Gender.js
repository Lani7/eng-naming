import React from "react";
import { Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import { setGender } from "../slices/genderSlice";

const Gender = () => {
  const dispatch = useDispatch();
  const gender = useSelector((state) => state.gender.value);

  const handleOptionChange = (e) => {
    dispatch(setGender(e.target.value));
  };

  return (
    <Form className="gender_radio">
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
    </Form>
  );
};

export default Gender;

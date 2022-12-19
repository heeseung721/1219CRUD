import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { __addTodo } from "../redux/modules/todoSlice";
import { useInput } from "../hooks/useInput";

const Form = () => {
  const { input, handleInput, setInput } = useInput({ title: "" });
  const { isLoading, error } = useSelector((state) => state.todos);

  const dispatch = useDispatch();

  const addSubmitHandler = (e) => {
    e.preventDefault();
    const param = {
      ...input,
      id: Math.floor(Math.random() * 1000),
      todo: input,
    };
    dispatch(__addTodo(param));
    setInput({ title: "" });
  };

  if (isLoading) {
    return <div>로딩중....</div>;
  }

  if (error) {
    return <div>확인하기 어려운 에러가 발생했습니다.</div>;
  }

  return (
    <FormBox>
      <CreateForm onSubmit={addSubmitHandler}>
        <InputBox>
          <label>
            <StInput
              type="text"
              name="title"
              value={input.title}
              onChange={(e) => handleInput(e)}
              placeholder="이곳에 내용을 작성해주세요."
            />
          </label>
        </InputBox>
        <StButton>추가하기</StButton>
      </CreateForm>
    </FormBox>
  );
};

export default Form;

const FormBox = styled.div`
  width: 620px;
  height: 100px;
  margin-top: 30px;
  border: 2px solid #008080;
  display: flex;
  justify-content: space-around;
  font-size: 20px;
`;

const CreateForm = styled.form`
  display: flex;
  align-items: center;
`;

const InputBox = styled.div`
  margin-right: 30px;
`;

const StInput = styled.input`
  width: 300px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid #808080;
`;

const StButton = styled.button`
  width: 150px;
  height: 35px;
  font-size: 18px;
  font-weight: 600;
  border: 2px solid #008080;
  background-color: #008080;
  color: white;
  margin-left: 50px;
  cursor: pointer;
`;

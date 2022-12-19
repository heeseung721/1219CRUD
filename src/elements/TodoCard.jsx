import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { __deleteTodo, __updateTodo } from "../redux/modules/todoSlice";

const TodoCard = ({ todo }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [input, setInput] = useState(location.state);

  const deleteHandler = (id) => {
    dispatch(__deleteTodo(id));
  };

  //수정하는 부분 시작 ---
  const [updateId, setUpdateId] = useState(false);

  const makeUpdateMode = (id) => {
    setUpdateId(true);
  };

  const updateHandler = () => {
    dispatch(__updateTodo(input));
    setUpdateId(false);
  };

  return (
    <CardBox>
      <input type="checkbox"></input>
      {updateId !== true ? (
        <TitleSpan>{todo.title}</TitleSpan>
      ) : (
        <input
          value={input ?? todo.title}
          onChange={(e) => setInput(e.target.value)}
        ></input>
      )}

      {updateId !== true ? (
        <button onClick={() => makeUpdateMode(todo.id)}>수정</button>
      ) : (
        <>
          <button onClick={updateHandler}>수정완료</button>
          <button onClick={() => setUpdateId(false)}>취소</button>
        </>
      )}

      <button onClick={() => deleteHandler(todo.id)}>삭제</button>
    </CardBox>
  );
};

export default TodoCard;

const CardBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 340px;
  height: 200px;
  border: 3px solid #008080;
  border-radius: 10px;
  margin: 10px 0 20px 0;
`;

const TitleSpan = styled.div`
  font-size: 24px;
  margin: 0 0 20px 20px;
`;

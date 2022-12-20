import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import TodoCard from "./TodoCard";
import { __getTodo } from "../redux/modules/todoSlice";

const TodoList = () => {
  const dispatch = useDispatch();
  const { isLoading, error, todos } = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(__getTodo());
  }, [dispatch]);

  if (isLoading) {
    return <div>로딩중....</div>;
  }

  if (error) {
    return <div>확인하기 어려운 에러가 발생했습니다.</div>;
  }
  return (
    <ListWrap>
      <BoxWrap>
        {todos?.map((todo) => (
          <TodoCard key={`card${todo.id}`} todo={todo} />
        ))}
      </BoxWrap>
    </ListWrap>
  );
};

export default TodoList;

const ListWrap = styled.div`
  margin-top: 20px;
  width: 300px;
`;

const BoxWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

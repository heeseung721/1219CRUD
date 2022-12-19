import React from "react";

import Form from "../components/Form";
import TodoList from "../components/TodoList";
import styled from "styled-components";

const Home = () => {
  return (
    <>
      <Wrapper>
        <Form />
        <TodoList />
      </Wrapper>
    </>
  );
};

export default Home;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

import { useState } from "react";

export const useInput = (param) => {
  const [input, setInput] = useState(param);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  return { input, handleInput, setInput };
};

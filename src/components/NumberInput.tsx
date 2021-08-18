import { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: stretch;
`;

const DecrementButton = styled.button`
  width: 26px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border: 0;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    background: #6200ee;
    color: white;
  }
`;

const Label = styled.span`
  box-sizing: border-box;
  flex: 1;
  padding: 0 8px;
  background: white;
  border: 1px solid #ccc;
`;

const IncrementButton = styled.button`
  width: 24px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  border: 0;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    background: #6200ee;
    color: white;
  }
`;

type NumberInputProps = {
  value: number;
  onValueChange?: (num: number) => void;
};
export default function NumberInput(props: NumberInputProps) {
  const { value, onValueChange } = props;
  const [currentValue, setCurrentValue] = useState<number>(value);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  useEffect(() => {
    onValueChange && onValueChange(currentValue);
  }, [onValueChange, currentValue]);

  const increment = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentValue(currentValue + 1);
  };
  const decrease = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentValue(currentValue - 1);
  };

  return (
    <Container>
      <DecrementButton onClick={decrease}>-</DecrementButton>
      <Label>{currentValue}</Label>
      <IncrementButton onClick={increment}>+</IncrementButton>
    </Container>
  );
}

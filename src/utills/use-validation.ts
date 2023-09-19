import { useState, useRef } from 'react';

const useValidation = (inputType: string) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isInvalid, setIsInvalid] = useState(false);

  const validateInput = (input: string) => {
    switch (inputType) {
      case 'email':
        return input.trim().length >= 3 && input.includes('@');

      case 'password':
        return input.trim().length >= 5;

      default:
    }
  };

  const submitValueHandler = (currentValue: string) => {
    let isValueValid = validateInput(currentValue);

    setIsInvalid(!isValueValid);

    return isValueValid;
  };

  return {
    inputRef,
    isInvalid,
    submitValueHandler,
  };
};

export default useValidation;

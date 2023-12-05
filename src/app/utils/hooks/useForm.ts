import { useEffect, useState } from "react";
import { SilentAny } from "../../types/types";

const useForm = (
  initial = {},
): {
  inputs: SilentAny;
  handleChange: (name: string, value: string) => void;
  resetForm: () => void;
} => {
  const [inputs, setInputs] = useState(initial);
  // used to check when initial values goes from nothing to something
  const initialValues = Object.values(initial).join("");

  useEffect(() => {
    setInputs(initial);
    // cannot useEffect on initial, as that would cause an infinite loop
  }, [initialValues]);

  const handleChange = (name: string, value: string) => {
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const resetForm = () => {
    setInputs(initial);
  };

  return {
    inputs,
    handleChange,
    resetForm
  };
};

export default useForm;
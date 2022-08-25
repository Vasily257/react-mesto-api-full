import { useCallback, useState } from 'react';

export default function useForm(initialValues = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(true);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
    setErrors({
      ...errors,
      [name]: event.target.validationMessage,
    });
    setIsValid(event.target.closest('form').checkValidity());
  }

  const resetForm = useCallback(
    (newErrors = {}, newIsValid = false) => {
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setErrors, setIsValid]
  );

  return {
    values,
    errors,
    isValid,
    handleChange,
    resetForm,
    setValues,
    setErrors,
    setIsValid,
  };
}

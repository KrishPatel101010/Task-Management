import { useState } from "react";

export default function useForm<T>(initialState: T) {
  const [formData, setFormData] = useState<T>(initialState);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const reset = () => {
    setFormData(initialState);
  };

  const setFormValues = (newValues: T) => {
    setFormData(newValues);
  };

  return {
    formData,
    handleChange,
    reset,
    setFormValues,
  };
}
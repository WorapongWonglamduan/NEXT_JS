import * as React from "react";

interface IInputsProps {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  register: any;
  error: any;
  disable: any;
}

const Inputs: React.FunctionComponent<IInputsProps> = (props) => {
  const { name, label, type, placeholder, register, error, disable } = props;
  return (
    <>
      <h1>Inputs</h1>

      <input
        name={name}
        type={type}
        placeholder={placeholder}
        {...register(name)}
      />
      {error}
    </>
  );
};

export default Inputs;

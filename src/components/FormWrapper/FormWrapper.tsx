import { ReactNode } from "react";

interface IFormWrapperProps {
  children: ReactNode;
}

const FormWrapper = ({ children }: IFormWrapperProps) => {
  return (
    <div className="border border-gray-500 rounded-lg p-3 border-dashed mb-6 bg-white">
      {children}
    </div>
  );
};

export default FormWrapper;

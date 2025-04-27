import { Radio } from "antd";

interface ICustomRadioProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const CustomRadio = ({ checked, onChange }: ICustomRadioProps) => {
  return (
    <Radio
      checked={checked}
      onClick={() => {
        onChange?.(!checked);
      }}
    />
  );
};

export default CustomRadio;

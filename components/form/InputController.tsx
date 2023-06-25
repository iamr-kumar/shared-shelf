enum InputType {
  TEXT = 'text',
  EMAIL = 'email',
  NUMBER = 'number',
}

interface InputControllerProps {
  name: string;
  type?: InputType;
  label?: string;
  placeholder?: string;
  initialValue?: string;
  isRequired?: boolean;
  handleChange: (name: string, value: string) => void;
}

export const InputController: React.FC<InputControllerProps> = (
  props: InputControllerProps
) => {
  const {
    name,
    type = InputType.TEXT,
    label,
    isRequired = false,
    placeholder,
    handleChange,
  } = props;

  return (
    <>
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-900 ">
          {label}
        </label>
      )}
      <input
        name={name}
        type={type}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder={placeholder}
        required={isRequired}
        onChange={(e) => handleChange(e.target.name, e.target.value)}
      />
    </>
  );
};

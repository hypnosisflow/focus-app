interface IButton {
  handler: () => void;
  bgColor?: string;
  textColor?: string;
  textValue?: string;
  icon?: string;
  classes?: string;
  w?: string;
}

export const Button = ({
  handler,
  textValue,
  textColor,
  bgColor,
  icon,
  classes,
}: IButton) => {
  return (
    <button
      onClick={() => handler()}
      className={`min-h-[36px]  min-w-[72px] max-w-[400px]  ${bgColor}  flex justify-center items-center w-full  rounded-full shadow-md ${classes} `}
    >
      {icon ? (
        <img className="h-[24px] w-[24px]" src={icon} alt="button-icon" />
      ) : (
        <span className={`${textColor} text-sm w-full`}>{textValue}</span>
      )}
    </button>
  );
};

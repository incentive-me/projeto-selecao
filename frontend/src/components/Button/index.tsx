import cn from "classnames";
import MUIButton from "@mui/material/Button";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  active?: boolean;
  className?: string;
  style?: Record<string, string>;
}

export function Button({
  children,
  onClick,
  active = false,
  className,
  style,
}: ButtonProps) {
  return (
    <MUIButton
      variant="contained"
      style={style}
      onMouseDown={(evt) => {
        evt.preventDefault();
        evt.stopPropagation();
      }}
      onClick={onClick}
      className={cn(
        className,
        "bg-[#1976D2] py-2 px-4 focus:outline focus:outline-offset-2 focus:outline-link dark:focus:outline-link-dark inline-flex items-center my-1",
        {
          "bg-link border-link text-white hover:bg-link focus:bg-link active:bg-link":
            active,
        }
      )}
    >
      {children}
    </MUIButton>
  );
}

export default Button;

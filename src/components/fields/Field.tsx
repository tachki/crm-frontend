import { forwardRef } from "react";

interface InputFieldProps {
  id: string;
  label: string;
  extra?: string;
  placeholder: string;
  variant?: string;
  state?: "error" | "success";
  disabled?: boolean;
  type?: string;
  isNumber?: boolean;
}

export const Field = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    { label, id, type, placeholder, state, disabled, isNumber, ...rest },
    ref
  ) => {
    return (
      <div className='w-full'>
        {label ? (
          <label
            htmlFor={id}
            className={`text-sm text-black/60 dark:text-black ml-1.5 font-medium`}
          >
            {label}
          </label>
        ) : (
          ""
        )}

        <input
          ref={ref}
          disabled={disabled}
          type={type}
          id={id}
          placeholder={placeholder}
          className={`mt-5 w-full items-center rounded-xl border-2 border-grey bg-transparent p-4 font-light text-base outline-none placeholder:text-grey placeholder:font-medium duration-500 transition-colors focus:border-primary 
						${
              disabled === true
                ? "!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
                : state === "error"
                ? "border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400"
                : state === "success"
                ? "border-green-500 text-green-500 placeholder:text-green-500 dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400"
                : ""
            }`}
          onKeyDown={(event) => {
            if (
              isNumber &&
              !/[0-9]/.test(event.key) &&
              event.key !== "Backspace" &&
              event.key !== "Tab" &&
              event.key !== "Enter" &&
              event.key !== "ArrowLeft" &&
              event.key !== "ArrowRight"
            ) {
              event.preventDefault();
            }
          }}
          {...rest}
        />
      </div>
    );
  }
);

Field.displayName = "field";

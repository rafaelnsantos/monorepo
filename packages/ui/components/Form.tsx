import { ComponentProps, FormEvent, useCallback } from "react";

interface FormProps<Values> extends ComponentProps<"form"> {
  handleSubmit: (values: Values) => void;
}

export function Form<T>({ children, handleSubmit, ...props }: FormProps<T>) {
  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);
      handleSubmit(Object.fromEntries(formData.entries()) as unknown as T);
    },
    [handleSubmit]
  );

  return (
    <form {...props} onSubmit={onSubmit}>
      {children}
    </form>
  );
}

import type { ReactNode } from "react";
import { Checkbox, type CheckboxProps } from "./Checkbox";

export type CheckboxRowProps = CheckboxProps & {
  children: ReactNode;
};

export function CheckboxRow({ children, disabled, ...props }: CheckboxRowProps) {
  return (
    <label
      className={[
        "inline-flex items-center gap-2 text-base",
        disabled
          ? "text-ink-disabled cursor-not-allowed"
          : "text-ink-secondary cursor-pointer",
      ].join(" ")}
    >
      <Checkbox disabled={disabled} {...props} />
      {children}
    </label>
  );
}


import type { ComponentPropsWithoutRef } from "react";
import styles from "./Checkbox.module.css";

export type CheckboxProps = Omit<ComponentPropsWithoutRef<"input">, "type">;

export function Checkbox({ className, ...props }: CheckboxProps) {
  return (
    <span className={styles.wrap}>
      <input
        type="checkbox"
        className={[styles.input, className].filter(Boolean).join(" ")}
        {...props}
      />
    </span>
  );
}

import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ExclusiveIcon =
    | { startIcon: ReactNode; endIcon?: never }
    | { endIcon: ReactNode; startIcon?: never }
    | { startIcon?: never; endIcon?: never };

export type ButtonProps = Omit<ComponentPropsWithoutRef<"button">, "children"> & 
    ExclusiveIcon & {
    children: ReactNode;
};

export function Button({children, startIcon, endIcon, ...props}: ButtonProps) {
    return (
        <button 
            type="button" className={["text-sm text-ink-primary font-medium bg-surface px-[14px] py-[10px] rounded-[4px] border border-line-primary flex items-center gap-[8px]"].join(" ")}
            {...props}
        >
            {startIcon && <span>{startIcon}</span>}
            <span>{children}</span>
            {endIcon && <span>{endIcon}</span>}
        </button>
    )
}
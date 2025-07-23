import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import React from "react";

const spinnerVariants = cva("flex-col items-center justify-center", {
    variants: { show: { true: "flex", false: "hidden" } },
    defaultVariants: { show: true },
});

const loaderVariants = cva("animate-spin size-4");

interface SpinnerContentProps extends VariantProps<typeof spinnerVariants>, VariantProps<typeof loaderVariants> {
    className?: string;
    children?: React.ReactNode;
}

export function Spinner({ show, children, className }: SpinnerContentProps) {
    return (
        <span className={spinnerVariants({ show })}>
            <Loader2 className={cn(loaderVariants(), className)} />
            {children}
        </span>
    );
}

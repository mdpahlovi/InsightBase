import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all cursor-pointer disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none outline-none",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
                outline: "border border-primary/20 bg-primary/10 text-primary shadow-xs hover:bg-primary/20",
                secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
                ghost: "hover:bg-input/30",
                denger: "border border-red-500/20 bg-red-500/10 text-red-500 shadow-xs hover:bg-red-500/20",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "h-9 px-4 py-2 has-[>svg]:px-3",
                sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
                lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
                icon: "size-9",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

function Button({
    className,
    variant,
    size,
    asChild = false,
    ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
    const Comp = asChild ? Slot : "button";

    return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };

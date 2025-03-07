
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-gba-primary text-white border border-transparent shadow-md hover:-translate-y-1 hover:shadow-lg active:translate-y-0 active:shadow-md rounded-md",
        destructive: "bg-gba-accent text-white border border-transparent shadow-md hover:-translate-y-1 hover:shadow-lg active:translate-y-0 active:shadow-md rounded-md",
        outline: "border border-gba-border bg-transparent shadow-md hover:bg-muted hover:text-gba-dark hover:-translate-y-1 hover:shadow-lg active:translate-y-0 active:shadow-md rounded-md",
        secondary: "bg-gba-light text-gba-dark border border-gba-border shadow-md hover:-translate-y-1 hover:shadow-lg active:translate-y-0 active:shadow-md rounded-md",
        ghost: "hover:bg-muted hover:text-gba-dark",
        link: "text-gba-primary underline-offset-4 hover:underline",
        pokemon: "bg-pokemon-yellow text-black border border-transparent shadow-md hover:-translate-y-1 hover:shadow-lg active:translate-y-0 active:shadow-md rounded-md",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 py-1 text-xs",
        lg: "h-12 px-8 py-4 text-base",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

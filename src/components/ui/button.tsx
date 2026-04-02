import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "#/lib/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring-strong)] focus-visible:ring-offset-2 focus-visible:ring-offset-(--night-void)",
	{
		variants: {
			variant: {
				default:
					"border border-transparent bg-(--accent) text-white no-underline hover:bg-[#c2410c] hover:text-white",
				secondary:
					"border border-(--accent-border) bg-transparent text-(--text-main) hover:border-(--accent) hover:text-(--accent-soft)",
				ghost:
					"border border-transparent bg-transparent text-(--text-soft) hover:bg-(--surface) hover:text-(--text-main)",
			},
			size: {
				default: "h-11 px-5",
				sm: "h-9 px-4 text-xs",
				lg: "h-12 px-6 text-base",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

function Button({
	className,
	variant,
	size,
	...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants>) {
	return (
		<button
			data-slot="button"
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

export { Button, buttonVariants };

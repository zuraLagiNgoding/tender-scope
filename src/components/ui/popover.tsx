import { cn } from "@/libs/cn";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import type {
	PopoverContentProps,
	PopoverRootProps,
} from "@kobalte/core/popover";
import { Popover as PopoverPrimitive } from "@kobalte/core/popover";
import type { ParentProps, ValidComponent } from "solid-js";
import { mergeProps, splitProps } from "solid-js";

export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverTitle = PopoverPrimitive.Title;
export const PopoverDescription = PopoverPrimitive.Description;

export const Popover = (props: PopoverRootProps) => {
	const merge = mergeProps<PopoverRootProps[]>(
		{
			gutter: 4,
			flip: false,
		},
		props,
	);

	return <PopoverPrimitive {...merge} />;
};

type popoverContentProps<T extends ValidComponent = "div"> = ParentProps<
	PopoverContentProps<T> & {
		class?: string;
	}
>;

export const PopoverContent = <T extends ValidComponent = "div">(
	props: PolymorphicProps<T, popoverContentProps<T>>,
) => {
	const [local, rest] = splitProps(props as popoverContentProps, [
		"class",
		"children",
	]);

	return (
		<PopoverPrimitive.Portal>
			<PopoverPrimitive.Content
				class={cn(
					"z-50 w-60 rounded-md border border-neutral-100 bg-white p-4 text-popover-foreground shadow-md outline-none data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95",
					local.class,
				)}
				{...rest}
			>
				{local.children}
			</PopoverPrimitive.Content>
		</PopoverPrimitive.Portal>
	);
};

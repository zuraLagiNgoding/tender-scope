import { Search } from "lucide-solid";
import type { JSX } from "solid-js";

interface SearchInputProps {
  onInput?: JSX.EventHandlerUnion<HTMLInputElement, InputEvent>;
  placeholder?: string;
}

const SearchInput = ({onInput, placeholder}: SearchInputProps) => {
  return (
    <div class="flex items-center p-2 border border-neutral-100 rounded-lg w-full">
      <div class="mr-2">
        <Search size={18} />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        class="focus:outline-none w-full"
        onInput={onInput}
      />
    </div>
  );
}

export default SearchInput
import { ChevronDown, Funnel } from "lucide-solid";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { For } from "solid-js";
import SearchInput from "./ui/search-input";
import type { FilterComponentProps } from "@/interfaces/filter";
import { categoryOptions } from "@/const/options";

const sortOptions = [
  {
    label: "Latest Awarded",
    value: "",
  },
  {
    label: "Closest Deadline",
    value: "cd",
  },
  {
    label: "Newest",
    value: "ad",
  },
  {
    label: "Most Value",
    value: "av",
  },
];

const SearchForm = ({ filter, setFilter }: FilterComponentProps) => {
  return (
    <div class="w-full bg-white rounded-xl py-4 px-6 space-y-4 border border-neutral-200">
      <div class="flex gap-4">
        <SearchInput
          onInput={(v) =>
            setFilter({ ...filter(), search: v.currentTarget.value })
          }
          placeholder="Search tenders by title, description or purchaser"
        />
      </div>
      <div class="flex flex-col sm:flex-row gap-4">
        <Popover>
          <PopoverTrigger class="sm:w-fit w-full">
            <Button
              class="justify-between gap-12 sm:w-fit w-full"
              variant="outline"
            >
              <Funnel size={20} />
              {filter().category
                ? categoryOptions.find((f) => f.value === filter().category)
                    ?.label
                : "Category"}
              <ChevronDown size={20} />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <ul>
              <For each={categoryOptions}>
                {(option) => (
                  <li
                    class="text-sm text-neutral-600 px-1 py-1.5 not-last:border-b border-neutral-100 hover:bg-neutral-100 cursor-pointer"
                    onClick={() =>
                      setFilter({ ...filter(), category: option.value })
                    }
                  >
                    {option.label}
                  </li>
                )}
              </For>
            </ul>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger class="sm:w-fit w-full">
            <Button
              class="justify-between sm:w-[15rem] w-full"
              variant="outline"
            >
              <Funnel size={20} />
              {filter().sort
                ? sortOptions.find((f) => f.value === filter().sort)?.label
                : "Latest Awarded"}
              <ChevronDown size={20} />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <ul>
              <For each={sortOptions}>
                {(option) => (
                  <li
                    class="text-sm text-neutral-600 px-1 py-1.5 not-last:border-b border-neutral-100 hover:bg-neutral-100 cursor-pointer"
                    onClick={() =>
                      setFilter({ ...filter(), sort: option.value })
                    }
                  >
                    {option.label}
                  </li>
                )}
              </For>
            </ul>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default SearchForm;

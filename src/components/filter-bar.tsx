import { createMemo, createResource, createSignal, For, Show } from "solid-js";
import { Card, CardContent } from "./ui/card";
import { filterAreaOptions } from "@/const/options";
import { CheckSquare2, Square } from "lucide-solid";
import { Separator } from "./ui/separator";
import SearchInput from "./ui/search-input";
import type { Purchaser } from "@/interfaces/common";
import type { FilterComponentProps } from "@/interfaces/filter";

const FilterBar = ({ filter, setFilter }: FilterComponentProps) => {
  const [filterPurchaser, setFilterPurchaser] = createSignal("");

  const fetchPurchaserOptions = async () => {
    const res = await fetch("/api/hu/tenders/options/purchaser.json");
    return res.json();
  };

  const [purchaserOptions] = createResource(fetchPurchaserOptions);

  const filteredPurchasers = createMemo(() => {
    const keyword = filterPurchaser().toLowerCase();
    return (purchaserOptions() || []).filter((p: Purchaser) =>
      p.label.toLowerCase().includes(keyword)
    );
  });

  return (
    <Card class="col-span-1 md:col-span-2 h-fit">
      <CardContent class="py-6">
        <div>
          <h4 class="text-xl font-semibold">Filter by Area</h4>
          <div class="py-4">
            <For each={filterAreaOptions}>
              {(area) => (
                <div
                  class="flex items-center py-1 px-2 gap-4 cursor-pointer hover:bg-neutral-100"
                  onClick={() => setFilter({ ...filter(), area: area.value })}
                >
                  {filter().area === area.value ? (
                    <CheckSquare2 class="min-h-4 min-w-4 max-h-4 max-w-4" />
                  ) : (
                    <Square class="min-h-4 min-w-4 max-h-4 max-w-4" />
                  )}
                  <span>{area.label}</span>
                </div>
              )}
            </For>
          </div>
        </div>
        <Separator />
        <div>
          <h4 class="text-xl font-semibold">Filter by Purchaser</h4>
          <div class="py-2">
            <SearchInput
              onInput={(v) => setFilterPurchaser(v.currentTarget.value)}
              placeholder="Search purchaser data"
            />
          </div>
          <div class="py-4 max-h-[25rem] overflow-auto md:text-xs lg:text-base">
            <Show
              when={!purchaserOptions.loading}
              fallback={
                <div class="animate-pulse">
                  <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div class="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                </div>
              }
            >
              <For
                each={filteredPurchasers()}
                fallback={<div class="text-center py-4">No data found.</div>}
              >
                {(purchaser) => (
                  <div
                    class="flex items-center py-1 px-2 gap-4 cursor-pointer hover:bg-neutral-100"
                    onClick={() =>
                      setFilter({ ...filter(), purchaser: purchaser.key })
                    }
                  >
                    {filter().purchaser === purchaser.key ? (
                      <CheckSquare2 class="min-h-4 min-w-4 max-h-4 max-w-4" />
                    ) : (
                      <Square class="min-h-4 min-w-4 max-h-4 max-w-4" />
                    )}
                    <span>{purchaser.label}</span>
                  </div>
                )}
              </For>
            </Show>
          </div>
          <Separator />
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterBar;

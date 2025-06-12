import { For, type Accessor } from "solid-js";
import { Card, CardContent } from "./ui/card";
import type { LucideProps } from "lucide-solid";
import type { JSX } from "solid-js/jsx-runtime";

export interface InsightProps {
  stats: Accessor<{
    title: string;
    value: string;
    icon: (props: LucideProps) => JSX.Element;
    color: string;
  }[]>;
}

const Insight = ({ stats }: InsightProps) => {
  return (
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <For each={stats()}>
        {(stat) => (
          <Card>
            <CardContent class="p-6">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p class="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div class={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                  <stat.icon class="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </For>
    </div>
  );
};

export default Insight;

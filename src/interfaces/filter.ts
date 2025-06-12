import type { Accessor, Setter } from "solid-js";

export interface FilterComponentProps {
  filter: Accessor<Filter>;
  setFilter: Setter<Filter>;
}

export interface Filter {
  search: string;
  category: string;
  awardDate: string;
  sort: string;
  purchaser: string;
  area: string;
}
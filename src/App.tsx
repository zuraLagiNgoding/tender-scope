import { Building2, FileText, Search } from "lucide-solid";
import {
  createEffect,
  createMemo,
  createResource,
  createSignal,
  onMount,
} from "solid-js";
import SearchForm from "./components/search-form";
import TenderList from "./components/tender-list";
import FilterBar from "./components/filter-bar";
import type { Filter } from "./interfaces/filter";
import Insight from "./components/insight";
import { Button } from "./components/ui/button";

function App() {
  const [totalTenders, setTotalTenders] = createSignal<number>(0);
  const [totalPurchasers, setTotalPurchasers] = createSignal<number>(0);
  const [totalSuppliers, setTotalSuppliers] = createSignal<number>(0);
  const [filter, setFilter] = createSignal<Filter>({
    search: "",
    category: "",
    awardDate: "",
    sort: "",
    purchaser: "",
    area: "",
  });
  const [page, setPage] = createSignal(1);

  const filterParams = () => {
    const { search, category, awardDate, sort, purchaser, area } = filter();
    let uri = "";

    if (search) {
      uri += `&q=${search}`;
    }

    if (category) {
      uri += `&c=${category}`;
    }

    if (awardDate) {
      uri += `&d=${awardDate}`;
    }

    if (sort) {
      uri += `&o=${sort}`;
    }

    if (purchaser) {
      uri += `&p=${purchaser}`;
    }

    if (area) {
      uri += `&a=${area}`;
    }

    return uri;
  };

  const fetchTender = async () => {
    const res = await fetch("/api/hu/tenders?page=" + page() + filterParams());
    return res.json();
  };

  const [tenders] = createResource(
    () => (page() && filter() ? [page(), filter()] : false),
    fetchTender
  );

  const fetchTotalTenders = async () => {
    const res = await fetch("/api/hu/tenders");
    const data = await res.json();
    setTotalTenders(data.total);
  };

  const fetchTotalPurchasers = async () => {
    const res = await fetch("/api/hu/tenders/options/purchaser.json");
    const data = await res.json();
    setTotalPurchasers(data.length);
  };

  const fetchTotalSuppliers = async () => {
    const res = await fetch("/api/hu/tenders/options/awarded.supplier.json");
    const data = await res.json();
    setTotalSuppliers(data.length);
  };

  onMount(() => {
    fetchTotalTenders();
    fetchTotalPurchasers();
    fetchTotalSuppliers();
  });

  const stats = createMemo(() => [
    {
      title: "Total Tenders",
      value: totalTenders().toLocaleString(),
      icon: FileText,
      color: "text-blue-600",
    },
    {
      title: "Total Purchaser",
      value: totalPurchasers().toLocaleString(),
      icon: Building2,
      color: "text-blue-600",
    },
    {
      title: "Total Supplier",
      value: totalSuppliers().toLocaleString(),
      icon: Building2,
      color: "text-blue-600",
    },
  ]);

  createEffect(() => {
    if (tenders()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });

  return (
    <div class="min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-200">
      <header class="bg-white shadow-sm">
        <div class="container mx-auto px-4 py-4">
          <div class="flex items-center space-x-2">
            <Search size={26} class="stroke-3 text-sky-500" />
            <h1 class="text-2xl font-medium">Tender Scope</h1>
          </div>
        </div>
      </header>

      {/* Display & Search Form */}

      <section class="py-16 px-4">
        <div class="container mx-auto text-center">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">
            Explore Public Tenders & Procurement Opportunities
          </h2>
          <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Stay updated with the latest business opportunities in Hungary.
          </p>

          <div class="max-w-4xl mx-auto">
            <SearchForm setFilter={setFilter} filter={filter} />
          </div>
        </div>
      </section>

      {/* Insight */}

      <section class=" px-4">
        <div class="container mx-auto">
          <Insight stats={stats} />
        </div>
      </section>

      {/* Tender List */}

      <section class="py-16 px-4">
        <div class="container mx-auto ">
          <div class="grid grid-cols-1 md:grid-cols-7 lg:grid-cols-6 gap-8">
            <FilterBar filter={filter} setFilter={setFilter} />
            <TenderList
              loading={() => tenders.loading}
              data={() => tenders()?.data}
            />
          </div>
          <div class="flex justify-center pt-6">
            <div class="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page() === 1}
              >
                Previous
              </Button>
              <Button variant="outline" disabled>
                Page {page()}
              </Button>
              <Button
                variant="outline"
                onClick={() => setPage((p) => p + 1)}
                disabled={page() === tenders()?.page_count}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;

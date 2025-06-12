import { Building2, Calendar, Clock, ExternalLink, MapPin } from "lucide-solid";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { formatCurrency } from "@/libs/utils";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { createSignal, For, Show } from "solid-js";
import type { Tender } from "@/interfaces/common";
import TenderDetail from "./tender-detail";

interface TenderListProps {
  loading: () => boolean;
  data: () => Tender[] | undefined;
}

const TenderList = ({ loading, data }: TenderListProps) => {
  const [selectedTenderId, setSelectedTenderId] = createSignal<string | null>(
    null
  );
  const [isDrawerOpen, setIsDrawerOpen] = createSignal(false);

  const handleViewDetails = (tenderId: string) => {
    setSelectedTenderId(tenderId);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedTenderId(null);
  };

  return (
    <>
      <div class="sm:col-span-1 md:col-span-5 lg:col-span-4 space-y-4">
        <Show
          when={loading() === false}
          fallback={[...Array(3)].map((_) => (
            <div class="animate-pulse">
              <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div class="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div class="h-20 bg-gray-200 rounded"></div>
            </div>
          ))}
        >
          <For
            each={data()}
            fallback={
              <div class="text-center text-gray-500">No tenders available.</div>
            }
          >
            {(tender) => (
              <Card class="hover:shadow-md transition-shadow text-start">
                <CardHeader>
                  <div class="flex justify-between items-start">
                    <div class="flex-1">
                      <div class="text-start">
                        <p
                          class="hover:text-blue-600 font-semibold text-lg mb-2 cursor-pointer"
                          onClick={() => handleViewDetails(tender.id)}
                        >
                          {tender.title}
                        </p>
                        <div class="flex items-center gap-2 opacity-75">
                          <Building2 size={14} />
                          <p class="text-xs">{tender.purchaser.name}</p>
                        </div>
                      </div>
                      <CardTitle class="text-lg mb-2"></CardTitle>
                      <div class="flex flex-wrap gap-2 mb-3 capitalize">
                        <Badge variant="outline">{tender.category}</Badge>
                        <For each={tender.indicators}>
                          {(indicator) => (
                            <Badge class="bg-red-400 text-white">
                              {indicator
                                .replace(/_/g, " ")
                                .replace(/\b\w/g, (c) => c.toUpperCase())}
                            </Badge>
                          )}
                        </For>
                      </div>
                    </div>
                    <div class="text-right">
                      <div class="flex items-center font-medium text-gray-600 mb-1">
                        {tender.awarded_value
                          ? formatCurrency(tender.awarded_value) + " Ft"
                          : ""}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p class="text-gray-600 mb-6 line-clamp-2 text-justify">
                    {tender.description}
                  </p>

                  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-400 mb-4">
                    <div class="flex items-start">
                      <MapPin class="min-h-4 min-w-4 max-h-4 max-w-4 mr-2" />
                      <div class="flex flex-col">
                        <For each={tender.place.split(";").slice(0, 3)}>
                          {(loc, index) => (
                            <span class="line-clamp-3">
                              {loc.trim()}
                              {index() === 2 &&
                              tender.place.split(";").length > 3
                                ? " ..."
                                : ""}
                            </span>
                          )}
                        </For>
                      </div>
                    </div>
                    <div class="flex items-start">
                      <Calendar class="min-h-4 min-w-4 max-h-4 max-w-4 mr-2" />
                      <span class="leading-tight">
                        Published: {tender.date}
                      </span>
                    </div>
                    <div class="flex items-start">
                      <Clock class="min-h-4 min-w-4 max-h-4 max-w-4 mr-2" />
                      <span class="leading-tight">
                        Deadline: {tender.deadline_date}
                      </span>
                    </div>
                  </div>

                  <div class="flex justify-end items-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDetails(tender.id)}
                    >
                      View Details
                      <ExternalLink class="min-h-4 min-w-4 max-h-4 max-w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </For>
        </Show>
      </div>
      <TenderDetail
        id={selectedTenderId}
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
      />
    </>
  );
};

export default TenderList;

import {
  createResource,
  createSignal,
  For,
  Show,
  type Accessor,
} from "solid-js";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerLabel,
} from "./ui/drawer";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Building2,
  Calendar,
  Clock,
  Euro,
  FileText,
  Globe,
  Mail,
  MapPin,
  Phone,
  X,
} from "lucide-solid";
import type { Notice } from "@/interfaces/common";
import { formatCurrency } from "@/libs/utils";
import { Separator } from "./ui/separator";

interface TenderDetailProps {
  id: Accessor<string | null>;
  isOpen: Accessor<boolean>;
  onClose?: () => void;
}

const TenderDetail = ({ id, isOpen, onClose }: TenderDetailProps) => {
  const [showFullDesc, setShowFullDesc] = createSignal(false);

  const fetchTender = async (id: string | null) => {
    if (!id) return null;
    const res = await fetch("/api/hu/tenders/" + id);
    return res.json();
  };

  const [tender] = createResource(id, fetchTender);

  return (
    <Drawer
      open={isOpen()}
      onOpenChange={() => {
        if (onClose) {
          onClose();
          if (showFullDesc() === true) setShowFullDesc(false);
        }
      }}
    >
      <DrawerContent class="max-h-[90dvh] mb-8">
        <DrawerHeader class="flex justify-between items-center md:px-12 space-y-4">
          <DrawerLabel class="text-xl">Tender Detail</DrawerLabel>
          <DrawerClose class="outline-0">
            <X class="cursor-pointer" />
          </DrawerClose>
        </DrawerHeader>
        <Show
          when={!tender.loading}
          fallback={
            <div class="px-4 md:px-12 space-y-4">
              <For each={[...Array(5)]}>
                {() => (
                  <div class="animate-pulse">
                    <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div class="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div class="h-20 bg-gray-200 rounded"></div>
                  </div>
                )}
              </For>
            </div>
          }
        >
          <div class="px-4 md:px-12 overflow-auto">
            <Show when={tender()}>
              {(details) => (
                <div class="grid grid-cols-1 lg:grid-cols-6 gap-6">
                  {/* Header Information */}
                  <Card class="col-span-1 lg:col-span-2 h-fit">
                    <CardHeader>
                      <div class="flex items-start justify-between">
                        <div class="flex-1">
                          <CardTitle class="text-xl mb-2">
                            {details().title}
                          </CardTitle>
                          <div class="flex flex-wrap gap-2 mb-4">
                            <Badge variant="outline" class="capitalize">
                              {details().category}
                            </Badge>
                            <Badge>{details().phase_en}</Badge>
                            <For each={details().indicators}>
                              {(indicator) => (
                                <Badge class="bg-red-400 text-white">
                                  {indicator
                                    .replace(/_/g, " ")
                                    .replace(/\b\w/g, (c: string) =>
                                      c.toUpperCase()
                                    )}
                                </Badge>
                              )}
                            </For>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent class="space-y-6">
                      <div class="space-y-4 text-sm">
                        {details().awarded_value && (
                          <div class="flex items-center gap-4">
                            <Euro size={16} class="text-gray-500" />
                            <div>
                              <div class="font-medium">Value</div>
                              <div class="text-gray-600">
                                {formatCurrency(details().awarded_value)}
                              </div>
                            </div>
                          </div>
                        )}
                        <div class="flex items-center gap-4">
                          <Calendar size={16} class="text-gray-500" />
                          <div>
                            <div class="font-medium">Published</div>
                            <div class="text-gray-600">{details().date}</div>
                          </div>
                        </div>
                        <div class="flex items-center gap-4">
                          <Clock size={16} class="text-gray-500" />
                          <div>
                            <div class="font-medium">Deadline</div>
                            <div class="text-gray-600">
                              {details().deadline_date}
                            </div>
                          </div>
                        </div>
                        <div class="flex items-center gap-4">
                          <MapPin size={16} class="text-gray-500" />
                          <div>
                            <div class="font-medium">Location</div>
                            <div class="text-gray-600">{details().place}</div>
                          </div>
                        </div>
                        <div class="flex items-center gap-4">
                          <Euro size={16} class="text-gray-500" />
                          <div>
                            <div class="font-medium">Currency</div>
                            <div class="text-gray-600">
                              {details().awarded_currency}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Purchaser Information */}
                      <Card>
                        <CardHeader>
                          <CardTitle class="flex items-center gap-2">
                            <Building2 size={20} />
                            Purchaser Information
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div class="text-sm">
                            <div class="font-medium">Name</div>
                            <div class="text-gray-600">
                              {details().purchaser.name}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </CardContent>
                  </Card>

                  <div class="col-span-1 lg:col-span-4 space-y-6">
                    {/* Description */}
                    <Card>
                      <CardHeader>
                        <CardTitle class="flex items-center gap-2">
                          <FileText size={20} />
                          Description
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p
                          class={`text-sm leading-relaxed whitespace-pre-wrap transition-all ${
                            showFullDesc() ? "" : "line-clamp-4"
                          }`}
                        >
                          {details().description}
                        </p>
                        <Show
                          when={details().description?.split(" ").length > 80}
                        >
                          <button
                            class="mt-2 text-blue-600 text-sm hover:underline cursor-pointer"
                            onClick={() => setShowFullDesc(!showFullDesc())}
                          >
                            {showFullDesc() ? "Show less" : "Show more"}
                          </button>
                        </Show>
                      </CardContent>
                    </Card>

                    {/* Awarded Information */}
                    <Show when={details().awarded.length > 0}>
                      <Card>
                        <CardHeader>
                          <CardTitle class="flex items-center gap-2">
                            <Building2 size={20} />
                            Awarded{" "}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <For each={details().awarded}>
                            {(award, index) => (
                              <>
                                {index() !== 0 && <Separator class="my-2" />}
                                <div class="flex justify-between items-center text-sm">
                                  <div>
                                    <div class="font-medium">Name</div>
                                    <div class="text-gray-600">
                                      {award.suppliers_name}
                                    </div>
                                  </div>
                                  <span>
                                    {award.value.toLocaleString()}
                                    Ft
                                  </span>
                                </div>
                              </>
                            )}
                          </For>
                        </CardContent>
                      </Card>
                    </Show>

                    {/* Contracting Authorities */}
                    <Show when={details().data.contracting_authorities?.length}>
                      <Card>
                        <CardHeader>
                          <CardTitle class="flex items-center gap-2">
                            <Building2 size={20} />
                            Contracting Authorities
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div class="space-y-4">
                            <For each={details().data.contracting_authorities}>
                              {(authority) => (
                                <div class="border border-neutral-300 rounded-lg p-4">
                                  <h4 class="font-semibold mb-2">
                                    {authority.official_name}
                                  </h4>
                                  <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                                    <div>
                                      <div class="font-medium">Location</div>
                                      <div class="text-gray-600">
                                        {authority.city},{" "}
                                        {authority.postal_code}
                                      </div>
                                    </div>
                                    <Show when={authority.contact_person}>
                                      <div>
                                        <div class="font-medium">
                                          Contact Person
                                        </div>
                                        <div class="text-gray-600">
                                          {authority.contact_person}
                                        </div>
                                      </div>
                                    </Show>
                                    <Show when={authority.email}>
                                      <div class="flex items-center gap-2">
                                        <Mail size={16} />
                                        <a
                                          href={`mailto:${authority.email}`}
                                          class="text-blue-600 hover:underline"
                                        >
                                          {authority.email}
                                        </a>
                                      </div>
                                    </Show>
                                    <Show when={authority.phone}>
                                      <div class="flex items-center gap-2">
                                        <Phone size={16} />
                                        <span class="text-gray-600">
                                          {authority.phone}
                                        </span>
                                      </div>
                                    </Show>
                                    <Show when={authority.url}>
                                      <div class="flex items-center gap-2">
                                        <Globe size={16} />
                                        <a
                                          href={authority.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          class="text-blue-600 hover:underline"
                                        >
                                          {authority.url}
                                        </a>
                                      </div>
                                    </Show>
                                  </div>
                                </div>
                              )}
                            </For>
                          </div>
                        </CardContent>
                      </Card>
                    </Show>

                    {/* Implementing Bodies */}

                    <Show
                      when={
                        details().data.implementing_bodies &&
                        details().data.implementing_bodies.length > 0
                      }
                    >
                      <Card>
                        <CardHeader>
                          <CardTitle class="flex items-center gap-2">
                            <Building2 size={20} />
                            Implementing Bodies
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div class="space-y-4">
                            <For each={details().data.implementing_bodies}>
                              {(body) => (
                                <div class="border border-neutral-300 rounded-lg p-4">
                                  <h4 class="font-semibold mb-2">
                                    {body.official_name}
                                  </h4>
                                  <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                                    <div>
                                      <div class="font-medium">Location</div>
                                      <div class="text-gray-600">
                                        {body.city}, {body.postal_code}
                                      </div>
                                    </div>
                                    <Show when={body.email}>
                                      <div class="flex items-center gap-2">
                                        <Mail size={16} />
                                        <a
                                          href={`mailto:${body.email}`}
                                          class="text-blue-600 hover:underline"
                                        >
                                          {body.email}
                                        </a>
                                      </div>
                                    </Show>
                                    <Show when={body.phone}>
                                      <div class="flex items-center gap-2">
                                        <Phone size={16} />
                                        <span class="text-gray-600">
                                          {body.phone}
                                        </span>
                                      </div>
                                    </Show>
                                  </div>
                                </div>
                              )}
                            </For>
                          </div>
                        </CardContent>
                      </Card>
                    </Show>

                    {/* Notices */}
                    <Show when={details().notices}>
                      <Card>
                        <CardHeader>
                          <CardTitle class="flex items-center gap-2">
                            <FileText size={20} />
                            Notices
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div class="space-y-3">
                            <Show
                              when={
                                details()?.notices &&
                                Object.keys(details().notices).length
                              }
                            >
                              <div class="space-y-3">
                                <For
                                  each={
                                    Object.values(
                                      details()?.notices || {}
                                    ).flat() as Notice[]
                                  }
                                >
                                  {(notice) => (
                                    <div class="border border-neutral-300 rounded-lg p-3">
                                      <div class="flex items-center justify-between mb-2">
                                        <div class="font-medium text-sm md:text-base">
                                          {notice.type?.name ||
                                            notice.name ||
                                            "Notice"}
                                        </div>
                                        <Badge
                                          variant="outline"
                                          class="text-[8px] md:text-xs"
                                        >
                                          {notice.date}
                                        </Badge>
                                      </div>
                                      <div class="flex items-center gap-2 text-xs md:text-base">
                                        <FileText
                                          size={16}
                                          class="opacity-65 shrink-0"
                                        />
                                        <a
                                          href={notice.doc_url}
                                          class="text-blue-600 hover:underline line-clamp-1"
                                        >
                                          {notice.doc_url}
                                        </a>
                                      </div>
                                    </div>
                                  )}
                                </For>
                              </div>
                            </Show>
                          </div>
                        </CardContent>
                      </Card>
                    </Show>
                  </div>
                </div>
              )}
            </Show>
          </div>
        </Show>
      </DrawerContent>
    </Drawer>
  );
};

export default TenderDetail;

export interface Tender {
  id: string;
  title: string;
  description: string;
  category: string;
  awarded_value: string;
  date: string;
  deadline_date: string;
  place: string;
  phase_en: string;
  purchaser: {
    id: string;
    name: string;
  };
  indicators: string[]
}

export interface Notice {
  id: string;
  sid: string;
  name: string;
  type?: {
    name?: string;
    name_en?: string;
  };
  date: string;
  [key: string]: any;
}

export interface Purchaser {
  label: string;
  key: string;
}
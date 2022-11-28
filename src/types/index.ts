export interface Glass {
  id: string;
  name: string;
  price: number;
  media: Media[];
}

export interface Media {
  url: string;
}

export interface Filter {
  type: string;
  value: string;
}

export interface State {
  glasses: Glass[];
  filters: Filter[];
  totalCount: number;
  url: string;
  initUrl: string;
  pageIndex: number;
  pageNum: number;
  pageTitle: string;
}

export interface ColorFilter {
  name: string;
  value: string;
  url: string;
}

export interface ShapeFilter {
  name: string;
  value: string;
}

export type FilterOption = "color" | "shape" | undefined;

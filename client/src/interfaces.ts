export interface AdData {
  date: string;
  source: string;
  product: string;
  clicks: number;
  id: string;
}

export interface AdDataByKey {
  [key: string]: AdData[];
}

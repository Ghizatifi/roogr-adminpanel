export interface ChartData {
  series: number[];
  labels: string[];
  statesData: { label: string; count: number; link: string; color: string }[];
  total: number;
}
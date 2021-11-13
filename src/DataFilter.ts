import { GenreToggleMap } from "./GenreToggles";

export interface DataFilterProps {
  genreToggles: GenreToggleMap;
  yearStart?: number;
  yearEnd?: number;
}

export class DataFilter {
  genreToggles: GenreToggleMap;
  yearStart: number;
  yearEnd: number;
  constructor(props: DataFilterProps) {
    this.yearStart = props.yearStart ?? 1950;
    this.yearStart = this.yearStart > 1950 ? this.yearStart : 1950;
    this.yearEnd = props.yearStart ?? 2025;
    this.yearEnd = this.yearEnd < 2025 ? this.yearEnd : 2025;
    this.genreToggles = props.genreToggles;
  }
}

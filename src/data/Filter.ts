import { Toggles } from "../components/Toggles";

export interface FilterProps {
  genreToggles: Toggles;
  featureToggles: Toggles;
  yearStart?: number;
  yearEnd?: number;
}

export class Filter {
  genreToggles: Toggles;
  featureToggles: Toggles;
  yearStart: number;
  yearEnd: number;

  constructor(props: FilterProps) {
    this.yearStart = props.yearStart ?? 1950;
    this.yearStart = this.yearStart > 1950 ? this.yearStart : 1950;
    this.yearEnd = props.yearStart ?? 2025;
    this.yearEnd = this.yearEnd < 2025 ? this.yearEnd : 2025;
    this.genreToggles = props.genreToggles;
    this.featureToggles = props.featureToggles;
  }
}

import { Toggles } from "../components/Toggles";

const minYear = 1950;
const maxYear = 2020;

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
    this.yearStart = props.yearStart ?? minYear;
    this.yearStart = this.yearStart > minYear ? this.yearStart : minYear;
    this.yearEnd = props.yearStart ?? maxYear;
    this.yearEnd = this.yearEnd < maxYear ? this.yearEnd : maxYear;
    this.genreToggles = props.genreToggles;
    this.featureToggles = props.featureToggles;
  }
}

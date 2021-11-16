import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import React from "react";

export class GenreToggleMap extends Map<string, boolean> {
  selected(name: string): boolean {
    return this.get(name) ?? false;
  }

  selectedGenres(): string[] {
    return Array.from(this.keys()).filter((name) => this.selected(name));
  }
}

export function GenreToggles(props: {
  genreToggles: GenreToggleMap;
  setGenreToggles: (val: GenreToggleMap) => void;
  options: string[];
}) {
  function toggle(name: string) {
    return (
      <Switch
        value={props.genreToggles.get(name)}
        onChange={(e) => {
          const newToggles = new GenreToggleMap(props.genreToggles);
          newToggles.set(name, e.target.checked);
          props.setGenreToggles(newToggles);
        }}
      />
    );
  }

  return (
    <FormGroup>
      {props.options.map((name) => (
        <FormControlLabel key={name} control={toggle(name)} label={name} />
      ))}
    </FormGroup>
  );
}

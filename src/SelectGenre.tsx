import { Grid, TextField } from "@mui/material";
import { uniq } from "lodash/fp";
import { useState } from "react";
import { GenreToggles } from "./GenreToggles";

export function SelectGenre(props: {
  genreToggles: Map<string, boolean>;
  setGenreToggles: (val: Map<string, boolean>) => void;
  options: string[];
  selected: string[];
}) {
  const [search, setSearch] = useState("");

  const filtered = props.options
    .filter((name) => name && name.toLowerCase().includes(search))
    .slice(0, 10);
  const options = uniq([...filtered, ...props.selected]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <TextField
          label="search genres"
          variant="standard"
          onChange={(e) => setSearch(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <h4>Top matches</h4>
        <GenreToggles
          genreToggles={props.genreToggles}
          setGenreToggles={props.setGenreToggles}
          options={options}
        />
      </Grid>
    </Grid>
  );
}

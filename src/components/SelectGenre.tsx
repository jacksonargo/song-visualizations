import { FormControlLabel, FormGroup, Grid, TextField } from "@mui/material";
import { uniq } from "lodash/fp";
import React, { useState } from "react";
import { Toggles, ToggleSwitch } from "./Toggles";

export function SelectGenre(props: {
  toggles: Toggles;
  setToggles: (val: Toggles) => void;
  options: string[];
}) {
  const [search, setSearch] = useState("");

  const filtered = props.options
    .filter((name) => name && name.toLowerCase().includes(search))
    .slice(0, 10);

  const options = uniq([...filtered, ...props.toggles.selection()]);

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
        <FormGroup>
          {options.map((name) => (
            <FormControlLabel
              key={name}
              control={ToggleSwitch({ ...props, name })}
              label={name}
            />
          ))}
        </FormGroup>
      </Grid>
    </Grid>
  );
}

import {
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  Grid,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { Toggles, ToggleSwitch } from "./Toggles";

export function SelectGenre(props: {
  toggles: Toggles;
  setToggles: (val: Toggles) => void;
  options: string[];
}) {
  const [search, setSearch] = useState("");

  const matches = props.options
    .filter((name) => name.toLowerCase().includes(search))
    .slice(0, 10);

  const selectedToggles = props.toggles
    .selection()
    .map((name) => (
      <FormControlLabel
        key={name}
        control={ToggleSwitch({ ...props, name })}
        label={name}
      />
    ));

  return (
    <Stack>
      <h3>Selected Genres</h3>
      {props.toggles.selection().length === 0 ? (
        <em>all genres</em>
      ) : (
        selectedToggles
      )}
      <FormGroup>
        <TextField
          label="search genres"
          variant="standard"
          onChange={(e) => setSearch(e.target.value)}
        />
      </FormGroup>
      <h4>
        Matches ({matches.length}/{props.options.length})
      </h4>
      <Box>
        <FormGroup>
          {matches.map((name) => (
            <FormControlLabel
              key={name}
              label={name}
              control={ToggleSwitch({ ...props, name })}
            />
          ))}
        </FormGroup>
      </Box>
    </Stack>
  );
}

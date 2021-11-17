import { FormControlLabel, Stack } from "@mui/material";
import { useState } from "react";
import { AudioFeatures } from "../data/Dataset";
import { Toggles, ToggleSwitch } from "./Toggles";
import { isEmpty } from "lodash/fp";

export function useFeatureToggles(): [Toggles, (val: Toggles) => void] {
  const [toggles, setToggles] = useState(new Toggles());
  if (isEmpty(toggles.selection())) {
    const newToggles = new Toggles();
    AudioFeatures.forEach((name) => newToggles.set(name, true));
    setToggles(newToggles);
  }
  return [toggles, setToggles];
}

export function SelectFeature(props: {
  toggles: Toggles;
  setToggles: (val: Toggles) => void;
}) {
  return (
    <Stack>
      <h3>Selected Features</h3>
      {AudioFeatures.map((name) => (
        <FormControlLabel
          key={name}
          control={ToggleSwitch({ ...props, name })}
          label={name}
        />
      ))}
    </Stack>
  );
}

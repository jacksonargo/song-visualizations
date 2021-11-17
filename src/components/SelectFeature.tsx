import { Button, FormControlLabel, Stack, Tooltip } from "@mui/material";
import { useState } from "react";
import {
  AudioFeatureDefinitions,
  AudioFeatures,
  AudioFeature,
} from "../data/Dataset";
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
  const label = (name: AudioFeature) => (
    <Tooltip title={AudioFeatureDefinitions[name]} placement="right">
      <span>{name}</span>
    </Tooltip>
  );

  return (
    <Stack>
      <h3>Selected Features</h3>
      {AudioFeatures.map((name: AudioFeature) => (
        <FormControlLabel
          key={name}
          control={ToggleSwitch({ ...props, name })}
          label={label(name)}
        />
      ))}
    </Stack>
  );
}

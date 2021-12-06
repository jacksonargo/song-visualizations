import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { FormControlLabel, Stack, Tooltip } from "@mui/material";
import { isEmpty } from "lodash/fp";
import { useState } from "react";
import {
  AudioFeature,
  AudioFeatureDefinitions,
  AudioFeatures,
} from "../data/Dataset";
import { Toggles, ToggleSwitch } from "./Toggles";

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
      <span>
        {name} <HelpOutlineIcon fontSize={"small"} />
      </span>
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

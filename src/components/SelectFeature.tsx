import { Box, FormControlLabel, Stack } from "@mui/material";
import { AudioFeatures } from "../data/Dataset";
import { Toggles, ToggleSwitch } from "./Toggles";

export function SelectFeature(props: {
  hidden: boolean;
  toggles: Toggles;
  setToggles: (val: Toggles) => void;
}) {
  if (props.hidden) return <div />; // TODO: Make useful
  return (
    <Box>
      Toggle Features
      <Stack direction="row">
        {AudioFeatures.map((name) => (
          <FormControlLabel
            key={name}
            control={ToggleSwitch({ ...props, name })}
            label={name}
          />
        ))}
      </Stack>
    </Box>
  );
}

import { Switch } from "@mui/material";
import React from "react";

export class Toggles extends Map<string, boolean> {
  selected(name: string): boolean {
    return this.get(name) ?? false;
  }

  selection(): string[] {
    return Array.from(this.keys()).filter((name) => this.selected(name));
  }
}

export function ToggleSwitch(props: {
  name: string;
  toggles: Toggles;
  setToggles: (val: Toggles) => void;
}) {
  return (
    <Switch
      value={props.toggles.get(props.name)}
      onChange={(e) => {
        const newToggles = new Toggles(props.toggles);
        newToggles.set(props.name, e.target.checked);
        props.setToggles(newToggles);
      }}
    />
  );
}

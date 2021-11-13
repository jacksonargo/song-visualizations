import { FormControlLabel, FormGroup, Switch } from "@mui/material";

export function GenreToggles(props: {
  genreToggles: Map<string, boolean>;
  setGenreToggles: (val: Map<string, boolean>) => void;
  options: string[];
}) {
  function toggle(name: string) {
    return (
      <Switch
        value={props.genreToggles.get(name)}
        onChange={(e) => {
          const newToggles = new Map(props.genreToggles);
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

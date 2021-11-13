import {
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  TextField,
} from "@mui/material";
import { uniq } from "lodash/fp";
import { useState } from "react";
import { VegaLite } from "react-vega";
import { useCsvData } from "./CsvRow";
import { Dataset, GenreVisRow } from "./Dataset";
import { FeaturesByGenreSpec } from "./FeatureByGenreSpec";

export function FeaturesByGenreVis() {
  const dataBytes = useCsvData();
  const [genreToggles, setGenreToggles] = useState(new Map<string, boolean>());

  if (!dataBytes) return <p>Loading...</p>;
  const dataset = Dataset.fromBlob(dataBytes);

  const options = dataset.genres.reverse();
  const selectedGenres = Array.from(genreToggles.keys()).filter((name) =>
    genreToggles.get(name)
  );

  return (
    <Grid container>
      <Grid item xs={12}>
        <h2>Genres</h2>
      </Grid>
      <Grid container columnSpacing={2}>
        <Grid item sm={2}>
          <SelectGenre
            genreToggles={genreToggles}
            setGenreToggles={setGenreToggles}
            options={options}
            selected={selectedGenres}
          />
        </Grid>
        <Grid item sm={10}>
          <GenreVis
            baseTitle={"Variation in Features"}
            data={dataset.toGenreVisData()}
            genres={selectedGenres}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

function SelectGenre(props: {
  genreToggles: Map<string, boolean>;
  setGenreToggles: (val: Map<string, boolean>) => void;
  options: string[];
  selected: string[];
}) {
  const [search, setSearch] = useState("");

  const filtered = props.options
    .filter((name) => name && name.toLowerCase().includes(search))
    .slice(0, 5);
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

function GenreToggles(props: {
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

function GenreVis(props: {
  baseTitle: string;
  data: GenreVisRow[];
  genres?: string[];
  yearStart?: number;
  yearEnd?: number;
}) {
  const yearStart = props.yearStart ?? 0;
  const yearEnd = props.yearEnd ?? 3000;

  let title = props.baseTitle;
  if (props.genres && props.genres.length > 0)
    title += " | " + props.genres[0].replace(/^\w/, (c) => c.toUpperCase());
  if (props.genres && props.genres.length > 1) title += ", and others";

  return (
    <VegaLite
      spec={FeaturesByGenreSpec(
        title,
        props.data,
        props.genres ?? [],
        yearStart,
        yearEnd
      )}
    />
  );
}

export default FeaturesByGenreVis;

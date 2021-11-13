import { Box, Container, Grid } from "@mui/material";
import React, { lazy, Suspense, useState } from "react";
import { useCsvData } from "./CsvRow";
import { Dataset } from "./Dataset";
import { SelectGenre } from "./SelectGenre";

const FeaturesByGenreVis = lazy(() => import("./FeaturesByGenreVis"));
const TopArtistsForTheDecadeVis = lazy(
  () => import("./TopArtistsForTheDecadeVis")
);

const loadingMessage = <p>Loading...</p>;

function App() {
  const dataBytes = useCsvData();
  const [genreToggles, setGenreToggles] = useState(new Map<string, boolean>());

  if (!dataBytes) return loadingMessage;
  const dataset = Dataset.fromBlob(dataBytes);
  const options = dataset.genres.reverse();
  const selectedGenres = Array.from(genreToggles.keys()).filter((name) =>
    genreToggles.get(name)
  );

  return (
    <Suspense fallback={loadingMessage}>
      <Container>
        <Grid container>
          <Grid item xs={12}>
            <h1 style={{ textAlign: "center" }}>Audio Features</h1>
          </Grid>
          <Grid item xs={2}>
            <SelectGenre
              genreToggles={genreToggles}
              setGenreToggles={setGenreToggles}
              options={options}
              selected={selectedGenres}
            />
          </Grid>
          <Grid item xs={10}>
            <FeaturesByGenreVis dataset={dataset} genreToggles={genreToggles} />
            <TopArtistsForTheDecadeVis genreToggles={genreToggles} />
          </Grid>
        </Grid>
      </Container>
    </Suspense>
  );
}

export default App;

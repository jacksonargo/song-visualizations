import { Box, Container, Grid } from "@mui/material";
import React, { lazy, Suspense, useState } from "react";
import { useCsvData } from "./CsvRow";
import { Dataset } from "./Dataset";
import { GenreToggleMap } from "./GenreToggles";
import { SelectGenre } from "./SelectGenre";

const AudioFeaturesByGenreVis = lazy(() => import("./FeaturesByGenreVis"));
const CountTopArtistsByDecadeVis = lazy(
  () => import("./TopArtistsForTheDecadeVis")
);

const loadingMessage = <p>Loading...</p>;

function App() {
  const dataBytes = useCsvData();
  const [genreToggles, setGenreToggles] = useState(new GenreToggleMap());

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
            <h2>Variation in Features</h2>
            <AudioFeaturesByGenreVis
              dataset={dataset}
              genreToggles={genreToggles}
              height={300}
              width={800}
              yearStart={0}
              yearEnd={2022}
            />
            <h2>Count of Top Artists</h2>
            <CountTopArtistsByDecadeVis
              dataset={dataset}
              genreToggles={genreToggles}
              height={300}
              width={800}
              yearStart={0}
              yearEnd={2022}
              margin={{ left: 50, top: 50, right: 20, bottom: 20 }}
            />
          </Grid>
        </Grid>
      </Container>
    </Suspense>
  );
}

export default App;

import { Container, Grid } from "@mui/material";
import React, { lazy, Suspense, useState } from "react";
import { useCsvData } from "./CsvRow";
import { Dataset } from "./Dataset";
import { GenreToggleMap } from "./GenreToggles";
import { SelectGenre } from "./SelectGenre";

const AudioFeaturesByGenreVis = lazy(() => import("./FeaturesByGenreVis"));
const TopArtistsForTheDecadeVis = lazy(
  () => import("./TopArtistsPerDecadeBarsVis")
);
const TopArtistsByDecadeVis = lazy(
  () => import("./TopArtistsByDecadeDonutSpec")
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
            />
            <h2>Count of Top Artists</h2>
            <TopArtistsForTheDecadeVis
              dataset={dataset}
              genreToggles={genreToggles}
              height={300}
              width={800}
              margin={{ left: 50, top: 50, right: 20, bottom: 20 }}
            />
            <h2>Top Artists by Decade</h2>
            <TopArtistsByDecadeVis
              dataset={dataset}
              genreToggles={genreToggles}
              topN={10}
              height={300}
              width={800}
            />
          </Grid>
        </Grid>
      </Container>
    </Suspense>
  );
}

export default App;

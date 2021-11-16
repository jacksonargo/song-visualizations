import { Container, Grid, Switch } from "@mui/material";
import React, { Suspense, useState } from "react";
import { ArtistsByDecadeChart } from "./components/ArtistsByDecadeChart";
import { ArtistsSummaryChart } from "./components/ArtistsSummaryChart";
import { FeaturesAreaChart } from "./components/FeaturesAreaChart";
import { FeaturesRadarChart } from "./components/FeaturesRadarChart";
import { GenreToggleMap } from "./components/GenreToggles";
import { useCsvData } from "./data/CsvRow";
import { Dataset } from "./data/Dataset";
import { SelectGenre } from "./components/SelectGenre";

const loadingMessage = <p>Loading...</p>;

function App() {
  const dataBytes = useCsvData();
  const [genreToggles, setGenreToggles] = useState(new GenreToggleMap());

  const [showVariationAreaVis, setShowVariationAreaVis] = useState(true);
  const [showVariationsRadarVis, setShowVariationsRadarVis] = useState(false);
  const [showTopArtistsOverallBar, setShowTopArtistsOverallBar] =
    useState(false);
  const [showTopArtistsByDecadeBar, setShowTopArtistsByDecadeBars] =
    useState(false);

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
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <h1>Visualizing Audio Features over the Decades</h1>
            <em>Created by Jackson Argo, Matt Kinley, and Erick Martinez.</em>
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
            <Switch
              checked={showVariationAreaVis}
              onChange={(e) => {
                setShowVariationAreaVis(e.target.checked);
              }}
            />
            <FeaturesAreaChart
              show={showVariationAreaVis}
              dataset={dataset}
              genreToggles={genreToggles}
              height={300}
              width={800}
            />
            <h2>Variation in Features Radar</h2>
            <Switch
              checked={showVariationsRadarVis}
              onChange={(e) => {
                setShowVariationsRadarVis(e.target.checked);
              }}
            />
            <FeaturesRadarChart
              show={showVariationsRadarVis}
              dataset={dataset}
              genreToggles={genreToggles}
              height={400}
              width={400}
              padding={40}
            />
            <h2>Count of Top Artists</h2>
            <Switch
              checked={showTopArtistsOverallBar}
              onChange={(e) => {
                setShowTopArtistsOverallBar(e.target.checked);
              }}
            />
            <ArtistsSummaryChart
              show={showTopArtistsOverallBar}
              dataset={dataset}
              genreToggles={genreToggles}
              height={300}
              width={800}
              margin={{ left: 50, top: 50, right: 20, bottom: 20 }}
            />
            <h2>Top Artists by Decade</h2>
            <Switch
              checked={showTopArtistsByDecadeBar}
              onChange={(e) => {
                setShowTopArtistsByDecadeBars(e.target.checked);
              }}
            />
            <ArtistsByDecadeChart
              show={showTopArtistsByDecadeBar}
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

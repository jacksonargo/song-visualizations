import { Container, Grid, List, ListItem, Stack, Switch } from "@mui/material";
import React, { Suspense, useState } from "react";
import { ArtistsByDecadeChart } from "./components/ArtistsByDecadeChart";
import { ArtistsSummaryChart } from "./components/ArtistsSummaryChart";
import { FeaturesAreaChart } from "./components/FeaturesAreaChart";
import { FeaturesDonutChart } from "./components/FeaturesDonutChart";
import { FeaturesRadarChart } from "./components/FeaturesRadarChart";
import { SelectFeature, useFeatureToggles } from "./components/SelectFeature";
import { SelectGenre } from "./components/SelectGenre";
import { Toggles } from "./components/Toggles";
import { useData } from "./data/Dataset";
import { Filter } from "./data/Filter";

const loadingMessage = <p>Loading...</p>;

function App() {
  const [genreToggles, setGenreToggles] = useState(new Toggles());
  const [featureToggles, setFeatureToggles] = useFeatureToggles();
  const [yearStart] = useState<number | undefined>(undefined);
  const [yearEnd] = useState<number | undefined>(undefined);

  const [showVariationAreaVis, setShowVariationAreaVis] = useState(true);
  const [showVariationsRadarVis, setShowVariationsRadarVis] = useState(false);
  const [showTopArtistsOverallBar, setShowTopArtistsOverallBar] =
    useState(false);
  const [showTopArtistsByDecadeBar, setShowTopArtistsByDecadeBars] =
    useState(false);

  const dataset = useData();
  if (!dataset) return loadingMessage;
  const filter = new Filter({
    yearStart,
    yearEnd,
    featureToggles,
    genreToggles,
  });

  return (
    <Suspense fallback={loadingMessage}>
      <Container maxWidth={"xl"}>
        <Grid container columnSpacing={2}>
          <Grid item xs={2}>
            <Grid
              container
              style={{
                overflow: "auto",
                width: 200,
                height: "100vh",
                position: "fixed",
              }}
            >
              <SelectFeature
                toggles={featureToggles}
                setToggles={setFeatureToggles}
              />
              <SelectGenre
                toggles={genreToggles}
                setToggles={setGenreToggles}
                options={dataset.genres.reverse()}
              />
            </Grid>
          </Grid>
          <Grid item xs={10}>
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <h1>Visualizing Audio Features over the Decades</h1>
              <em>
                Created by Jackson Argo, Matt Kinkley, and Erick Martinez.
              </em>
            </Grid>
            <FeaturesDonutChart
              hidden={true}
              dataset={dataset}
              filter={filter}
              height={300}
              width={800}
            />
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
              filter={filter}
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
              filter={filter}
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
              filter={filter}
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
              filter={filter}
              topN={10}
              height={300}
              width={800}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container justifyContent={"center"}>
              <Grid item>
                <Stack spacing={{ xs: 3 }}>
                  <List>
                    <ListItem>
                      <a href="https://developer.spotify.com/documentation/web-api/reference/#/operations/get-audio-features">
                        Spotify's Audio Features API Docs
                      </a>
                    </ListItem>
                  </List>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Suspense>
  );
}

export default App;

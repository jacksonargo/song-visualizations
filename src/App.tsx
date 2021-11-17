import {
  Box,
  Container,
  Grid,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import React, { Suspense, useState } from "react";
import { ArtistsSummaryChart } from "./components/ArtistsSummaryChart";
import { FeaturesAreaChart } from "./components/FeaturesAreaChart";
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
        <Grid container>
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
          <Grid item xs={10} width={"100%"} justifyContent={"center"}>
            <Typography textAlign={"center"}>
              <h1>Visualizing Audio Features over the Decades</h1>
              <em>
                Created by Jackson Argo, Matt Kinkley, and Erick Martinez.
              </em>
            </Typography>

            <h2>Variation in Features</h2>
            <FeaturesAreaChart
              dataset={dataset}
              filter={filter}
              height={300}
              width={800}
            />
            <Box height={"100vh"}>
              <ArtistsSummaryChart
                title={"Count of Top Artists"}
                dataset={dataset}
                filter={filter}
                height={200}
                width={800}
                margin={{ left: 20, top: 20, right: 20, bottom: 20 }}
              />
            </Box>
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

import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import React, { Suspense, useState } from "react";
import { ArtistsChart } from "./components/ArtistsChart";
import { DataTable } from "./components/DataTable";
import { FeaturesChart } from "./components/FeaturesChart";
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

  const leftDrawerWidth = 250;
  const rightDrawerWidth = 200;
  let contentWidth = window.innerWidth - 2 * leftDrawerWidth - rightDrawerWidth;
  if (contentWidth < 600) contentWidth = 600;
  return (
    <Suspense fallback={loadingMessage}>
      <Box sx={{ display: "flex" }}>
        <Drawer
          sx={{
            width: leftDrawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: leftDrawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Box paddingX={2}>
            <SelectFeature
              toggles={featureToggles}
              setToggles={setFeatureToggles}
            />
            <SelectGenre
              toggles={genreToggles}
              setToggles={setGenreToggles}
              options={dataset.genres.reverse()}
            />
            <Divider />
            <a
              style={{ paddingBottom: 5 }}
              href="https://developer.spotify.com/documentation/web-api/reference/#/operations/get-audio-features"
            >
              Spotify API Docs
            </a>
          </Box>
        </Drawer>

        <Box
          width={contentWidth}
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
          <h1 style={{ textAlign: "center" }}>
            Visualizing Audio Features over the Decades
          </h1>
          <Typography textAlign={"center"}>
            <em>Created by Jackson Argo, Matt Kinkley, and Erick Martinez.</em>
          </Typography>

          <FeaturesChart
            id={"features-chart"}
            title="Explore Features"
            dataset={dataset}
            filter={filter}
            width={contentWidth}
          />

          <ArtistsChart
            id={"artists-chart"}
            title={"Artists Breakdown"}
            dataset={dataset}
            filter={filter}
            height={400}
            width={contentWidth}
            margin={{ left: 20, top: 20, right: 20, bottom: 20 }}
          />

          <DataTable id={"data-table"} dataset={dataset} filter={filter} />
        </Box>

        <Drawer
          sx={{
            width: rightDrawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: rightDrawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="right"
        >
          <Box paddingX={2}>
            <h3>Navigation</h3>
            <List>
              <ListItem>
                <a href="#features-chart">Explore Features</a>
              </ListItem>
              <ListItem>
                <a href="#artists-chart">Artists Breakdown</a>
              </ListItem>
              <ListItem>
                <a href="#data-table">Data Table</a>
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </Box>
    </Suspense>
  );
}

export default App;

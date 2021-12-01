import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
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

  const drawerWidth = 240;
  let contentWidth = window.innerWidth - 2 * drawerWidth;
  if (contentWidth < 600) contentWidth = 600;
  return (
    <Suspense fallback={loadingMessage}>
      <Box sx={{ display: "flex" }}>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
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
          <Typography textAlign={"center"}>
            <h1>Visualizing Audio Features over the Decades</h1>
            <em>Created by Jackson Argo, Matt Kinkley, and Erick Martinez.</em>
          </Typography>

          <h2>Variation in Features</h2>
          <FeaturesAreaChart
            dataset={dataset}
            filter={filter}
            height={300}
            width={contentWidth}
          />
          <ArtistsSummaryChart
            title={"Count of Top Artists"}
            dataset={dataset}
            filter={filter}
            height={400}
            width={contentWidth}
            margin={{ left: 20, top: 20, right: 20, bottom: 20 }}
          />
        </Box>
      </Box>
    </Suspense>
  );
}

export default App;

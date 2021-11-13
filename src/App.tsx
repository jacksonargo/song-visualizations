import { Container } from "@mui/material";
import { lazy, Suspense } from "react";

const FeaturesByGenreVis = lazy(() => import("./FeaturesByGenreVis"));
const TopArtistsForTheDecadeVis = lazy(
  () => import("./TopArtistsForTheDecadeVis")
);

function App() {
  return (
    <Suspense fallback={"Loading..."}>
      <Container>
        <h1 style={{ textAlign: "center" }}>Audio Features</h1>
        <FeaturesByGenreVis />
        <h1>Top Artists for the Decade</h1>
        <TopArtistsForTheDecadeVis />
      </Container>
    </Suspense>
  );
}

export default App;

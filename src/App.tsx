import { Container } from "@mui/material";
import { lazy, Suspense } from "react";

const FeaturesByGenreVis = lazy(() => import("./FeaturesByGenreVis"));

function App() {
  return (
    <Suspense fallback={"Loading..."}>
      <Container>
        <h1 style={{ textAlign: "center" }}>Audio Features</h1>
        <FeaturesByGenreVis />
      </Container>
    </Suspense>
  );
}

export default App;

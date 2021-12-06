import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { AudioFeatures, Dataset } from "../data/Dataset";
import { Filter } from "../data/Filter";

export function DataTable(props: { dataset: Dataset; filter: Filter }) {
  const [searchInput, setSearchInput] = useState("");

  const data = props.dataset
    .selectCSVRows(props.filter)
    .filter(
      (r) => r.name.includes(searchInput) || r.artist.includes(searchInput)
    )
    .sort((a, b) => {
      if (a.year() !== b.year()) return a.year() - b.year();
      if (a.artist.localeCompare(b.artist) !== 0)
        return a.artist.localeCompare(b.artist);
      return a.name.localeCompare(b.name);
    });

  return (
    <Stack style={{ height: "100vh" }} padding={2}>
      <h2 id={"DataTable"}>Data Table</h2>
      <p>View the entire dataset with filters from the left column applied.</p>
      <TextField
        size="small"
        label="search songs"
        variant="outlined"
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <TableContainer
        style={{ overflowX: "scroll", overflowY: "scroll", height: "100%" }}
      >
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Year</TableCell>
              <TableCell>Artist</TableCell>
              <TableCell>Song Name</TableCell>
              {AudioFeatures.map((name) => (
                <TableCell key={name}>
                  {name[0].toUpperCase() + name.slice(1)}
                </TableCell>
              ))}
              <TableCell>Artist Genres</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((r, i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{r.year()}</TableCell>
                <TableCell>{r.artist}</TableCell>
                <TableCell style={{ minWidth: 200 }}>{r.name}</TableCell>
                {AudioFeatures.map((name) => (
                  <TableCell align="right" key={name}>
                    {r[name]}
                  </TableCell>
                ))}
                <TableCell style={{ minWidth: 250 }}>
                  {r.genres().join(", ")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}

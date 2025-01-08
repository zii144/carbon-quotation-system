import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";

export default function MaintenanceMaterialInfoForm() {
  const [unit, setUnit] = useState("");
  const [materialData, setMaterialData] = useState([
    { name: "2120PT", cost: 4, unit: "CC" },
    { name: "GR-103", cost: 0.7, unit: "CC" },
    { name: "IGS-743", cost: 1, unit: "CC" },
    { name: "IGS-844", cost: 1, unit: "CC" },
    { name: "零件品", cost: 0, unit: "CC" },
  ]);

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      {/* Form Section */}
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <TextField fullWidth label="材質名稱" />
        </Grid>
        <Grid item xs={3}>
          <Box
            display="flex"
            alignItems="center"
            gap={2}
            sx={{ height: "56px" }}
          >
            <Button variant="outlined" sx={{ height: "100%" }}>
              Φ
            </Button>
            <Button variant="outlined" sx={{ height: "100%" }}>
              KII
            </Button>
          </Box>
        </Grid>

        <Grid item xs={9}>
          <TextField fullWidth label="素材成本" type="number" />
        </Grid>

        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputLabel>單位名稱</InputLabel>
            <Select value={unit} onChange={(e) => setUnit(e.target.value)}>
              <MenuItem value="CC">CC</MenuItem>
              <MenuItem value="KG">KG</MenuItem>
              <MenuItem value="M">M</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Button Section */}
      <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
        {["新增", "修改", "刪除", "清除資料", "取消"].map((text, index) => (
          <Button
            key={text}
            variant={index === 0 ? "contained" : "outlined"}
            color={index === 2 ? "error" : "primary"}
            disabled={index === 1 || index === 2}
            sx={{
              px: 4,
              py: 1,
            }}
          >
            {text}
          </Button>
        ))}
      </Box>

      {/* Table Section */}
      <Box sx={{ mt: 5 }}>
        <Typography variant="h6">材質資料列表</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>材質</TableCell>
                <TableCell>素材成本</TableCell>
                <TableCell>單位名稱</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {materialData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.cost}</TableCell>
                  <TableCell>{row.unit}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}

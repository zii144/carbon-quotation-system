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

export default function CentralDrawingNumberForm() {
  const [formData, setFormData] = useState({
    businessCategory: "",
    drawingType: "",
    drawingNumber: "",
    customerName: "",
    material: "",
    size: "",
    customerDrawing: "",
    customerMaterial: "",
    manufacturingPlan: "",
  });

  const [tableData, setTableData] = useState([
    {
      type: "C",
      number: "0001",
      date: "2024-01-03",
      customer: "聖供",
      material: "RK683",
      size: "6.3*10.8*20",
      partNumber: "B02089P",
    },
    {
      type: "E",
      number: "0001",
      date: "2024-01-03",
      customer: "正曜",
      material: "CS114",
      size: "740Φ*710/",
      partNumber: "",
    },
  ]);

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      {/* Creation Date Section */}
      <Box sx={{ textAlign: "right", mb: 2 }}>
        <Typography variant="body1">
          建立日期: {new Date().toLocaleDateString("zh-TW")}
        </Typography>
      </Box>

      {/* Form Section */}
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputLabel>業務擔當</InputLabel>
            <Select
              value={formData.businessCategory}
              onChange={(e) =>
                setFormData({ ...formData, businessCategory: e.target.value })
              }
            >
              <MenuItem value="A">A</MenuItem>
              <MenuItem value="B">B</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputLabel>圖號-類別</InputLabel>
            <Select
              value={formData.drawingType}
              onChange={(e) =>
                setFormData({ ...formData, drawingType: e.target.value })
              }
            >
              <MenuItem value="C">C</MenuItem>
              <MenuItem value="E">E</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={3}>
          <TextField
            fullWidth
            label="圖號-號碼"
            value={formData.drawingNumber}
            onChange={(e) =>
              setFormData({ ...formData, drawingNumber: e.target.value })
            }
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            label="客戶名稱"
            value={formData.customerName}
            onChange={(e) =>
              setFormData({ ...formData, customerName: e.target.value })
            }
          />
        </Grid>

        <Grid item xs={3}>
          <TextField
            fullWidth
            label="材質"
            value={formData.material}
            onChange={(e) =>
              setFormData({ ...formData, material: e.target.value })
            }
          />
        </Grid>

        <Grid item xs={1.5}>
          <TextField
            fullWidth
            label="尺寸"
            value={formData.size}
            onChange={(e) => setFormData({ ...formData, size: e.target.value })}
          />
        </Grid>

        <Grid item xs={1.5}>
          <Box
            display="flex"
            alignItems="center"
            gap={2}
            sx={{ height: "56px" }}
          >
            <Button variant="outlined" sx={{ height: "100%" }}>
              Φ
            </Button>
          </Box>
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            label="客戶圖號"
            value={formData.customerDrawing}
            onChange={(e) =>
              setFormData({ ...formData, customerDrawing: e.target.value })
            }
          />
        </Grid>

        <Grid item xs={3}>
          <TextField
            fullWidth
            label="客戶料號"
            value={formData.customerMaterial}
            onChange={(e) =>
              setFormData({ ...formData, customerMaterial: e.target.value })
            }
          />
        </Grid>

        <Grid item xs={3}>
          <TextField
            fullWidth
            label="製圖擔當"
            value={formData.manufacturingPlan}
            onChange={(e) =>
              setFormData({ ...formData, manufacturingPlan: e.target.value })
            }
          />
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
        <Typography variant="h6">圖號資料列表</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>圖號-類別</TableCell>
                <TableCell>圖號-號碼</TableCell>
                <TableCell>製圖日期</TableCell>
                <TableCell>客戶</TableCell>
                <TableCell>材質</TableCell>
                <TableCell>尺 寸</TableCell>
                <TableCell>客戶料號</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row) => (
                <TableRow key={row.number}>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.number}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.customer}</TableCell>
                  <TableCell>{row.material}</TableCell>
                  <TableCell>{row.size}</TableCell>
                  <TableCell>{row.partNumber}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}

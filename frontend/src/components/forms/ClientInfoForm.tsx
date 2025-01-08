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
  Checkbox,
} from "@mui/material";
import { useState } from "react";

export default function ClientInfoForm() {
  const [region, setRegion] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [department, setDepartment] = useState("");
  const [clientData, setClientData] = useState([
    {
      id: "02632468",
      manager: "陳柏元",
      company: "七信工業(股)",
      address: "桃鶯巷山...",
      contact: "張先生",
      phone: "33252626",
      email: "example@mail.com",
    },
    {
      id: "86412635",
      manager: "郭昭賢",
      company: "九豪實業",
      address: "桃園巷...",
      contact: "林文川",
      phone: "03-45075...",
      email: "info@mail.com",
    },
  ]);

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Box sx={{ textAlign: "right", mb: 2 }}>
        <Typography variant="body1">
          建立日期: {new Date().toLocaleDateString("zh-TW")}
        </Typography>
      </Box>

      {/* Form Section */}
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <TextField fullWidth label="統一編號" />
        </Grid>
        <Grid item xs={2}>
          <Button variant="outlined" fullWidth sx={{ height: "56px" }}>
            查 詢
          </Button>
        </Grid>

        <Grid item xs={5}>
          <FormControl fullWidth>
            <InputLabel>業務擔當</InputLabel>
            <Select
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
            >
              <MenuItem value="陳柏元">陳柏元</MenuItem>
              <MenuItem value="郭昭賢">郭昭賢</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <Button variant="outlined" fullWidth sx={{ height: "56px" }}>
            查 詢
          </Button>
        </Grid>

        <Grid item xs={10}>
          <TextField fullWidth label="公司名稱" />
        </Grid>
        <Grid item xs={2}>
          <Button variant="outlined" fullWidth sx={{ height: "56px" }}>
            查 詢
          </Button>
        </Grid>

        <Grid item xs={3}>
          <TextField fullWidth label="聯絡人員" />
        </Grid>
        <Grid item xs={3}>
          <TextField fullWidth label="行動電話" />
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>廠區部門</InputLabel>
            <Select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <MenuItem value="北區">北區</MenuItem>
              <MenuItem value="南區">南區</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <TextField fullWidth label="聯絡電話" />
        </Grid>

        <Grid item xs={6}>
          <TextField fullWidth label="傳真號碼" />
        </Grid>

        <Grid item xs={9}>
          <TextField fullWidth label="聯絡MAIL" />
        </Grid>

        <Grid item xs={3}>
          <FormControl>
            <Box display="flex" alignItems="center" sx={{ height: "56px" }}>
              <Typography sx={{ mr: 1 }}>註 銷:</Typography>
              <Checkbox />
            </Box>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TextField fullWidth label="公司地址" />
        </Grid>

        <Grid item xs={12}>
          <TextField fullWidth label="交貨地址" />
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
        <Typography variant="h6">客戶資料列表</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>統一編號</TableCell>
                <TableCell>業務擔當</TableCell>
                <TableCell>公司名稱</TableCell>
                <TableCell>公司地址</TableCell>
                <TableCell>聯絡人員</TableCell>
                <TableCell>聯絡電話</TableCell>
                <TableCell>聯絡MAIL</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clientData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.manager}</TableCell>
                  <TableCell>{row.company}</TableCell>
                  <TableCell>{row.address}</TableCell>
                  <TableCell>{row.contact}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>{row.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}

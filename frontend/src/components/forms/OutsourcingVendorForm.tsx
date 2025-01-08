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

export default function OutsourcingVendorForm() {
  const [contactPerson, setContactPerson] = useState("");
  const [fax, setFax] = useState("");
  const [vendorData, setVendorData] = useState([
    {
      id: "24435808",
      company: "中億碳素廠",
      address: "桃園市新...",
      contact: "李忠技",
      phone: "03-486-52..",
      mobile: "0936-605-..",
      email: "k093892...",
      year: 2023,
    },
    {
      id: "70725225",
      company: "正曜工業",
      address: "桃園市平...",
      contact: "彭達通",
      phone: "03-490-81..",
      mobile: "0970-505-..",
      email: "jy.inc@ms..",
      year: 2024,
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
        <Grid item xs={10}>
          <TextField fullWidth label="公司名稱" />
        </Grid>
        <Grid item xs={2}>
          <Button variant="outlined" fullWidth sx={{ height: "56px" }}>
            查 詢
          </Button>
        </Grid>

        <Grid item xs={3}>
          <TextField fullWidth label="統一編號" />
        </Grid>
        <Grid item xs={2}>
          <Button variant="outlined" fullWidth sx={{ height: "56px" }}>
            查 詢
          </Button>
        </Grid>

        <Grid item xs={7}>
          <TextField fullWidth label="聯絡窗口" />
        </Grid>

        <Grid item xs={5}>
          <TextField fullWidth label="聯絡電話" />
        </Grid>

        <Grid item xs={7}>
          <TextField
            fullWidth
            label="傳真號碼"
            value={fax}
            onChange={(e) => setFax(e.target.value)}
          />
        </Grid>

        <Grid item xs={5}>
          <TextField fullWidth label="聯絡MAIL" />
        </Grid>

        <Grid item xs={4}>
          <TextField
            fullWidth
            label="行動電話"
            value={contactPerson}
            onChange={(e) => setContactPerson(e.target.value)}
          />
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
          <TextField fullWidth label="交易內容" />
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
        <Typography variant="h6">廠商資料列表</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>統一編號</TableCell>
                <TableCell>公司名稱</TableCell>
                <TableCell>公司地址</TableCell>
                <TableCell>聯絡窗口</TableCell>
                <TableCell>聯絡電話</TableCell>
                <TableCell>行動電話</TableCell>
                <TableCell>聯絡MAIL</TableCell>
                <TableCell>建立</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vendorData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.company}</TableCell>
                  <TableCell>{row.address}</TableCell>
                  <TableCell>{row.contact}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>{row.mobile}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.year}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}

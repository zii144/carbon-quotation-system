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
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useState } from "react";

export default function OrderApprovalForm() {
  const [formData, setFormData] = useState({
    inquiryNumber: "",
    department: "",
    drawingType: "",
    drawingNumber: "",
    productName: "",
    material: "",
    customerNumber: "",
    orderNumber: "",
    invoiceRemarks: "",
    note: false,
    managerApproval: false,
    unit: "",
    quantity: "",
    unitPrice: "",
    totalPrice: "",
    totalCost: "",
    profitMargin: "",
    creationDate: new Date().toLocaleDateString("zh-TW"),
  });

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Box sx={{ textAlign: "right", mb: 2 }}>
        <Typography variant="body1">
          建立日期: {new Date().toLocaleDateString("zh-TW")}
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {/* Inquiry Number, Department, and Drawing */}
        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputLabel>填表業務</InputLabel>
            <Select value={formData.department}>
              <MenuItem value="Sales">業務部</MenuItem>
              <MenuItem value="Finance">財務部</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputLabel>詢價單號</InputLabel>
            <Select value={formData.inquiryNumber}>
              <MenuItem value="Q2024-01">Q2024-01</MenuItem>
              <MenuItem value="Q2024-02">Q2024-02</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={3}>
          <TextField fullWidth label="客戶名稱" />
        </Grid>

        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputLabel>加工部門別</InputLabel>
            <Select value={formData.department}>
              <MenuItem value="Milling">銑床</MenuItem>
              <MenuItem value="Turning">車床</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Drawing Type and Number */}
        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputLabel>中央圖號</InputLabel>
            <Select value={formData.drawingType}>
              <MenuItem value="C">C 類</MenuItem>
              <MenuItem value="E">E 類</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={3}>
          <TextField fullWidth label="號碼" />
        </Grid>

        {/* Product Info */}
        <Grid item xs={3}>
          <TextField fullWidth label="品 名" />
        </Grid>

        <Grid item xs={3}>
          <TextField fullWidth label="材 質" />
        </Grid>

        {/* Customer and Order Details */}
        <Grid item xs={3}>
          <TextField fullWidth label="客戶料號" />
        </Grid>

        <Grid item xs={3}>
          <TextField fullWidth label="訂單號碼" />
        </Grid>

        <Grid item xs={3}>
          <TextField fullWidth label="傳票備註" multiline rows={2} />
        </Grid>

        <Grid item xs={3}>
          <FormControlLabel
            control={<Checkbox checked={formData.note} />}
            label="註 銷"
          />
        </Grid>

        {/* Size, Unit, and Price Details */}
        <Grid item xs={3}>
          <TextField fullWidth label="尺 寸" />
        </Grid>

        <Grid item xs={3}>
          <TextField fullWidth label="單 位" />
        </Grid>

        <Grid item xs={3}>
          <TextField fullWidth label="數 量" />
        </Grid>

        <Grid item xs={3}>
          <TextField fullWidth label="單 價" />
        </Grid>

        <Grid item xs={3}>
          <TextField fullWidth label="總 價" />
        </Grid>

        {/* Cost and Profit */}
        <Grid item xs={3}>
          <TextField fullWidth label="合計總成本" />
        </Grid>

        <Grid item xs={3}>
          <TextField fullWidth label="利 潤 率" />
        </Grid>

        <Grid item xs={3}>
          <FormControlLabel
            control={<Checkbox checked={formData.managerApproval} />}
            label="業務經理簽核"
          />
        </Grid>

        {/* Remarks Section */}
        <Grid item xs={6}>
          <TextField fullWidth multiline rows={3} label="加工內容" />
        </Grid>
      </Grid>

      {/* Buttons */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <Button variant="contained">送 出</Button>
        <Button variant="outlined">取 消</Button>
      </Box>
    </Container>
  );
}

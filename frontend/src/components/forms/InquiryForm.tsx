import {
  Box,
  Button,
  Container,
  Grid,
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

export default function InquiryForm() {
  const [formData, setFormData] = useState({
    inquiryNumber: "202412220001",
    businessCategory: "",
    customerName: "",
    contactPerson: "",
    materialNumber: "",
    drawingNumber: "",
    inquiryQuantity: "",
    industryType: "",
    customerPurpose: "",
    productSize: "",
    material: "",
    note: false,
  });

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
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="詢價單號"
            value={formData.inquiryNumber}
            disabled
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>填表業務</InputLabel>
            <Select
              value={formData.businessCategory}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  businessCategory: e.target.value,
                })
              }
            >
              <MenuItem value="A">業務一</MenuItem>
              <MenuItem value="B">業務二</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>產業別</InputLabel>
            <Select
              value={formData.industryType}
              onChange={(e) =>
                setFormData({ ...formData, industryType: e.target.value })
              }
            >
              <MenuItem value="Manufacturing">製造業</MenuItem>
              <MenuItem value="Service">服務業</MenuItem>
            </Select>
          </FormControl>
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

        <Grid item xs={6}>
          <TextField
            fullWidth
            label="客戶用途"
            value={formData.customerPurpose}
            onChange={(e) =>
              setFormData({ ...formData, customerPurpose: e.target.value })
            }
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            label="客戶聯絡人"
            value={formData.contactPerson}
            onChange={(e) =>
              setFormData({ ...formData, contactPerson: e.target.value })
            }
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            label="製品尺寸"
            value={formData.productSize}
            onChange={(e) =>
              setFormData({ ...formData, productSize: e.target.value })
            }
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            label="客戶料號"
            value={formData.materialNumber}
            onChange={(e) =>
              setFormData({ ...formData, materialNumber: e.target.value })
            }
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            label="客戶圖號"
            value={formData.drawingNumber}
            onChange={(e) =>
              setFormData({ ...formData, drawingNumber: e.target.value })
            }
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            label="客戶詢價數量"
            value={formData.inquiryQuantity}
            type="number"
            onChange={(e) =>
              setFormData({ ...formData, inquiryQuantity: e.target.value })
            }
          />
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>材 質</InputLabel>
            <Select
              value={formData.material}
              onChange={(e) =>
                setFormData({ ...formData, material: e.target.value })
              }
            >
              <MenuItem value="Steel">鋼</MenuItem>
              <MenuItem value="Aluminum">鋁</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.note}
                onChange={(e) =>
                  setFormData({ ...formData, note: e.target.checked })
                }
              />
            }
            label="註 銷"
          />
        </Grid>
      </Grid>

      {/* Button Section */}
      <Box
        sx={{
          mt: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button variant="contained" sx={{ width: "45%" }}>
          送 出
        </Button>
        <Button variant="outlined" sx={{ width: "45%" }}>
          取消 並 離開
        </Button>
      </Box>
    </Container>
  );
}

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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";

interface InquiryData {
  id?: number;
  inquiry_number: string;
  business_category: string;
  customer_name: string;
  contact_person: string;
  material_number: string;
  drawing_number: string;
  inquiry_quantity: number;
  industry_type: string;
  customer_purpose: string;
  product_size: string;
  material: string;
  note: boolean;
  created_at?: string;
  updated_at?: string;
}

export default function InquiryForm() {
  // Generate a random inquiry number, e.g., "2024" + MMDD + 4 random digits
  function generateInquiryNumber() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    return `${year}${month}${day}${randomDigits}`;
  }

  const [formData, setFormData] = useState({
    inquiryNumber: generateInquiryNumber(),
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

  // Form validation errors
  const [formErrors, setFormErrors] = useState({
    businessCategory: false,
    customerName: false,
    contactPerson: false,
    materialNumber: false,
    drawingNumber: false,
    inquiryQuantity: false,
    industryType: false,
    customerPurpose: false,
    productSize: false,
    material: false,
  });

  // State for existing inquiry data
  const [inquiryData, setInquiryData] = useState<InquiryData[]>([]);

  // Fetch existing inquiry data
  const fetchInquiryData = async () => {
    try {
      const response = await axios.get("/api/inquiries");
      setInquiryData(response.data);
    } catch (error) {
      console.error("Error fetching inquiry data:", error);
      // If API doesn't exist yet, set empty array
      setInquiryData([]);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchInquiryData();
  }, []);

  // Handle form submission
  const handleSubmit = async () => {
    const newFormErrors = {
      businessCategory: !formData.businessCategory,
      customerName: !formData.customerName,
      contactPerson: !formData.contactPerson,
      materialNumber: !formData.materialNumber,
      drawingNumber: !formData.drawingNumber,
      inquiryQuantity: !formData.inquiryQuantity,
      industryType: !formData.industryType,
      customerPurpose: !formData.customerPurpose,
      productSize: !formData.productSize,
      material: !formData.material,
    };

    console.log("Form Data: ", formData);
    console.log("Form Errors: ", newFormErrors);

    setFormErrors(newFormErrors);

    const isFormValid = !Object.values(newFormErrors).some((error) => error);

    if (!isFormValid) {
      alert("請填寫完整資料");
      return;
    }

    // If validation passes, submit the form
    console.log("Form is valid, submitting:", formData);

    try {
      // Prepare data for API submission
      const submitData = {
        inquiry_number: formData.inquiryNumber,
        business_category: formData.businessCategory,
        customer_name: formData.customerName,
        contact_person: formData.contactPerson,
        material_number: formData.materialNumber,
        drawing_number: formData.drawingNumber,
        inquiry_quantity: parseInt(formData.inquiryQuantity),
        industry_type: formData.industryType,
        customer_purpose: formData.customerPurpose,
        product_size: formData.productSize,
        material: formData.material,
        note: formData.note,
      };

      await axios.post("/api/inquiries", submitData);
      alert("詢價單已成功送出！");

      // Clear form and refresh data
      handleClear();
      fetchInquiryData();
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      alert("送出失敗，請稍後再試");
    }
  };

  // Clear form fields
  const handleClear = () => {
    setFormData({
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
    setFormErrors({
      businessCategory: false,
      customerName: false,
      contactPerson: false,
      materialNumber: false,
      drawingNumber: false,
      inquiryQuantity: false,
      industryType: false,
      customerPurpose: false,
      productSize: false,
      material: false,
    });
  };

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
          <FormControl fullWidth error={formErrors.businessCategory}>
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
          <FormControl fullWidth error={formErrors.industryType}>
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
            error={formErrors.customerName}
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
            error={formErrors.customerPurpose}
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
            error={formErrors.contactPerson}
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
            error={formErrors.productSize}
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
            error={formErrors.materialNumber}
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
            error={formErrors.drawingNumber}
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
            error={formErrors.inquiryQuantity}
            type="number"
            onChange={(e) =>
              setFormData({ ...formData, inquiryQuantity: e.target.value })
            }
          />
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth error={formErrors.material}>
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
        <Button
          variant="contained"
          sx={{ width: "45%" }}
          onClick={handleSubmit}
        >
          送出
        </Button>
        <Button variant="outlined" sx={{ width: "45%" }} onClick={handleClear}>
          消除資料
        </Button>
      </Box>

      {/* Data Display Section */}
      <Box sx={{ mt: 5 }}>
        <Typography variant="h6" gutterBottom>
          現有詢價單資料
        </Typography>

        {inquiryData.length === 0 ? (
          <Typography variant="body1" sx={{ textAlign: "center", py: 4 }}>
            目前沒有任何數據
          </Typography>
        ) : (
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>詢價單號</TableCell>
                  <TableCell>填表業務</TableCell>
                  <TableCell>客戶名稱</TableCell>
                  <TableCell>聯絡人</TableCell>
                  <TableCell>料號</TableCell>
                  <TableCell>圖號</TableCell>
                  <TableCell>數量</TableCell>
                  <TableCell>產業別</TableCell>
                  <TableCell>客戶用途</TableCell>
                  <TableCell>尺寸</TableCell>
                  <TableCell>材質</TableCell>
                  <TableCell>註銷</TableCell>
                  <TableCell>建立時間</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {inquiryData.map((row, index) => (
                  <TableRow key={row.id || index}>
                    <TableCell>{row.inquiry_number}</TableCell>
                    <TableCell>{row.business_category}</TableCell>
                    <TableCell>{row.customer_name}</TableCell>
                    <TableCell>{row.contact_person}</TableCell>
                    <TableCell>{row.material_number}</TableCell>
                    <TableCell>{row.drawing_number}</TableCell>
                    <TableCell>{row.inquiry_quantity}</TableCell>
                    <TableCell>{row.industry_type}</TableCell>
                    <TableCell>{row.customer_purpose}</TableCell>
                    <TableCell>{row.product_size}</TableCell>
                    <TableCell>{row.material}</TableCell>
                    <TableCell>{row.note ? "是" : "否"}</TableCell>
                    <TableCell>
                      {row.created_at
                        ? new Date(row.created_at).toLocaleDateString("zh-TW")
                        : ""}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Container>
  );
}

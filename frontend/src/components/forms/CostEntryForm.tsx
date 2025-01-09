import {
  Box,
  Button,
  Container,
  Grid,
  FormGroup,
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

export default function CostEntryForm() {
  const [formData, setFormData] = useState({
    inquiryNumber: "",
    productionType: "",
    material: "",
    materialCost: "",
    unit: "",
    productSize: "",
    accuracyRate: "",
    tax: "",
    shippingCost: "",
    otherCost: "",
    totalCost: "",
    processingTime: "",
    processingCost: "",
    outsourcingCompany: "",
    outsourcingCost: "",
    remarks: "",
    machiningOptions: [],
    factoryApproval: false,
    factorySignature: false,
  });

  const handleCheckboxChange = (option) => {
    setFormData((prev) => ({
      ...prev,
      machiningOptions: prev.machiningOptions.includes(option)
        ? prev.machiningOptions.filter((item) => item !== option)
        : [...prev.machiningOptions, option],
    }));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      {/* Creation Date Section */}
      <Box sx={{ textAlign: "right", mb: 2 }}>
        <Typography variant="body1">
          建立日期: {new Date().toLocaleDateString("zh-TW")}
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {/* Inquiry Number and Production Type */}
        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputLabel>詢價單號</InputLabel>
            <Select value={formData.inquiryNumber}>
              <MenuItem value="001">001</MenuItem>
              <MenuItem value="002">002</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputLabel>生產類型</InputLabel>
            <Select value={formData.productionType}>
              <MenuItem value="Mass">大量生產</MenuItem>
              <MenuItem value="Custom">少量客製</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <TextField fullWidth label="材 質" />
        </Grid>
        <Grid item xs={3}>
          <TextField fullWidth label="製品尺寸" />
        </Grid>

        {/* Product Size, Accuracy, Tax, Shipping */}
        <Grid item xs={3}>
          <TextField fullWidth label="匯率" />
        </Grid>
        <Grid item xs={3}>
          <TextField fullWidth label="關稅 ($)" />
        </Grid>
        <Grid item xs={3}>
          <TextField fullWidth label="運費 ($)" />
        </Grid>
        <Grid item xs={3}>
          <TextField fullWidth label="素材成本 ($)" />
        </Grid>

        {/* Knife Tool Cost Section */}
        <Grid item xs={3}>
          <TextField fullWidth label="刀具成本 ($)" />
        </Grid>
        <Grid item xs={9}>
          <TextField fullWidth label="刀具成本內容備註" />
        </Grid>

        {/* Tool Cost Section */}
        <Grid item xs={3}>
          <TextField fullWidth label="模具成本 ($)" />
        </Grid>
        <Grid item xs={9}>
          <TextField fullWidth label="模具成本內容備註" />
        </Grid>

        {/* Others Cost Section */}
        <Grid item xs={3}>
          <TextField fullWidth label="其他成本 ($)" />
        </Grid>
        <Grid item xs={9}>
          <TextField fullWidth label="其他成本內容備註" />
        </Grid>

        <Grid item xs={3}>
          <TextField fullWidth label="合計 ($)" disabled />
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" sx={{ height: "100%", width: "100%" }}>
            執行合計
          </Button>
        </Grid>
        <Grid item xs={3}>
          <FormControl>
            <Box display="flex" alignItems="center" sx={{ height: "56px" }}>
              <Typography>廠務簽核:</Typography>
              <Checkbox />
            </Box>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl>
            <Box display="flex" alignItems="center" sx={{ height: "56px" }}>
              <Typography>廠長代簽:</Typography>
              <Checkbox />
            </Box>
          </FormControl>
        </Grid>

        {/* Machining Options (Checkboxes) */}
        <Box sx={{ padding: 3 }}>
          <Grid container spacing={3}>
            {/* Left Section - Processing Content */}
            <Grid item xs={6}>
              <Typography variant="h6">加工內容:</Typography>
              <FormControl component="fieldset">
                <FormControl component="fieldset">
                  <FormGroup>
                    <Grid container spacing={1.5} xs={6}>
                      <Grid item xs={6}>
                        <FormControlLabel control={<Checkbox />} label="車床" />
                      </Grid>
                      <Grid item xs={6}>
                        <FormControlLabel control={<Checkbox />} label="銑床" />
                      </Grid>
                      <Grid item xs={6}>
                        <FormControlLabel control={<Checkbox />} label="CNC" />
                      </Grid>
                      <Grid item xs={6}>
                        <FormControlLabel control={<Checkbox />} label="手工" />
                      </Grid>
                      <Grid item xs={6}>
                        <FormControlLabel control={<Checkbox />} label="鋸床" />
                      </Grid>
                      <Grid item xs={6}>
                        <FormControlLabel control={<Checkbox />} label="後備" />
                      </Grid>
                      <Grid item xs={6}>
                        <FormControlLabel control={<Checkbox />} label="後備" />
                      </Grid>
                      <Grid item xs={6}>
                        <FormControlLabel control={<Checkbox />} label="後備" />
                      </Grid>
                    </Grid>
                  </FormGroup>
                </FormControl>
                <Grid item xs={12}>
                  <Button variant="contained" fullWidth sx={{ mt: 2 }}>
                    修改選項
                  </Button>
                </Grid>
              </FormControl>

              <Box sx={{ marginTop: 2 }}>
                <Typography variant="h6">內容備註:</Typography>
                <TextField multiline rows={6} fullWidth variant="outlined" />
              </Box>
            </Grid>

            {/* Right Section - Cost and Calculation */}
            <Grid item xs={6}>
              <TextField label="總加工時間" fullWidth margin="dense" />
              <TextField label="加工成本 $" fullWidth margin="dense" />
              <TextField label="委外公司名稱" fullWidth margin="dense" />
              <TextField label="委外成本 $" fullWidth margin="dense" />
              <TextField
                label="加工時間及委外成本合計 $"
                fullWidth
                margin="dense"
                disabled
              />
              <Button variant="contained" sx={{ mt: 2, width: "100%" }}>
                執行合計
              </Button>

              <TextField
                label="總成本合計 $"
                fullWidth
                margin="dense"
                disabled
              />
            </Grid>

            {/* Signature Section */}
            <Grid item xs={6}>
              <FormControlLabel control={<Checkbox />} label="廠長簽核" />
              <FormControlLabel control={<Checkbox />} label="廠務代簽" />
            </Grid>

            {/* Bottom Section - Submit Button */}
            <Grid item xs={12}>
              <Button variant="contained" disabled fullWidth sx={{ mt: 2 }}>
                預覽送出
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Container>
  );
}

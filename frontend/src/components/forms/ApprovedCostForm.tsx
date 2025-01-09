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
  Collapse,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import { useState, Fragment } from "react";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function ApprovedCostForm() {
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
    approvalDate: new Date().toLocaleDateString("zh-TW"),
  });

  // Define the row type
  interface Row {
    id: number;
    invoice: string;
  }

  // State with type
  const [openRow, setOpenRow] = useState<number | null>(null);

  // Define the rows array with type
  const rows: Row[] = [
    { id: 1, invoice: "202312110001" },
    { id: 2, invoice: "202312190002" },
    { id: 3, invoice: "202401020001" },
    { id: 4, invoice: "202402210001" },
  ];

  const handleToggleRow = (rowId: number) => {
    setOpenRow(openRow === rowId ? null : rowId);
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
          <FormControl fullWidth disabled>
            <InputLabel>詢價單號</InputLabel>
            <Select value={formData.inquiryNumber}>
              <MenuItem value="001">001</MenuItem>
              <MenuItem value="002">002</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth disabled>
            <InputLabel>生產類型</InputLabel>
            <Select value={formData.productionType}>
              <MenuItem value="Mass">大量生產</MenuItem>
              <MenuItem value="Custom">少量客製</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <TextField disabled fullWidth label="材 質" />
        </Grid>
        <Grid item xs={3}>
          <TextField disabled fullWidth label="製品尺寸" />
        </Grid>

        {/* Product Size, Accuracy, Tax, Shipping */}
        <Grid item xs={3}>
          <TextField disabled fullWidth label="匯率" />
        </Grid>
        <Grid item xs={3}>
          <TextField disabled fullWidth label="關稅 ($)" />
        </Grid>
        <Grid item xs={3}>
          <TextField disabled fullWidth label="運費 ($)" />
        </Grid>
        <Grid item xs={3}>
          <TextField disabled fullWidth label="素材成本 ($)" />
        </Grid>

        {/* Knife Tool Cost Section */}
        <Grid item xs={3}>
          <TextField disabled fullWidth label="刀具成本 ($)" />
        </Grid>
        <Grid item xs={9}>
          <TextField disabled fullWidth label="刀具成本內容備註" />
        </Grid>

        {/* Tool Cost Section */}
        <Grid item xs={3}>
          <TextField disabled fullWidth label="模具成本 ($)" />
        </Grid>
        <Grid item xs={9}>
          <TextField disabled fullWidth label="模具成本內容備註" />
        </Grid>

        {/* Others Cost Section */}
        <Grid item xs={3}>
          <TextField disabled fullWidth label="其他成本 ($)" />
        </Grid>
        <Grid item xs={9}>
          <TextField disabled fullWidth label="其他成本內容備註" />
        </Grid>

        <Grid item xs={6}>
          <TextField disabled fullWidth label="合計 ($)" />
        </Grid>
        <Grid item xs={3}>
          <FormControl>
            <Box display="flex" alignItems="center" sx={{ height: "56px" }}>
              <Typography>廠務簽核:</Typography>
              <Checkbox disabled />
            </Box>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl>
            <Box display="flex" alignItems="center" sx={{ height: "56px" }}>
              <Typography>廠長代簽:</Typography>
              <Checkbox disabled />
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
                <FormControl disabled component="fieldset">
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
              </FormControl>

              <Box sx={{ marginTop: 2 }}>
                <Typography variant="h6">內容備註:</Typography>
                <TextField
                  disabled
                  multiline
                  rows={6}
                  fullWidth
                  variant="outlined"
                />
              </Box>
            </Grid>

            {/* Right Section - Cost and Calculation */}
            <Grid item xs={6}>
              <TextField disabled label="總加工時間" fullWidth margin="dense" />
              <TextField disabled label="加工成本 $" fullWidth margin="dense" />
              <TextField
                disabled
                label="委外公司名稱"
                fullWidth
                margin="dense"
              />
              <TextField disabled label="委外成本 $" fullWidth margin="dense" />
              <TextField
                disabled
                label="加工時間及委外成本合計 $"
                fullWidth
                margin="dense"
              />
              <TextField
                disabled
                label="總成本合計 $"
                fullWidth
                margin="dense"
              />
            </Grid>

            {/* Signature Section */}
            <Grid item xs={6}>
              <FormControlLabel
                disabled
                control={<Checkbox />}
                label="廠長簽核"
              />
              <FormControlLabel
                disabled
                control={<Checkbox />}
                label="廠務代簽"
              />
            </Grid>

            {/* Bottom Section - Submit Button */}
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "center", gap: 3 }}
            >
              <Button variant="contained" fullWidth sx={{ mt: 2 }}>
                儲存
              </Button>
              <Button variant="contained" fullWidth sx={{ mt: 2 }}>
                離開
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* Inquiry List Section */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>詢價單號</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <Fragment key={row.id}>
                  <TableRow>
                    <TableCell>
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => handleToggleRow(row.id)}
                      >
                        {openRow === row.id ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>
                    </TableCell>
                    <TableCell>{row.invoice}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      colSpan={6}
                    >
                      <Collapse
                        in={openRow === row.id}
                        timeout="auto"
                        unmountOnExit
                      >
                        <Box margin={1}>
                          <Typography variant="body2">詳細資訊</Typography>
                          <Typography>
                            這裡可以填寫該筆資料的詳細說明。
                          </Typography>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Container>
  );
}

import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  ButtonProps,
} from "@mui/material";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

interface Vendor {
  company_name: string;
  unified_number: number;
  contact_window: string;
  contact_phone: number;
  fax_number: number;
  contact_email: string;
  mobile_phone: number;
  company_address: string;
  transaction_details: string;
  created_at?: string;
}

export default function OutsourcingVendorForm() {
  const [vendorData, setVendorData] = useState<Vendor[]>([]);

  useEffect(() => {
    fetchVendorsData();
  }, []);

  //?? Form Values
  const [formValues, setFormValues] = useState({
    form_company_name: "",
    form_unified_number: "" as number | string,
    form_contact_window: "",
    form_contact_phone: "",
    form_fax_number: "",
    form_contact_email: "",
    form_mobile_phone: "",
    form_company_address: "",
    form_transaction_details: "",
  });

  //?? Form Vaildation
  // Form Errors
  const [formErrors, setFormErrors] = useState({
    form_company_name: false,
    form_unified_number: false,
    form_contact_window: false,
    form_contact_phone: false,
    form_fax_number: false,
    form_contact_email: false,
    form_mobile_phone: false,
    form_company_address: false,
    form_transaction_details: false,
  });

  // Clear Form Fields
  const handleClearFields = () => {
    setFormValues({
      form_company_name: "",
      form_unified_number: "",
      form_contact_window: "",
      form_contact_phone: "",
      form_fax_number: "",
      form_contact_email: "",
      form_mobile_phone: "",
      form_company_address: "",
      form_transaction_details: "",
    });
    setFormErrors({
      form_company_name: false,
      form_unified_number: false,
      form_contact_window: false,
      form_contact_phone: false,
      form_fax_number: false,
      form_contact_email: false,
      form_mobile_phone: false,
      form_company_address: false,
      form_transaction_details: false,
    });
    setSelectedRow("");
  };

  //?? Fetch Vendors Data
  const fetchVendorsData = async () => {
    axios
      .get("/api/vendors", {
        responseType: "json",
      })
      .then((response) => {
        setVendorData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching vendors data: ", error);
      });
  };

  // ?? Add Vendor
  const handleAddVendor = () => {
    const newVendor: Vendor = {
      company_name: formValues.form_company_name,
      unified_number: formValues.form_unified_number as number,
      contact_window: formValues.form_contact_window,
      contact_phone: parseInt(formValues.form_contact_phone),
      fax_number: parseInt(formValues.form_fax_number),
      contact_email: formValues.form_contact_email,
      mobile_phone: parseInt(formValues.form_mobile_phone),
      company_address: formValues.form_company_address,
      transaction_details: formValues.form_transaction_details,
      created_at: new Date().toISOString().split("T")[0],
    };

    const newFormErrors = {
      form_company_name: !newVendor.company_name,
      form_unified_number: !newVendor.unified_number,
      form_contact_window: !newVendor.contact_window,
      form_contact_phone: !newVendor.contact_phone,
      form_fax_number: !newVendor.fax_number,
      form_contact_email: !newVendor.contact_email,
      form_mobile_phone: !newVendor.mobile_phone,
      form_company_address: !newVendor.company_address,
      form_transaction_details: !newVendor.transaction_details,
    };

    console.log("New Vendor: ", newVendor);
    console.log("New Form Errors: ", newFormErrors);

    setFormErrors(newFormErrors);

    const isFormValid = !Object.values(newFormErrors).some((error) => error);

    if (!isFormValid) {
      alert("請填寫完整資料");
      return;
    }

    console.log("Adding new vendor:", newVendor);

    axios
      .post("/api/vendors", newVendor)
      .then(() => {
        alert(`成功新增廠商: ${newVendor.company_name}`);
        handleClearFields();
        fetchVendorsData();
      })
      .catch((error) => {
        console.error(
          "Error adding vendor:",
          error.response?.data || error.message
        );
        alert(`廠商新增失敗: ${error.response?.data || error.message}`);
      });
  };

  // ?? Update Vendor
  const handleUpdateVendor = () => {
    if (!selectedRow) {
      alert("請選擇要修改的廠商");
      return;
    }

    const updatedVendor: Vendor = {
      company_name: formValues.form_company_name,
      unified_number: formValues.form_unified_number as number,
      contact_window: formValues.form_contact_window,
      contact_phone: parseInt(formValues.form_contact_phone),
      fax_number: parseInt(formValues.form_fax_number),
      contact_email: formValues.form_contact_email,
      mobile_phone: parseInt(formValues.form_mobile_phone),
      company_address: formValues.form_company_address,
      transaction_details: formValues.form_transaction_details,
    };

    console.log("Updated Vendor: ", updatedVendor);

    axios
      .put(`/api/vendors/${updatedVendor.unified_number}`, updatedVendor)
      .then(() => {
        alert(`修改廠商成功，廠商名稱: ${updatedVendor.company_name}`);
        handleClearFields();
        fetchVendorsData();
      })
      .catch((error) => {
        console.error("Error updating vendor:", error);
        alert("廠商資料更新失敗！");
      });
  };

  // ?? Delete Vendor
  const handleDeleteVendor = () => {
    if (!selectedRow) {
      alert("請選擇要刪除的廠商");
      return;
    }

    const selectedVendor = vendorData.find(
      (vendor) => vendor.unified_number === selectedRow
    );

    if (!selectedVendor) {
      alert("找不到要刪除的廠商");
      return;
    }

    const isConfirmed = window.confirm(
      `確定要刪除廠商: ${selectedVendor.unified_number} 嗎?`
    );

    if (!isConfirmed) {
      return;
    }

    axios
      .delete(`/api/vendors/${selectedVendor.unified_number}`)
      .then(() => {
        alert(`成功刪除廠商:: ${selectedVendor.company_name}`);
        setSelectedRow("");
        handleClearFields();
        fetchVendorsData();
      })
      .catch((error) => {
        console.error("Error deleting vendor:", error);
        alert("刪除廠商失敗！");
      });
  };

  //?? Button Handlers
  //#region Button Handlers
  interface ButtonConfig {
    text: string;
    variant: ButtonProps["variant"];
    color: ButtonProps["color"];
    onClick: () => void;
    disabled?: boolean;
  }

  const buttonConfigs: ButtonConfig[] = [
    {
      text: "新增",
      variant: "contained",
      color: "primary",
      onClick: handleAddVendor,
    },
    {
      text: "修改",
      variant: "outlined",
      color: "primary",
      onClick: handleUpdateVendor,
      disabled: false,
    },
    {
      text: "刪除",
      variant: "outlined",
      color: "error",
      onClick: handleDeleteVendor,
      disabled: false,
    },
    {
      text: "清除欄位",
      variant: "outlined",
      color: "primary",
      onClick: handleClearFields,
    },
    {
      text: "刷新資料表",
      variant: "outlined",
      color: "primary",
      onClick: fetchVendorsData,
    },
  ];

  const ButtonSection: React.FC = () => {
    return (
      <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
        {buttonConfigs.map((config) => (
          <Button
            key={config.text}
            variant={config.variant}
            color={config.color}
            onClick={config.onClick}
            disabled={config.disabled}
            sx={{
              px: 4,
              py: 1,
            }}
          >
            {config.text}
          </Button>
        ))}
      </Box>
    );
  };
  //#endregion Button Handlers

  //?? Row Selection Handlers
  //#region Row Selection Handlers
  const [selectedRow, setSelectedRow] = useState<number | string>(""); // For row selection

  const handleRowClick = (vendor: Vendor) => {
    const isRowSelected = selectedRow === vendor.unified_number;

    if (!isRowSelected) {
      // Select and fill form only if the row isn't already selected
      setSelectedRow(vendor.unified_number);
      scrollToTop();
      handleRowSelectedData(vendor);
      alert(
        `選擇廠商: ${vendor.company_name}，請在輸入欄位中更改資料，然後點擊「修改」，以套用更動`
      );
    } else {
      // Deselect row
      setSelectedRow("");
      // Clear form fields on deselect
      handleClearFields();
    }
  };

  const handleRowSelectedData = (vendor: Vendor) => {
    setFormValues({
      form_company_name: vendor.company_name,
      form_unified_number: vendor.unified_number as number,
      form_contact_window: vendor.contact_window,
      form_contact_phone: vendor.contact_phone.toString(),
      form_fax_number: vendor.fax_number.toString(),
      form_contact_email: vendor.contact_email,
      form_mobile_phone: vendor.mobile_phone.toString(),
      form_company_address: vendor.company_address,
      form_transaction_details: vendor.transaction_details,
    });
  };
  //#endregion Row Selection Handlers

  //?? Container Move To Top Handler
  //#region Container Move To Top Handler
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  };
  //#endregion Container Move To Top Handler

  return (
    <Container
      ref={containerRef}
      maxWidth="lg"
      className="parent-container"
      sx={{ mt: 2, height: "100%", overflowY: "auto" }}
    >
      {/* Creation Date Section */}
      <Box sx={{ textAlign: "right", mb: 2 }}>
        <Typography variant="body1">
          建立日期: {new Date().toLocaleDateString("zh-TW")}
        </Typography>
      </Box>

      {/* Form Section */}
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <TextField
            value={formValues.form_company_name}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                form_company_name: e.target.value,
              })
            }
            error={formErrors.form_company_name}
            fullWidth
            label="公司名稱"
          />
        </Grid>
        <Grid item xs={2}>
          <Button variant="outlined" fullWidth sx={{ height: "56px" }}>
            查 詢
          </Button>
        </Grid>

        <Grid item xs={3}>
          <TextField
            value={formValues.form_unified_number}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                form_unified_number: e.target.value,
              })
            }
            error={formErrors.form_unified_number}
            fullWidth
            label="統一編號"
          />
        </Grid>
        <Grid item xs={2}>
          <Button variant="outlined" fullWidth sx={{ height: "56px" }}>
            查 詢
          </Button>
        </Grid>

        <Grid item xs={7}>
          <TextField
            value={formValues.form_contact_window}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                form_contact_window: e.target.value,
              })
            }
            error={formErrors.form_contact_window}
            fullWidth
            label="聯絡窗口"
          />
        </Grid>

        <Grid item xs={5}>
          <TextField
            value={formValues.form_contact_phone}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                form_contact_phone: e.target.value,
              })
            }
            error={formErrors.form_contact_phone}
            fullWidth
            label="聯絡電話"
          />
        </Grid>

        <Grid item xs={7}>
          <TextField
            value={formValues.form_fax_number}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                form_fax_number: e.target.value,
              })
            }
            error={formErrors.form_fax_number}
            fullWidth
            label="傳真號碼"
          />
        </Grid>

        <Grid item xs={5}>
          <TextField
            value={formValues.form_contact_email}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                form_contact_email: e.target.value,
              })
            }
            error={formErrors.form_contact_email}
            fullWidth
            label="聯絡MAIL"
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
            value={formValues.form_mobile_phone}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                form_mobile_phone: e.target.value,
              })
            }
            error={formErrors.form_mobile_phone}
            fullWidth
            label="行動電話"
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
          <TextField
            value={formValues.form_company_address}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                form_company_address: e.target.value,
              })
            }
            error={formErrors.form_company_address}
            fullWidth
            label="公司地址"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            value={formValues.form_transaction_details}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                form_transaction_details: e.target.value,
              })
            }
            error={formErrors.form_transaction_details}
            fullWidth
            label="交易內容"
          />
        </Grid>
      </Grid>

      {/* Button Section */}
      <ButtonSection />

      {/* Table Section */}
      <Box sx={{ mt: 5 }}>
        <Typography variant="h6">廠商資料列表</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>公司名稱</TableCell>
                <TableCell>統一編號</TableCell>
                <TableCell>聯絡窗口</TableCell>
                <TableCell>聯絡電話</TableCell>
                <TableCell>傳真號碼</TableCell>
                <TableCell>聯絡MAIL</TableCell>
                <TableCell>行動電話</TableCell>
                <TableCell>公司地址</TableCell>
                <TableCell>交易內容</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vendorData.map((row) => (
                <TableRow
                  key={row.unified_number}
                  hover
                  onClick={() => handleRowClick(row)}
                  sx={{
                    cursor: "pointer",
                    backgroundColor:
                      selectedRow === row.unified_number
                        ? "rgba(33, 150, 243, 0.1)"
                        : "inherit",
                  }}
                >
                  <TableCell>{row.company_name}</TableCell>
                  <TableCell>{row.unified_number}</TableCell>
                  <TableCell>{row.contact_window}</TableCell>
                  <TableCell>{row.contact_phone}</TableCell>
                  <TableCell>{row.fax_number}</TableCell>
                  <TableCell>{row.contact_email}</TableCell>
                  <TableCell>{row.mobile_phone}</TableCell>
                  <TableCell>{row.company_address}</TableCell>
                  <TableCell>{row.transaction_details}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}

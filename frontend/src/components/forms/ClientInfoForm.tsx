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
  ButtonProps,
} from "@mui/material";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

interface Company {
  id?: number | string;
  unified_number: number | string;
  business_assignee: string;
  company_name: string;
  contact_person: string;
  mobile_phone: string;
  department: string;
  contact_phone: string;
  fax_number: string;
  contact_email: string;
  company_address: string;
  delivery_address: string;
  created_at: string;
}

export default function CompanyInfoForm() {
  const [companyData, setCompanyData] = useState<Company[]>([]);

  useEffect(() => {
    fetchCompanyData();
  }, []);

  //?? Form Values
  const [formValues, setFormValues] = useState({
    form_unified_number: "" as number | string,
    form_business_assignee: "",
    form_company_name: "",
    form_contact_person: "",
    form_mobile_phone: "",
    form_department: "",
    form_contact_phone: "",
    form_fax_number: "",
    form_contact_email: "",
    form_company_address: "",
    form_delivery_address: "",
    form_registration: false,
  });

  //?? Form Vaildation
  // Form Errors
  const [formErrors, setFormErrors] = useState({
    form_unified_number: false,
    form_business_assignee: false,
    form_company_name: false,
    form_contact_person: false,
    form_mobile_phone: false,
    form_department: false,
    form_contact_phone: false,
    form_fax_number: false,
    form_contact_email: false,
    form_company_address: false,
    form_delivery_address: false,
  });

  // Clear Form Fields
  const handleClearFields = () => {
    setFormValues({
      form_unified_number: "",
      form_business_assignee: "",
      form_company_name: "",
      form_contact_person: "",
      form_mobile_phone: "",
      form_department: "",
      form_contact_phone: "",
      form_fax_number: "",
      form_contact_email: "",
      form_company_address: "",
      form_delivery_address: "",
      form_registration: false,
    });
    setFormErrors({
      form_unified_number: false,
      form_business_assignee: false,
      form_company_name: false,
      form_contact_person: false,
      form_mobile_phone: false,
      form_department: false,
      form_contact_phone: false,
      form_fax_number: false,
      form_contact_email: false,
      form_company_address: false,
      form_delivery_address: false,
    });
    setSelectedRow("");
  };

  //?? Fetch Company Data
  const fetchCompanyData = async () => {
    axios
      .get("/api/companies", {
        responseType: "json",
      })
      .then((response) => {
        setCompanyData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employee data: ", error);
      });
  };

  // ?? Add Company
  const handleAddCompany = () => {
    const newCompany: Company = {
      unified_number: formValues.form_unified_number,
      business_assignee: formValues.form_business_assignee,
      company_name: formValues.form_company_name,
      contact_person: formValues.form_contact_person,
      mobile_phone: formValues.form_mobile_phone,
      department: formValues.form_department,
      contact_phone: formValues.form_contact_phone,
      fax_number: formValues.form_fax_number,
      contact_email: formValues.form_contact_email,
      company_address: formValues.form_company_address,
      delivery_address: formValues.form_delivery_address,
      //registration: formValues.form_registration,
      created_at: new Date().toISOString().split("T")[0],
    };

    const newFormErrors = {
      form_unified_number: !newCompany.unified_number,
      form_business_assignee: !newCompany.business_assignee,
      form_company_name: !newCompany.company_name,
      form_contact_person: !newCompany.contact_person,
      form_mobile_phone: !newCompany.mobile_phone,
      form_department: !newCompany.department,
      form_contact_phone: !newCompany.contact_phone,
      form_fax_number: !newCompany.fax_number,
      form_contact_email: !newCompany.contact_email,
      form_company_address: !newCompany.company_address,
      form_delivery_address: !newCompany.delivery_address,
    };

    console.log("New Company: ", newCompany);
    console.log("New Form Errors: ", newFormErrors);

    setFormErrors(newFormErrors);

    const isFormValid = !Object.values(newFormErrors).some((error) => error);

    if (!isFormValid) {
      alert("請填寫完整資料");
      return;
    }

    console.log("Adding new company:", newCompany);

    axios
      .post("/api/companies", newCompany)
      .then(() => {
        alert(`成功新增客戶: ${newCompany.company_name}`);
        handleClearFields();
        fetchCompanyData();
      })
      .catch((error) => {
        console.error(
          "Error adding employee:",
          error.response?.data || error.message
        );
        alert(`客戶新增失敗: ${error.response?.data || error.message}`);
      });
  };

  // ?? Update Company
  const handleUpdateCompany = () => {
    if (!selectedRow) {
      alert("請選擇要修改的公司");
      return;
    }

    const updatedCompany: Company = {
      unified_number: formValues.form_unified_number,
      business_assignee: formValues.form_business_assignee,
      company_name: formValues.form_company_name,
      contact_person: formValues.form_contact_person,
      mobile_phone: formValues.form_mobile_phone,
      department: formValues.form_department,
      contact_phone: formValues.form_contact_phone,
      fax_number: formValues.form_fax_number,
      contact_email: formValues.form_contact_email,
      company_address: formValues.form_company_address,
      delivery_address: formValues.form_delivery_address,
      created_at: new Date().toISOString().split("T")[0],
    };

    console.log("Updated Company: ", updatedCompany);

    axios
      .put(`/api/companies/${updatedCompany.unified_number}`, updatedCompany)
      .then(() => {
        alert(`修改客戶成功，公司名稱: ${updatedCompany.company_name}`);
        handleClearFields();
        fetchCompanyData();
      })
      .catch((error) => {
        console.error("Error updating client:", error);
        alert("客戶資料更新失敗！");
      });
  };

  // ?? Delete Company
  const handleDeleteCompany = () => {
    if (!selectedRow) {
      alert("請選擇要刪除的公司");
      return;
    }

    const selectedCompany = companyData.find(
      (company) => company.unified_number === selectedRow
    );

    if (!selectedCompany) {
      alert("找不到要刪除的公司");
      return;
    }

    const isConfirmed = window.confirm(
      `確定要刪除公司: ${selectedCompany.company_name} 嗎?`
    );

    if (!isConfirmed) {
      return;
    }

    axios
      .delete(`/api/companies/${selectedCompany.unified_number}`)
      .then(() => {
        alert(`成功刪除公司: ${selectedCompany.company_name}`);
        setSelectedRow("");
        handleClearFields();
        fetchCompanyData();
      })
      .catch((error) => {
        console.error("Error deleting company:", error);
        alert("刪除公司失敗！");
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
      onClick: handleAddCompany,
    },
    {
      text: "修改",
      variant: "outlined",
      color: "primary",
      onClick: handleUpdateCompany,
      disabled: false,
    },
    {
      text: "刪除",
      variant: "outlined",
      color: "error",
      onClick: handleDeleteCompany,
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
      onClick: fetchCompanyData,
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

  const handleRowClick = (company: Company) => {
    const isRowSelected = selectedRow === company.unified_number;

    if (!isRowSelected) {
      // Select and fill form only if the row isn't already selected
      setSelectedRow(company.unified_number);
      scrollToTop();
      handleRowSelectedData(company);
      alert(
        `選擇公司: ${company.company_name}，請在輸入欄位中更改資料，然後點擊「修改」，以套用更動`
      );
    } else {
      // Deselect row
      setSelectedRow("");
      // Clear form fields on deselect
      handleClearFields();
    }
  };

  const handleRowSelectedData = (company: Company) => {
    setFormValues({
      form_unified_number: company.unified_number,
      form_business_assignee: company.business_assignee,
      form_company_name: company.company_name,
      form_contact_person: company.contact_person,
      form_mobile_phone: company.mobile_phone,
      form_department: company.department,
      form_contact_phone: company.contact_phone,
      form_fax_number: company.fax_number,
      form_contact_email: company.contact_email,
      form_company_address: company.company_address,
      form_delivery_address: company.delivery_address,
      form_registration: false,
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
      maxWidth="lg"
      className="parent-container"
      sx={{ mt: 2, height: "100%", overflowY: "auto" }}
    >
      <Box sx={{ textAlign: "right", mb: 2 }}>
        <Typography variant="body1">
          建立日期: {new Date().toLocaleDateString("zh-TW")}
        </Typography>
      </Box>

      {/* Form Section */}
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <TextField
            fullWidth
            label="統一編號"
            value={formValues.form_unified_number}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                form_unified_number: e.target.value,
              })
            }
            error={formErrors.form_unified_number}
          />
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
              value={formValues.form_business_assignee}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  form_business_assignee: e.target.value,
                })
              }
              error={formErrors.form_business_assignee}
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
          <TextField
            fullWidth
            label="公司名稱"
            value={formValues.form_company_name}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                form_company_name: e.target.value,
              })
            }
            error={formErrors.form_company_name}
          />
        </Grid>
        <Grid item xs={2}>
          <Button variant="outlined" fullWidth sx={{ height: "56px" }}>
            查 詢
          </Button>
        </Grid>

        <Grid item xs={3}>
          <TextField
            fullWidth
            label="聯絡人員"
            value={formValues.form_contact_person}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                form_contact_person: e.target.value,
              })
            }
            error={formErrors.form_contact_person}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            fullWidth
            label="行動電話"
            value={formValues.form_mobile_phone}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                form_mobile_phone: e.target.value,
              })
            }
            error={formErrors.form_mobile_phone}
          />
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>廠區部門</InputLabel>
            <Select
              value={formValues.form_department}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  form_department: e.target.value,
                })
              }
              error={formErrors.form_department}
            >
              <MenuItem value="北區">北區</MenuItem>
              <MenuItem value="南區">南區</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            label="聯絡電話"
            value={formValues.form_contact_phone}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                form_contact_phone: e.target.value,
              })
            }
            error={formErrors.form_contact_phone}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            label="傳真號碼"
            value={formValues.form_fax_number}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                form_fax_number: e.target.value,
              })
            }
            error={formErrors.form_fax_number}
          />
        </Grid>

        <Grid item xs={9}>
          <TextField
            fullWidth
            label="聯絡MAIL"
            value={formValues.form_contact_email}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                form_contact_email: e.target.value,
              })
            }
            error={formErrors.form_contact_email}
          />
        </Grid>

        <Grid item xs={3}>
          <FormControl>
            <Box display="flex" alignItems="center" sx={{ height: "56px" }}>
              <Typography sx={{ mr: 1 }}>註 銷:</Typography>
              <Checkbox value={formValues.form_registration} />
            </Box>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="公司地址"
            value={formValues.form_company_address}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                form_company_address: e.target.value,
              })
            }
            error={formErrors.form_company_address}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="交貨地址"
            value={formValues.form_delivery_address}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                form_delivery_address: e.target.value,
              })
            }
            error={formErrors.form_delivery_address}
          />
        </Grid>
      </Grid>

      {/* Button Section */}
      <ButtonSection />

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
                <TableCell>聯絡人員</TableCell>
                <TableCell>行動電話</TableCell>
                <TableCell>廠區部門</TableCell>
                <TableCell>聯絡電話</TableCell>
                <TableCell>傳真號碼</TableCell>
                <TableCell>聯絡MAIL</TableCell>
                <TableCell>公司地址</TableCell>
                <TableCell>交貨地址</TableCell>
                <TableCell>建立日期</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {companyData.map((row) => (
                <TableRow
                  key={row.id}
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
                  <TableCell>{row.unified_number}</TableCell>
                  <TableCell>{row.business_assignee}</TableCell>
                  <TableCell>{row.company_name}</TableCell>
                  <TableCell>{row.contact_person}</TableCell>
                  <TableCell>{row.mobile_phone}</TableCell>
                  <TableCell>{row.department}</TableCell>
                  <TableCell>{row.contact_phone}</TableCell>
                  <TableCell>{row.fax_number}</TableCell>
                  <TableCell>{row.contact_email}</TableCell>
                  <TableCell>{row.company_address}</TableCell>
                  <TableCell>{row.delivery_address}</TableCell>
                  <TableCell>
                    {row.created_at
                      ? new Date(row.created_at).toLocaleDateString()
                      : ""}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}

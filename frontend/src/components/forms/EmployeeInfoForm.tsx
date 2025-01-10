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

import { useState, useEffect } from "react";
import axios from "axios";

interface Employee {
  employee_id: number | string;
  employee_name: string;
  gender: string;
  birthDate: string | null;
  region: string;
  role: string;
  date_of_hire: string | null;
  date_of_resignation: string | null;
  created_at: string;
  handover_staff?: string;
  updated_at: string;
}

export default function EmployeeInfoForm() {
  const [employeeData, setEmployeeData] = useState<Employee[]>([]);

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  //#region Row Selection
  const [selectedRow, setSelectedRow] = useState<number | string>(""); // For row selection

  // Row Click Hanlder
  const handleRowClick = (employee: Employee) => {
    const isRowSelected = selectedRow === employee.employee_id;

    if (!isRowSelected) {
      // Select and fill form only if the row isn't already selected
      setSelectedRow(employee.employee_id);
      handleRowSelectedData(employee);
    } else {
      // Deselect row
      setSelectedRow("");
      // Clear form fields on deselect
      handleClearFields();
    }
  };

  const [formValues, setFormValues] = useState({
    form_employee_id: "" as number | string,
    form_employee_name: "",
    form_gender: "",
    form_birthDate: null as Date | null,
    form_region: "",
    form_role: "",
    form_date_of_hire: null as Date | null,
    form_date_of_resignation: null as Date | null,
    form_handover_staff: "",
    form_created_at: null as Date | null,
  });

  const handleRowSelectedData = (employee: Employee) => {
    const parsedBirthDate = employee.birthDate
      ? new Date(employee.birthDate)
      : null;
    const parsedStartDate = employee.date_of_hire
      ? new Date(employee.date_of_hire)
      : null;
    const parsedCreatedDate = employee.created_at
      ? new Date(employee.created_at)
      : null;

    setFormValues({
      form_employee_id: employee.employee_id,
      form_employee_name: employee.employee_name,
      form_gender: employee.gender,
      form_birthDate: parsedBirthDate,
      form_region: employee.region,
      form_role: employee.role,
      form_date_of_hire: parsedStartDate,
      form_date_of_resignation: employee.date_of_resignation
        ? new Date(employee.date_of_resignation)
        : null,
      form_created_at: parsedCreatedDate,
      form_handover_staff: employee.handover_staff || "",
    });
  };
  //#endregion

  const fetchEmployeeData = async () => {
    axios
      .get("/api/employees", {
        responseType: "json",
      })
      .then((response) => {
        setEmployeeData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employee data: ", error);
      });
  };

  // Clear Form Fields
  const handleClearFields = () => {
    setFormValues({
      form_employee_id: "",
      form_employee_name: "",
      form_gender: "",
      form_birthDate: null,
      form_region: "",
      form_role: "",
      form_date_of_hire: null,
      form_date_of_resignation: null,
      form_created_at: null,
      form_handover_staff: "",
    });
  };

  // DELETE Employee
  const handleDeleteEmployee = () => {
    if (selectedRow === null) {
      alert("請選擇要刪除的員工");
      return;
    }

    axios
      .delete(`/api/employees/${selectedRow}`)
      .then(() => {
        alert("已刪除員工");
        setSelectedRow("");
        handleClearFields();
        fetchEmployeeData();
      })
      .catch((error) => {
        console.error("Error deleting employee:", error);
        alert("刪除失敗");
      });
  };

  const [formErrors, setFormErrors] = useState({
    employee_id: false,
    employee_name: false,
    gender: false,
    birthDate: false,
    region: false,
    role: false,
    date_of_hire: false,
  });

  // Handle Add Employee
  const handleAddEmployee = () => {
    const newEmployee: Employee = {
      employee_id: formValues.form_employee_id,
      employee_name: formValues.form_employee_name,
      gender: formValues.form_gender,
      birthDate: formValues.form_birthDate
        ? formValues.form_birthDate.toISOString().split("T")[0]
        : null,
      region: formValues.form_region,
      role: formValues.form_role,
      date_of_hire: formValues.form_date_of_hire
        ? formValues.form_date_of_hire.toISOString().split("T")[0]
        : null,
      date_of_resignation: formValues.form_date_of_resignation
        ? formValues.form_date_of_resignation.toISOString().split("T")[0]
        : null,
      handover_staff: formValues.form_handover_staff || undefined,
      created_at: new Date().toISOString().split("T")[0],
      updated_at: new Date().toISOString().split("T")[0],
    };

    // Validate, only check the MUST required fields
    const newFormErrors = {
      employee_id: !newEmployee.employee_id,
      employee_name: !newEmployee.employee_name,
      gender: !newEmployee.gender,
      birthDate: !newEmployee.birthDate,
      region: !newEmployee.region,
      role: !newEmployee.role,
      date_of_hire: !newEmployee.date_of_hire,
    };

    console.log("newFormErrors:", newFormErrors);
    console.log("newEmployee:", newEmployee);

    setFormErrors(newFormErrors);

    const isFormValid = !Object.values(newFormErrors).some((error) => error);

    if (!isFormValid) {
      alert("請完整填寫資料");
      return;
    }

    console.log("Adding employee:", newEmployee);

    axios
      .post("/api/employees", newEmployee)
      .then(() => {
        alert(`成功新增員工: ${newEmployee.employee_name}`);
        handleClearFields();
        fetchEmployeeData();
      })
      .catch((error) => {
        console.error(
          "Error adding employee:",
          error.response?.data || error.message
        );
        alert(`員工新增失敗: ${error.response?.data || error.message}`);
      });
  };

  const handleUpdateEmployee = () => {
    if (!selectedRow) {
      alert("請選擇要修改的員工");
      return;
    }
    const updatedEmployee = {
      name: formValues.form_employee_name,
      gender: formValues.form_gender,
      birthDate: formValues.form_birthDate,
      region: formValues.form_region,
      role: formValues.form_role,
      startDate: formValues.form_date_of_hire,
      endDate: formValues.form_date_of_resignation,
      createdData: formValues.form_created_at,
      transferPerson: formValues.form_handover_staff,
    };

    axios
      .put(`/api/employees/${selectedRow}`, updatedEmployee)
      .then(() => {
        alert("員工更新成功");
        handleClearFields();
        fetchEmployeeData();
      })
      .catch((error) => {
        console.error("Error updating employee:", error);
        alert("更新失敗");
      });
  };

  // Define Type for Button Config
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
      onClick: handleAddEmployee,
    },
    {
      text: "修改",
      variant: "outlined",
      color: "primary",
      onClick: handleUpdateEmployee, // Enable update
      disabled: false,
    },
    {
      text: "刪除",
      variant: "outlined",
      color: "error",
      onClick: handleDeleteEmployee,
      disabled: false,
    },
    {
      text: "清除資料",
      variant: "outlined",
      color: "primary",
      onClick: handleClearFields,
    },
    {
      text: "取消",
      variant: "outlined",
      color: "primary",
      onClick: handleClearFields,
    },
    {
      text: "取得資料",
      variant: "outlined",
      color: "primary",
      onClick: fetchEmployeeData,
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

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
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
            label="員工編號"
            placeholder="EX: A001"
            value={formValues.form_employee_id}
            onChange={(e) =>
              setFormValues({ ...formValues, form_employee_id: e.target.value })
            }
            error={formErrors.employee_id}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            label="員工姓名"
            value={formValues.form_employee_name}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                form_employee_name: e.target.value,
              })
            }
            error={formErrors.employee_name}
          />
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel shrink={!!formValues.form_gender}>性別</InputLabel>
            <Select
              value={formValues.form_gender}
              onChange={(e) => {
                setFormValues({ ...formValues, form_gender: e.target.value });
              }}
              error={formErrors.gender}
            >
              <MenuItem value="男">男</MenuItem>
              <MenuItem value="女">女</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            type="date"
            label="出生年月日"
            value={formValues.form_birthDate?.toISOString().split("T")[0]}
            onChange={(e) => {
              const dateString = e.target.value;
              const formattedDate = dateString ? new Date(dateString) : null;

              setFormValues({
                ...formValues,
                form_birthDate: formattedDate,
              });
            }}
            InputLabelProps={{
              shrink: true,
            }}
            error={formErrors.birthDate}
          />
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel shrink={!!formValues.form_role}>職稱</InputLabel>
            <Select
              value={formValues.form_role}
              onChange={(e) => {
                setFormValues({ ...formValues, form_role: e.target.value });
              }}
              displayEmpty
              error={formErrors.role}
            >
              <MenuItem value=""> </MenuItem>
              <MenuItem value="總經理">總經理</MenuItem>
              <MenuItem value="廠長">廠長</MenuItem>
              <MenuItem value="業務經理">業務經理</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel shrink={!!formValues.form_region}>所屬區域</InputLabel>
            <Select
              value={formValues.form_region}
              onChange={(e) => {
                setFormValues({ ...formValues, form_region: e.target.value });
              }}
              error={formErrors.region}
            >
              <MenuItem value="全區">全區</MenuItem>
              <MenuItem value="中區">中區</MenuItem>
              <MenuItem value="南區">南區</MenuItem>
              <MenuItem value="北區">北區</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            type="date"
            label="入職日期"
            value={formValues.form_date_of_hire?.toISOString().split("T")[0]}
            onChange={(e) => {
              const dateString = e.target.value;
              const formattedDate = dateString ? new Date(dateString) : null;

              setFormValues({
                ...formValues,
                form_date_of_hire: formattedDate,
              });
            }}
            InputLabelProps={{
              shrink: true,
            }}
            error={formErrors.date_of_hire}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            type="date"
            label="離職日期"
            value={
              formValues.form_date_of_resignation?.toISOString().split("T")[0]
            }
            onChange={(e) => {
              const dateString = e.target.value;
              const formattedDate = dateString ? new Date(dateString) : null;

              setFormValues({
                ...formValues,
                form_date_of_resignation: formattedDate,
              });
            }}
            InputLabelProps={{
              shrink: true,
            }}
            helperText="非必填"
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            label="交接人員"
            value={formValues.form_handover_staff}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                form_handover_staff: e.target.value,
              })
            }
            helperText="非必填"
          />
        </Grid>

        <Grid item xs={6}>
          <FormControl>
            <Typography>註 銷</Typography>
            <Checkbox />
          </FormControl>
        </Grid>
      </Grid>

      {/* Button Section */}
      <ButtonSection />

      {/* Table Section */}
      <Box sx={{ mt: 5 }}>
        <Typography variant="h6">員工資料列表</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>員工編號</TableCell>
                <TableCell>員工姓名</TableCell>
                <TableCell>性別</TableCell>
                <TableCell>出生年月日</TableCell>
                <TableCell>所屬區域</TableCell>
                <TableCell>職稱</TableCell>
                <TableCell>入職日期</TableCell>
                <TableCell>建立日期</TableCell>
                <TableCell>離職日期</TableCell>
                <TableCell>交接人員</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employeeData.map((row) => (
                <TableRow
                  key={row.employee_id}
                  hover
                  onClick={() => handleRowClick(row)}
                  sx={{
                    cursor: "pointer",
                    backgroundColor:
                      selectedRow === row.employee_id
                        ? "rgba(33, 150, 243, 0.1)"
                        : "inherit",
                  }}
                >
                  <TableCell>{row.employee_id}</TableCell>
                  <TableCell>{row.employee_name}</TableCell>
                  <TableCell>{row.gender}</TableCell>
                  <TableCell>
                    {row.birthDate
                      ? new Date(row.birthDate).toLocaleDateString()
                      : ""}
                  </TableCell>
                  <TableCell>{row.region}</TableCell>
                  <TableCell>{row.role}</TableCell>
                  <TableCell>
                    {row.date_of_hire
                      ? new Date(row.date_of_hire).toLocaleDateString()
                      : ""}
                  </TableCell>
                  <TableCell>
                    {row.created_at
                      ? new Date(row.created_at).toLocaleDateString()
                      : ""}
                  </TableCell>
                  <TableCell>
                    {row.date_of_resignation
                      ? new Date(row.date_of_resignation).toLocaleDateString()
                      : "未離職"}
                  </TableCell>
                  <TableCell>
                    {row.handover_staff ? row.handover_staff : "未離職"}
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

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
  employee_id: number;
  employee_name: string;
  gender: string;
  birthDate: string;
  region: string;
  role: string;
  date_of_hire: Date | string;
  date_of_resignation?: string;
  created_at: Date | string;
  handover_staff?: string;
}

export default function EmployeeInfoForm() {
  const [employeeData, setEmployeeData] = useState<Employee[]>([]);

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  //#region Row Selection
  const [selectedRow, setSelectedRow] = useState<number | null>(null); // For row selection

  // Row Click Hanlder
  const handleRowClick = (employee: Employee) => {
    const isRowSelected = selectedRow === employee.employee_id;

    if (!isRowSelected) {
      // Select and fill form only if the row isn't already selected
      setSelectedRow(employee.employee_id);
      handleRowSelectedData(employee);
    } else {
      // Deselect row
      setSelectedRow(null);
      // Optionally clear form fields on deselect
      setFormValues({
        employeeId: "",
        employeeName: "",
        gender: "",
        birthDate: "",
        region: "",
        role: "",
        startDate: "",
        endDate: "",
        createdData: "",
        transferPerson: "",
      });
    }
  };

  const handleRowSelectedData = (employee: Employee) => {
    const parsedStartDate = employee.date_of_hire
      ? new Date(employee.date_of_hire)
      : null;
    const parsedCreatedDate = employee.created_at
      ? new Date(employee.created_at)
      : null;

    setFormValues({
      employeeId: employee.employee_id.toString(),
      employeeName: employee.employee_name,
      gender: employee.gender,
      birthDate: employee.birthDate,
      region: employee.region,
      role: employee.role,
      startDate: parsedStartDate
        ? parsedStartDate.toISOString().split("T")[0]
        : "",
      endDate: employee.date_of_resignation || "",
      createdData: parsedCreatedDate
        ? parsedCreatedDate.toISOString().split("T")[0]
        : "",
      transferPerson: employee.handover_staff || "",
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

  const [formValues, setFormValues] = useState({
    employeeId: "",
    employeeName: "",
    gender: "",
    birthDate: "",
    region: "",
    role: "",
    startDate: "",
    endDate: "",
    createdData: "",
    transferPerson: "",
  });

  const handleClearFields = () => {
    setFormValues({
      employeeId: "",
      employeeName: "",
      gender: "",
      birthDate: "",
      region: "",
      role: "",
      startDate: "",
      endDate: "",
      createdData: "",
      transferPerson: "",
    });
  };

  const handleDeleteEmployee = () => {
    if (selectedRow === null) {
      alert("請選擇要刪除的員工");
      return;
    }

    axios
      .delete(`/api/employees/${selectedRow}`)
      .then(() => {
        alert("已刪除員工");
        setSelectedRow(null);
        handleClearFields();
        fetchEmployeeData();
      })
      .catch((error) => {
        console.error("Error deleting employee:", error);
        alert("刪除失敗");
      });
  };

  const formatDate = (date: Date | string): string => {
    if (!date) return "";
    const d = new Date(date);
    return d.toISOString().split("T")[0];
  };

  // Handle Add Employee
  const handleAddEmployee = () => {
    const nextId = employeeData.length + 1;
    const newEmployeeId = formValues.employeeId || `0${nextId}`;

    const newEmployee: Employee = {
      employee_id: parseInt(newEmployeeId),
      employee_name: formValues.employeeName,
      gender: formValues.gender,
      birthDate: formatDate(formValues.birthDate),
      region: formValues.region,
      role: formValues.role,
      date_of_hire: formatDate(formValues.startDate || new Date()),
      date_of_resignation: formValues.endDate
        ? formatDate(formValues.endDate)
        : "",
      created_at: formatDate(new Date()),
      handover_staff: formValues.transferPerson || "",
    };

    // Validate
    const isFormValid = Object.values({
      id: newEmployee.employee_id,
      name: newEmployee.employee_name,
      gender: newEmployee.gender,
      birthDate: newEmployee.birthDate,
      region: newEmployee.region,
      role: newEmployee.role,
      startDate: newEmployee.date_of_hire,
      createdData: newEmployee.created_at,
    }).every((value) => value);
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

  const handleEdit = () => {
    console.log("Edit employee");
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
      onClick: handleEdit,
      disabled: true,
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
            value={formValues.employeeId}
            onChange={(e) =>
              setFormValues({ ...formValues, employeeId: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="員工姓名"
            value={formValues.employeeName}
            onChange={(e) =>
              setFormValues({ ...formValues, employeeName: e.target.value })
            }
          />
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel shrink={!!formValues.gender}>性別</InputLabel>
            <Select
              value={formValues.gender}
              onChange={(e) => {
                setFormValues({ ...formValues, gender: e.target.value });
              }}
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
            value={formValues.birthDate}
            onChange={(e) =>
              setFormValues({ ...formValues, birthDate: e.target.value })
            }
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel shrink={!!formValues.role}>職稱</InputLabel>
            <Select
              value={formValues.role}
              onChange={(e) => {
                setFormValues({ ...formValues, role: e.target.value });
              }}
              displayEmpty
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
            <InputLabel shrink={!!formValues.region}>所屬區域</InputLabel>
            <Select
              value={formValues.region}
              onChange={(e) => {
                setFormValues({ ...formValues, region: e.target.value });
              }}
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
            value={formValues.startDate}
            onChange={(e) =>
              setFormValues({ ...formValues, startDate: e.target.value })
            }
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            type="date"
            label="離職日期"
            value={formValues.endDate}
            onChange={(e) =>
              setFormValues({ ...formValues, endDate: e.target.value })
            }
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            label="交接人員"
            value={formValues.transferPerson}
            onChange={(e) =>
              setFormValues({ ...formValues, transferPerson: e.target.value })
            }
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}

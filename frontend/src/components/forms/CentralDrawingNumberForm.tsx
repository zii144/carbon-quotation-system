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
  ButtonProps,
} from "@mui/material";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

interface DrawingNumber {
  id?: number;
  business_assignee: string;
  drawing_type: string;
  drawing_number: string;
  customer_name: string;
  material: string;
  dimensions: number;
  customer_number: string;
  customer_part_number: string;
  drawing_assignee: string;
  created_at?: string;
}

export default function CentralDrawingNumberForm() {
  const [drawingNumberData, setDrawingNumberData] = useState<DrawingNumber[]>(
    []
  );

  useEffect(() => {
    fetchDrawingNumbersData();
  }, []);

  //?? Form Values
  const [formValues, setFormValues] = useState({
    form_business_assignee: "",
    form_drawing_type: "",
    form_drawing_number: "",
    form_customer_name: "",
    form_material: "",
    form_dimensions: "",
    form_customer_number: "",
    form_customer_part_number: "",
    form_drawing_assignee: "",
  });

  //?? Form Vaildation
  // Form Errors
  const [formErrors, setFormErrors] = useState({
    form_business_assignee: false,
    form_drawing_type: false,
    form_drawing_number: false,
    form_customer_name: false,
    form_material: false,
    form_dimensions: false,
    form_customer_number: false,
    form_customer_part_number: false,
    form_drawing_assignee: false,
  });

  // Clear Form Fields
  const handleClearFields = () => {
    setFormValues({
      form_business_assignee: "",
      form_drawing_type: "",
      form_drawing_number: "",
      form_customer_name: "",
      form_material: "",
      form_dimensions: "",
      form_customer_number: "",
      form_customer_part_number: "",
      form_drawing_assignee: "",
    });
    setFormErrors({
      form_business_assignee: false,
      form_drawing_type: false,
      form_drawing_number: false,
      form_customer_name: false,
      form_material: false,
      form_dimensions: false,
      form_customer_number: false,
      form_customer_part_number: false,
      form_drawing_assignee: false,
    });
    setSelectedRow(undefined);
  };

  //?? Fetch DrawingNumber Data
  const fetchDrawingNumbersData = async () => {
    axios
      .get("/api/drawing-numbers", {
        responseType: "json",
      })
      .then((response) => {
        setDrawingNumberData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching drawing number data: ", error);
      });
  };

  // ?? Add DrawingNumber
  const handleAddDrawingNumber = () => {
    const newDrawingNumber: DrawingNumber = {
      business_assignee: formValues.form_business_assignee,
      drawing_type: formValues.form_drawing_type,
      drawing_number: formValues.form_drawing_number,
      customer_name: formValues.form_customer_name,
      material: formValues.form_material,
      dimensions: parseInt(formValues.form_dimensions),
      customer_number: formValues.form_customer_number,
      customer_part_number: formValues.form_customer_part_number,
      drawing_assignee: formValues.form_drawing_assignee,
      created_at: new Date().toISOString().split("T")[0],
    };

    const newFormErrors = {
      form_business_assignee: !newDrawingNumber.business_assignee,
      form_drawing_type: !newDrawingNumber.drawing_type,
      form_drawing_number: !newDrawingNumber.drawing_number,
      form_customer_name: !newDrawingNumber.customer_name,
      form_material: !newDrawingNumber.material,
      form_dimensions: !newDrawingNumber.dimensions,
      form_customer_number: !newDrawingNumber.customer_number,
      form_customer_part_number: !newDrawingNumber.customer_part_number,
      form_drawing_assignee: !newDrawingNumber.drawing_assignee,
    };

    console.log("New Drwaing Number: ", newDrawingNumber);
    console.log("New Form Errors: ", newFormErrors);

    setFormErrors(newFormErrors);

    const isFormValid = !Object.values(newFormErrors).some((error) => error);

    if (!isFormValid) {
      alert("請填寫完整資料");
      return;
    }

    console.log("Adding new Drwaing Number:", newDrawingNumber);

    axios
      .post("/api/drawing-numbers", newDrawingNumber)
      .then(() => {
        alert(
          `成功新增中央圖號，客戶名稱為: ${newDrawingNumber.customer_name}`
        );
        handleClearFields();
        fetchDrawingNumbersData();
      })
      .catch((error) => {
        console.error(
          "Error adding drawing numberrow:",
          error.response?.data || error.message
        );
        alert(`中央圖號新增失敗: ${error.response?.data || error.message}`);
      });
  };

  // ?? Update Drawing Number
  const handleUpdateDrawingNumber = () => {
    if (!selectedRow) {
      alert("請選擇要修改的中央圖號資料");
      return;
    }

    const updatedDrawingNumber: DrawingNumber = {
      id: selectedRow as number,
      business_assignee: formValues.form_business_assignee,
      drawing_type: formValues.form_drawing_type,
      drawing_number: formValues.form_drawing_number,
      customer_name: formValues.form_customer_name,
      material: formValues.form_material,
      dimensions: parseInt(formValues.form_dimensions),
      customer_number: formValues.form_customer_number,
      customer_part_number: formValues.form_customer_part_number,
      drawing_assignee: formValues.form_drawing_assignee,
    };

    console.log("Updated Drawing Number: ", updatedDrawingNumber);

    axios
      .put(
        `/api/drawing-numbers/${updatedDrawingNumber.id}`,
        updatedDrawingNumber
      )
      .then(() => {
        alert(
          `修改中央圖號資料成功，客戶名稱: ${updatedDrawingNumber.customer_name}`
        );
        handleClearFields();
        fetchDrawingNumbersData();
      })
      .catch((error) => {
        console.error("Error updating drawing number:", error);
        alert("中央圖號資料更新失敗！");
      });
  };

  // ?? Delete Drawing Number
  const handleDeleteDrawingNumber = () => {
    if (!selectedRow) {
      alert("請選擇要刪除的中央圖號資料");
      return;
    }

    const selectedDrwaingNumber = drawingNumberData.find(
      (drawingNumber) => drawingNumber.id === selectedRow
    );

    if (!selectedDrwaingNumber) {
      alert("找不到要刪除的中央圖號資料");
      return;
    }

    const isConfirmed = window.confirm(
      `確定要刪除中央圖號公司: ${selectedDrwaingNumber.customer_name} 嗎?`
    );

    if (!isConfirmed) {
      return;
    }

    axios
      .delete(`/api/drawing-numbers/${selectedDrwaingNumber.id}`)
      .then(() => {
        alert(`成功刪除中央圖號公司:: ${selectedDrwaingNumber.customer_name}`);
        setSelectedRow(undefined);
        handleClearFields();
        fetchDrawingNumbersData();
      })
      .catch((error) => {
        console.error("Error deleting drawing number:", error);
        alert("刪除中央圖號資料失敗！");
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
      onClick: handleAddDrawingNumber,
    },
    {
      text: "修改",
      variant: "outlined",
      color: "primary",
      onClick: handleUpdateDrawingNumber,
      disabled: false,
    },
    {
      text: "刪除",
      variant: "outlined",
      color: "error",
      onClick: handleDeleteDrawingNumber,
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
      onClick: fetchDrawingNumbersData,
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
  const [selectedRow, setSelectedRow] = useState<number>(); // For row selection

  const handleRowClick = (drawingNumber: DrawingNumber) => {
    const isRowSelected = selectedRow === drawingNumber.id;

    if (!isRowSelected) {
      // Select and fill form only if the row isn't already selected
      setSelectedRow(drawingNumber.id);
      scrollToTop();
      handleRowSelectedData(drawingNumber);
      alert(
        `選擇客戶: ${drawingNumber.customer_name}，請在輸入欄位中更改資料，然後點擊「修改」，以套用更動`
      );
    } else {
      // Deselect row
      setSelectedRow(undefined);
      // Clear form fields on deselect
      handleClearFields();
    }
  };

  const handleRowSelectedData = (drawingNumber: DrawingNumber) => {
    setFormValues({
      form_business_assignee: drawingNumber.business_assignee,
      form_drawing_type: drawingNumber.drawing_type,
      form_drawing_number: drawingNumber.drawing_number,
      form_customer_name: drawingNumber.customer_name,
      form_material: drawingNumber.material,
      form_dimensions: drawingNumber.dimensions.toString(),
      form_customer_number: drawingNumber.customer_number,
      form_customer_part_number: drawingNumber.customer_part_number,
      form_drawing_assignee: drawingNumber.drawing_assignee,
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
        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputLabel>業務擔當</InputLabel>
            <Select
              value={formValues.form_business_assignee}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  form_business_assignee: e.target.value as string,
                })
              }
              error={formErrors.form_business_assignee}
            >
              <MenuItem value="擔當人員A">擔當人員A</MenuItem>
              <MenuItem value="擔當人員B">擔當人員B</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputLabel>圖號-類別</InputLabel>
            <Select
              value={formValues.form_drawing_type}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  form_drawing_type: e.target.value as string,
                })
              }
              error={formErrors.form_drawing_type}
            >
              <MenuItem value="圖號類別A">圖號類別A</MenuItem>
              <MenuItem value="圖號類別B">圖號類別B</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={3}>
          <TextField
            fullWidth
            label="圖號-號碼"
            value={formValues.form_drawing_number}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                form_drawing_number: e.target.value as string,
              })
            }
            error={formErrors.form_drawing_number}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            label="客戶名稱"
            value={formValues.form_customer_name}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                form_customer_name: e.target.value as string,
              })
            }
            error={formErrors.form_customer_name}
          />
        </Grid>

        <Grid item xs={3}>
          <TextField
            fullWidth
            label="材質"
            value={formValues.form_material}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                form_material: e.target.value as string,
              })
            }
            error={formErrors.form_material}
          />
        </Grid>

        <Grid item xs={1.5}>
          <TextField
            fullWidth
            label="尺寸"
            value={formValues.form_dimensions}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                form_dimensions: e.target.value as string,
              })
            }
            error={formErrors.form_dimensions}
          />
        </Grid>

        <Grid item xs={1.5}>
          <Box
            display="flex"
            alignItems="center"
            gap={2}
            sx={{ height: "56px" }}
          >
            <Button variant="outlined" sx={{ height: "100%" }}>
              Φ
            </Button>
          </Box>
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            label="客戶圖號"
            value={formValues.form_customer_number}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                form_customer_number: e.target.value as string,
              })
            }
            error={formErrors.form_customer_number}
          />
        </Grid>

        <Grid item xs={3}>
          <TextField
            fullWidth
            label="客戶料號"
            value={formValues.form_customer_part_number}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                form_customer_part_number: e.target.value as string,
              })
            }
            error={formErrors.form_customer_part_number}
          />
        </Grid>

        <Grid item xs={3}>
          <TextField
            fullWidth
            label="製圖擔當"
            value={formValues.form_drawing_assignee}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                form_drawing_assignee: e.target.value as string,
              })
            }
            error={formErrors.form_drawing_assignee}
          />
        </Grid>
      </Grid>

      {/* Button Section */}
      <ButtonSection />

      {/* Table Section */}
      <Box sx={{ mt: 5 }}>
        <Typography variant="h6">圖號資料列表</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>索引值</TableCell>
                <TableCell>業務擔當</TableCell>
                <TableCell>圖號-類別</TableCell>
                <TableCell>圖號-號碼</TableCell>
                <TableCell>客戶名稱</TableCell>
                <TableCell>材質</TableCell>
                <TableCell>尺寸</TableCell>
                <TableCell>客戶圖號</TableCell>
                <TableCell>客戶料號</TableCell>
                <TableCell>製圖擔當</TableCell>
                <TableCell>建立日期</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {drawingNumberData.map((row) => (
                <TableRow
                  key={row.id}
                  hover
                  onClick={() => handleRowClick(row)}
                  sx={{
                    cursor: "pointer",
                    backgroundColor:
                      selectedRow === row.id
                        ? "rgba(33, 150, 243, 0.1)"
                        : "inherit",
                  }}
                >
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.business_assignee}</TableCell>
                  <TableCell>{row.drawing_type}</TableCell>
                  <TableCell>{row.drawing_number}</TableCell>
                  <TableCell>{row.customer_name}</TableCell>
                  <TableCell>{row.material}</TableCell>
                  <TableCell>{row.dimensions}</TableCell>
                  <TableCell>{row.customer_number}</TableCell>
                  <TableCell>{row.customer_part_number}</TableCell>
                  <TableCell>{row.drawing_assignee}</TableCell>
                  <TableCell>{row.created_at}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}

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

interface Material {
  id?: number;
  material_name: string;
  material_cost: number;
  unit_name: string;
}

export default function MaintenanceMaterialInfoForm() {
  const [materailData, setMaterialData] = useState<Material[]>([]);

  useEffect(() => {
    fetchMaterialData();
  }, []);

  //?? Form Values
  const [formValues, setFormValues] = useState({
    form_material_name: "" as string,
    form_material_cost: 0 as number,
    form_unit_name: "" as string,
  });

  //?? Form Vaildation
  // Form Errors
  const [formErrors, setFormErrors] = useState({
    form_material_name: false,
    form_material_cost: false,
    form_unit_name: false,
  });

  // Clear Form Fields
  const handleClearFields = () => {
    setFormValues({
      form_material_name: "",
      form_material_cost: 0,
      form_unit_name: "",
    });
    setFormErrors({
      form_material_name: false,
      form_material_cost: false,
      form_unit_name: false,
    });
    setSelectedRow(undefined);
  };

  //?? Fetch Material Data
  const fetchMaterialData = async () => {
    axios
      .get("/api/materials", {
        responseType: "json",
      })
      .then((response) => {
        setMaterialData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employee data: ", error);
      });
  };

  // ?? Add Material
  const handleAddMaterial = () => {
    const newMaterial: Material = {
      material_name: formValues.form_material_name,
      material_cost: formValues.form_material_cost,
      unit_name: formValues.form_unit_name,
    };

    const newFormErrors = {
      form_material_name: !newMaterial.material_name,
      form_material_cost: newMaterial.material_cost === 0,
      form_unit_name: !newMaterial.unit_name,
    };

    console.log("New Material: ", newMaterial);
    console.log("New Form Errors: ", newFormErrors);

    setFormErrors(newFormErrors);

    const isFormValid = !Object.values(newFormErrors).some((error) => error);

    if (!isFormValid) {
      alert("請填寫完整資料");
      return;
    }

    console.log("Adding new material:", newMaterial);

    axios
      .post("/api/materials", newMaterial)
      .then(() => {
        alert(`成功新增材質: ${newMaterial.material_name}`);
        handleClearFields();
        fetchMaterialData();
      })
      .catch((error) => {
        console.error(
          "Error adding material:",
          error.response?.data || error.message
        );
        alert(`材質新增失敗: ${error.response?.data || error.message}`);
      });
  };

  // ?? Update Material
  const handleUpdateMaterial = () => {
    if (!selectedRow) {
      alert("請選擇要修改的材質");
      return;
    }

    const updatedMaterial: Material = {
      id: selectedRow,
      material_name: formValues.form_material_name,
      material_cost: formValues.form_material_cost,
      unit_name: formValues.form_unit_name,
    };

    console.log("Updated Material: ", updatedMaterial);

    axios
      .put(`/api/materials/${updatedMaterial.id}`, updatedMaterial)
      .then(() => {
        alert(`修改材質成功，材質名稱: ${updatedMaterial.material_name}`);
        handleClearFields();
        fetchMaterialData();
      })
      .catch((error) => {
        console.error("Error updating client:", error);
        alert("材質資料更新失敗！");
      });
  };

  // ?? Delete Material
  const handleDeleteMaterail = () => {
    if (!selectedRow) {
      alert("請選擇要刪除的材質");
      return;
    }

    const selectedMaterial = materailData.find(
      (materail) => materail.id === selectedRow
    );

    if (!selectedMaterial) {
      alert("找不到要刪除的材質");
      return;
    }

    const isConfirmed = window.confirm(
      `確定要刪除材質: ${selectedMaterial.material_name} 嗎?`
    );

    if (!isConfirmed) {
      return;
    }

    axios
      .delete(`/api/materials/${selectedMaterial.id}`)
      .then(() => {
        alert(`成功刪除材質:: ${selectedMaterial.material_name}`);
        setSelectedRow(undefined);
        handleClearFields();
        fetchMaterialData();
      })
      .catch((error) => {
        console.error("Error deleting material:", error);
        alert("刪除材質失敗！");
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
      onClick: handleAddMaterial,
    },
    {
      text: "修改",
      variant: "outlined",
      color: "primary",
      onClick: handleUpdateMaterial,
      disabled: false,
    },
    {
      text: "刪除",
      variant: "outlined",
      color: "error",
      onClick: handleDeleteMaterail,
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
      onClick: fetchMaterialData,
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

  const handleRowClick = (material: Material) => {
    const isRowSelected = selectedRow === material.id;

    if (!isRowSelected) {
      // Select and fill form only if the row isn't already selected
      setSelectedRow(material.id);
      scrollToTop();
      handleRowSelectedData(material);
      alert(
        `選擇材質: ${material.material_name}，請在輸入欄位中更改資料，然後點擊「修改」，以套用更動`
      );
    } else {
      // Deselect row
      setSelectedRow(undefined);
      // Clear form fields on deselect
      handleClearFields();
    }
  };

  const handleRowSelectedData = (material: Material) => {
    setFormValues({
      form_material_name: material.material_name,
      form_material_cost: material.material_cost,
      form_unit_name: material.unit_name,
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
      sx={{ mt: 5, height: "100%", overflowY: "auto" }}
    >
      {/* Form Section */}
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <TextField
            value={formValues.form_material_name}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                form_material_name: e.target.value,
              })
            }
            error={formErrors.form_material_name}
            label="材質名稱"
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <Box
            display="flex"
            alignItems="center"
            gap={2}
            sx={{ height: "56px" }}
          >
            <Button variant="outlined" sx={{ height: "100%" }} fullWidth>
              Φ
            </Button>
            <Button variant="outlined" sx={{ height: "100%" }} fullWidth>
              KII
            </Button>
          </Box>
        </Grid>

        <Grid item xs={9}>
          <TextField
            value={formValues.form_material_cost}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                form_material_cost: parseInt(e.target.value),
              })
            }
            error={formErrors.form_material_cost}
            label="素材成本"
            type="number"
            fullWidth
          />
        </Grid>

        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputLabel>單位名稱</InputLabel>
            <Select
              value={formValues.form_unit_name}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  form_unit_name: e.target.value,
                })
              }
              error={formErrors.form_unit_name}
            >
              <MenuItem value="CC">CC</MenuItem>
              <MenuItem value="KG">KG</MenuItem>
              <MenuItem value="M">M</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Button Section */}
      <ButtonSection />

      {/* Table Section */}
      <Box sx={{ mt: 5 }}>
        <Typography variant="h6">材質資料列表</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>索引值</TableCell>
                <TableCell>材質</TableCell>
                <TableCell>素材成本</TableCell>
                <TableCell>單位名稱</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {materailData.map((row) => (
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
                  <TableCell>{row.material_name}</TableCell>
                  <TableCell>{row.material_cost}</TableCell>
                  <TableCell>{row.unit_name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}

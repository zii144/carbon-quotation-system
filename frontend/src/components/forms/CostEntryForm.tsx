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
  ButtonProps,
} from "@mui/material";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

interface CostEntry {
  // -- -- 基本資料
  inquiry_number?: number;
  production_type: string;
  material: string;
  product_dimensions: number;
  exchange_rate: number;
  tariff: number;
  shipping_cost: number;
  material_cost: number;
  blade_cost: number;
  blade_cost_notes: string;
  mold_cost: number;
  mold_cost_notes: string;
  other_cost: number;
  other_cost_notes: string;
  total_cost: number;
  total_processing_time: number;
  processing_cost: number;
  outsourcing_company: string;
  outsourcing_cost: number;
  processing_and_outsourcing_total: number;
  total_final_cost: number;
  content_notes: string;

  // -- -- 簽核 as BOOLEAN columns
  factory_signature: boolean;
  factory_deputy_signature: boolean;
  manager_signature: boolean;
  manager_approval_signature: boolean;

  // -- -- 加工內容
  lathe: boolean;
  milling_machine: boolean;
  cnc: boolean;
  manual: boolean;
  saw: boolean;
  backup_field1: boolean;
  backup_field2: boolean;
  backup_field3: boolean;

  // -- -- 日期
  created_at?: string;
  updated_at?: string;
}

type FormValues = {
  form_exchange_rate?: number;
  form_tariff?: number;
  form_shipping_cost?: number;
  form_material_cost?: number;
  form_blade_cost?: number;
  form_mold_cost?: number;
  form_other_cost?: number;
  form_total_cost?: number;
  form_processing_cost?: number;
  form_outsourcing_cost?: number;
  form_processing_and_outsourcing_total?: number;
  form_total_final_cost?: number;
  // Other fields not involved in calculations can still allow string | number | undefined
  form_inquiry_number?: string;
  form_production_type?: string;
};

export default function CostEntryForm() {
  const [costEntryData, setcostEntryData] = useState<CostEntry[]>([]);

  useEffect(() => {
    fetchCostEntriesData();
    const inquiry_number = generateUniqueInquiryNumber(6);
    setFormValues({
      ...formValues,
      form_inquiry_number: inquiry_number.toString(),

      form_total_cost: 0,
      form_processing_and_outsourcing_total: 0,
      form_total_final_cost: 0,
    });
  }, []);

  //?? Form Values
  const [formValues, setFormValues] = useState({
    // -- -- 基本資料
    form_inquiry_number: "",
    form_production_type: "",
    form_material: "",
    form_product_dimensions: undefined as number | undefined,
    form_exchange_rate: undefined as number | undefined | string,
    form_tariff: undefined as number | undefined | string,
    form_shipping_cost: undefined as number | undefined | string,
    form_material_cost: undefined as number | undefined | string,
    form_blade_cost: undefined as number | undefined | string,
    form_blade_cost_notes: "",
    form_mold_cost: undefined as number | undefined | string,
    form_mold_cost_notes: "",
    form_other_cost: undefined as number | undefined | string,
    form_other_cost_notes: "",
    form_total_cost: undefined as number | undefined,
    form_total_processing_time: undefined as number | undefined,
    form_processing_cost: undefined as number | undefined,
    form_outsourcing_company: "",
    form_outsourcing_cost: undefined as number | undefined,
    form_processing_and_outsourcing_total: undefined as number | undefined,
    form_total_final_cost: undefined as number | undefined,
    form_content_notes: "",

    // -- -- 簽核 as BOOLEAN columns
    form_factory_signature: false,
    form_factory_deputy_signature: false,
    form_manager_signature: false,
    form_manager_approval_signature: false,

    // -- -- 加工內容
    form_lathe: false,
    form_milling_machine: false,
    form_cnc: false,
    form_manual: false,
    form_saw: false,
    form_backup_field1: false,
    form_backup_field2: false,
    form_backup_field3: false,
  });

  //?? Form Vaildation
  // Form Errors
  const [formErrors, setFormErrors] = useState({
    // -- -- 基本資料
    form_inquiry_number: false,
    form_production_type: false,
    form_material: false,
    form_product_dimensions: false,
    form_exchange_rate: false,
    form_tariff: false,
    form_shipping_cost: false,
    form_material_cost: false,
    form_blade_cost: false,
    form_blade_cost_notes: false,
    form_mold_cost: false,
    form_mold_cost_notes: false,
    form_other_cost: false,
    form_other_cost_notes: false,
    form_total_cost: false,
    form_total_processing_time: false,
    form_processing_cost: false,
    form_outsourcing_company: false,
    form_outsourcing_cost: false,
    form_processing_and_outsourcing_total: false,
    form_total_final_cost: false,
    form_content_notes: false,

    // -- -- 簽核 as BOOLEAN columns
    form_factory_signature: false,
    form_factory_deputy_signature: false,
    form_manager_signature: false,
    form_manager_approval_signature: false,

    // -- -- 加工內容
    form_lathe: false,
    form_milling_machine: false,
    form_cnc: false,
    form_manual: false,
    form_saw: false,
    form_backup_field1: false,
    form_backup_field2: false,
    form_backup_field3: false,
  });

  // Clear Form Fields
  const handleClearFields = () => {
    setFormValues({
      // -- -- 基本資料
      form_inquiry_number: "",
      form_production_type: "",
      form_material: "",
      form_product_dimensions: undefined,
      form_exchange_rate: undefined,
      form_tariff: undefined,
      form_shipping_cost: undefined,
      form_material_cost: undefined,
      form_blade_cost: undefined,
      form_blade_cost_notes: "",
      form_mold_cost: undefined,
      form_mold_cost_notes: "",
      form_other_cost: undefined,
      form_other_cost_notes: "",
      form_total_cost: undefined,
      form_total_processing_time: undefined,
      form_processing_cost: undefined,
      form_outsourcing_company: "",
      form_outsourcing_cost: undefined,
      form_processing_and_outsourcing_total: undefined,
      form_total_final_cost: undefined,
      form_content_notes: "",

      // -- -- 簽核 as BOOLEAN columns
      form_factory_signature: false,
      form_factory_deputy_signature: false,
      form_manager_signature: false,
      form_manager_approval_signature: false,

      // -- -- 加工內容
      form_lathe: false,
      form_milling_machine: false,
      form_cnc: false,
      form_manual: false,
      form_saw: false,
      form_backup_field1: false,
      form_backup_field2: false,
      form_backup_field3: false,
    });
    setFormErrors({
      form_inquiry_number: false,
      form_production_type: false,
      form_material: false,
      form_product_dimensions: false,
      form_exchange_rate: false,
      form_tariff: false,
      form_shipping_cost: false,
      form_material_cost: false,
      form_blade_cost: false,
      form_blade_cost_notes: false,
      form_mold_cost: false,
      form_mold_cost_notes: false,
      form_other_cost: false,
      form_other_cost_notes: false,
      form_total_cost: false,
      form_total_processing_time: false,
      form_processing_cost: false,
      form_outsourcing_company: false,
      form_outsourcing_cost: false,
      form_processing_and_outsourcing_total: false,
      form_total_final_cost: false,
      form_content_notes: false,

      form_factory_signature: false,
      form_factory_deputy_signature: false,
      form_manager_signature: false,
      form_manager_approval_signature: false,

      form_lathe: false,
      form_milling_machine: false,
      form_cnc: false,
      form_manual: false,
      form_saw: false,
      form_backup_field1: false,
      form_backup_field2: false,
      form_backup_field3: false,
    });
    setSelectedRow(undefined);
  };

  //?? Fetch CostEntry Data
  const fetchCostEntriesData = async () => {
    axios
      .get("/api/cost-entries", {
        responseType: "json",
      })
      .then((response) => {
        setcostEntryData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cost entries data: ", error);
      });
  };

  // ?? Add DrawingNumber
  const handleAddCostEntry = () => {
    const newCostEntry: CostEntry = {
      // -- -- 基本資料
      inquiry_number: parseInt(formValues.form_inquiry_number),
      production_type: formValues.form_production_type,
      material: formValues.form_material,
      product_dimensions: parseInt(
        formValues.form_product_dimensions?.toString() ?? "0"
      ),
      exchange_rate: parseInt(formValues.form_exchange_rate?.toString() ?? "0"),
      tariff: parseInt(formValues.form_tariff?.toString() ?? "0"),
      shipping_cost: parseInt(formValues.form_shipping_cost?.toString() ?? "0"),
      material_cost: parseInt(formValues.form_material_cost?.toString() ?? "0"),
      blade_cost: parseInt(formValues.form_blade_cost?.toString() ?? "0"),
      blade_cost_notes: formValues.form_blade_cost_notes,
      mold_cost: parseInt(formValues.form_mold_cost?.toString() ?? "0"),
      mold_cost_notes: formValues.form_mold_cost_notes,
      other_cost: parseInt(formValues.form_other_cost?.toString() ?? "0"),
      other_cost_notes: formValues.form_other_cost_notes,
      total_cost: parseInt(formValues.form_total_cost?.toString() ?? "0"),
      total_processing_time: parseInt(
        formValues.form_total_processing_time?.toString() ?? "0"
      ),
      processing_cost: parseInt(
        formValues.form_processing_cost?.toString() ?? "0"
      ),
      outsourcing_company: formValues.form_outsourcing_company,
      outsourcing_cost: parseInt(
        formValues.form_outsourcing_cost?.toString() ?? "0"
      ),
      processing_and_outsourcing_total: parseInt(
        formValues.form_processing_and_outsourcing_total?.toString() ?? "0"
      ),
      total_final_cost: parseInt(
        formValues.form_total_final_cost?.toString() ?? "0"
      ),
      content_notes: formValues.form_content_notes,

      // -- -- 簽核 as BOOLEAN columns
      factory_signature: formValues.form_factory_signature,
      factory_deputy_signature: formValues.form_factory_deputy_signature,
      manager_signature: formValues.form_manager_signature,
      manager_approval_signature: formValues.form_manager_approval_signature,

      // -- -- 加工內容
      lathe: formValues.form_lathe,
      milling_machine: formValues.form_milling_machine,
      cnc: formValues.form_cnc,
      manual: formValues.form_manual,
      saw: formValues.form_saw,
      backup_field1: formValues.form_backup_field1,
      backup_field2: formValues.form_backup_field2,
      backup_field3: formValues.form_backup_field3,
    };

    const newFormErrors = {
      // -- -- 基本資料
      form_inquiry_number: !newCostEntry.inquiry_number,
      form_production_type: !newCostEntry.production_type,
      form_material: !newCostEntry.material,
      form_product_dimensions: !newCostEntry.product_dimensions,
      form_exchange_rate: !newCostEntry.exchange_rate,
      form_tariff: !newCostEntry.tariff,
      form_shipping_cost: !newCostEntry.shipping_cost,
      form_material_cost: !newCostEntry.material_cost,
      form_blade_cost: !newCostEntry.blade_cost,
      form_blade_cost_notes: !newCostEntry.blade_cost_notes,
      form_mold_cost: !newCostEntry.mold_cost,
      form_mold_cost_notes: !newCostEntry.mold_cost_notes,
      form_other_cost: !newCostEntry.other_cost,
      form_other_cost_notes: !newCostEntry.other_cost_notes,
      form_total_cost: !newCostEntry.total_cost,
      form_total_processing_time: !newCostEntry.total_processing_time,
      form_processing_cost: !newCostEntry.processing_cost,
      form_outsourcing_company: !newCostEntry.outsourcing_company,
      form_outsourcing_cost: !newCostEntry.outsourcing_cost,
      form_processing_and_outsourcing_total:
        !newCostEntry.processing_and_outsourcing_total,
      form_total_final_cost: !newCostEntry.total_final_cost,
      form_content_notes: !newCostEntry.content_notes,

      // -- -- 簽核 as BOOLEAN columns
      form_factory_signature: !newCostEntry.factory_signature,
      form_factory_deputy_signature: !newCostEntry.factory_deputy_signature,
      form_manager_signature: !newCostEntry.manager_signature,
      form_manager_approval_signature: !newCostEntry.manager_approval_signature,

      // -- -- 加工內容
      form_lathe: !newCostEntry.lathe,
      form_milling_machine: !newCostEntry.milling_machine,
      form_cnc: !newCostEntry.cnc,
      form_manual: !newCostEntry.manual,
      form_saw: !newCostEntry.saw,
      form_backup_field1: !newCostEntry.backup_field1,
      form_backup_field2: !newCostEntry.backup_field2,
      form_backup_field3: !newCostEntry.backup_field3,
    };

    console.log("New Cost Entry: ", newCostEntry);
    console.log("New Form Errors: ", newFormErrors);

    setFormErrors(newFormErrors);

    const isFormValid = !Object.values(newFormErrors).some((error) => error);

    if (!isFormValid) {
      alert("請填寫完整資料");
      return;
    }

    console.log("Adding new Cost Entry:", newCostEntry);

    axios
      .post("/api/cost-entries", newCostEntry)
      .then(() => {
        alert(`成功新增成本資料，詢價單號為: ${newCostEntry.inquiry_number}`);
        handleClearFields();
        fetchCostEntriesData();
      })
      .catch((error) => {
        console.error(
          "Error adding cost entry:",
          error.response?.data || error.message
        );
        alert(`成本資料新增失敗: ${error.response?.data || error.message}`);
      });
  };

  // ?? Update Drawing Number
  const handleUpdateCostEntry = () => {
    if (!selectedRow) {
      alert("請選擇要修改的成本資料");
      return;
    }

    const updatedCostEntry: CostEntry = {
      // -- -- 基本資料
      inquiry_number: parseInt(formValues.form_inquiry_number),
      production_type: formValues.form_production_type,
      material: formValues.form_material,
      product_dimensions: parseInt(
        formValues.form_product_dimensions?.toString() ?? "0"
      ),
      exchange_rate: parseInt(formValues.form_exchange_rate?.toString() ?? "0"),
      tariff: parseInt(formValues.form_tariff?.toString() ?? "0"),
      shipping_cost: parseInt(formValues.form_shipping_cost?.toString() ?? "0"),
      material_cost: parseInt(formValues.form_material_cost?.toString() ?? "0"),
      blade_cost: parseInt(formValues.form_blade_cost?.toString() ?? "0"),
      blade_cost_notes: formValues.form_blade_cost_notes,
      mold_cost: parseInt(formValues.form_mold_cost?.toString() ?? "0"),
      mold_cost_notes: formValues.form_mold_cost_notes,
      other_cost: parseInt(formValues.form_other_cost?.toString() ?? "0"),
      other_cost_notes: formValues.form_other_cost_notes,
      total_cost: parseInt(formValues.form_total_cost?.toString() ?? "0"),
      total_processing_time: parseInt(
        formValues.form_total_processing_time?.toString() ?? "0"
      ),
      processing_cost: parseInt(
        formValues.form_processing_cost?.toString() ?? "0"
      ),
      outsourcing_company: formValues.form_outsourcing_company,
      outsourcing_cost: parseInt(
        formValues.form_outsourcing_cost?.toString() ?? "0"
      ),
      processing_and_outsourcing_total: parseInt(
        formValues.form_processing_and_outsourcing_total?.toString() ?? "0"
      ),
      total_final_cost: parseInt(
        formValues.form_total_final_cost?.toString() ?? "0"
      ),
      content_notes: formValues.form_content_notes,

      // -- -- 簽核 as BOOLEAN columns
      factory_signature: formValues.form_factory_signature,
      factory_deputy_signature: formValues.form_factory_deputy_signature,
      manager_signature: formValues.form_manager_signature,
      manager_approval_signature: formValues.form_manager_approval_signature,

      // -- -- 加工內容
      lathe: formValues.form_lathe,
      milling_machine: formValues.form_milling_machine,
      cnc: formValues.form_cnc,
      manual: formValues.form_manual,
      saw: formValues.form_saw,
      backup_field1: formValues.form_backup_field1,
      backup_field2: formValues.form_backup_field2,
      backup_field3: formValues.form_backup_field3,
    };

    console.log("Updated Cost Entry: ", updatedCostEntry);

    axios
      .put(
        `/api/cost-entries/${updatedCostEntry.inquiry_number}`,
        updatedCostEntry
      )
      .then(() => {
        alert(`修改成本資料成功，詢價單號: ${updatedCostEntry.inquiry_number}`);
        handleClearFields();
        fetchCostEntriesData();
      })
      .catch((error) => {
        console.error("Error updating drawing number:", error);
        alert("成本資料更新失敗！");
      });
  };

  // ?? Delete Cost Entry
  const handleDeleteCostEntry = () => {
    if (!selectedRow) {
      alert("請選擇要刪除的成本資料");
      return;
    }

    const selectedCostEntry = costEntryData.find(
      (costEntry) => costEntry.inquiry_number === selectedRow
    );

    if (!selectedCostEntry) {
      alert("找不到要刪除的成本資料");
      return;
    }

    const isConfirmed = window.confirm(
      `確定要刪除成本資料，詢價單號: ${selectedCostEntry.inquiry_number} 嗎?`
    );

    if (!isConfirmed) {
      return;
    }

    axios
      .delete(`/api/cost-entries/${selectedCostEntry.inquiry_number}`)
      .then(() => {
        alert(
          `成功刪除成本資料，詢價單號: ${selectedCostEntry.inquiry_number}`
        );
        setSelectedRow(undefined);
        handleClearFields();
        fetchCostEntriesData();
      })
      .catch((error) => {
        console.error("Error deleting cost entry:", error);
        alert("刪除成本資料失敗！");
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
      text: "預覽送出",
      variant: "contained",
      color: "primary",
      onClick: handleAddCostEntry,
    },
  ];

  const ButtonSection: React.FC = () => {
    return (
      <Box sx={{ mt: 1, display: "flex", justifyContent: "space-between" }}>
        {buttonConfigs.map((config) => (
          <Button
            key={config.text}
            variant={config.variant}
            color={config.color}
            onClick={config.onClick}
            disabled={config.disabled}
            fullWidth
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

  const handleRowClick = (costEntry: CostEntry) => {
    const isRowSelected = selectedRow === costEntry.inquiry_number;

    if (!isRowSelected) {
      // Select and fill form only if the row isn't already selected
      setSelectedRow(costEntry.inquiry_number);
      scrollToTop();
      handleRowSelectedData(costEntry);
      alert(
        `選擇詢價單號: ${costEntry.inquiry_number}，請在輸入欄位中更改資料，然後點擊「修改」，以套用更動`
      );
    } else {
      // Deselect row
      setSelectedRow(undefined);
      // Clear form fields on deselect
      handleClearFields();
    }
  };

  const handleRowSelectedData = (costEntry: CostEntry) => {
    setFormValues({
      // -- -- 基本資料
      form_inquiry_number: costEntry.inquiry_number?.toString() || "",
      form_production_type: costEntry.production_type,
      form_material: costEntry.material,
      form_product_dimensions: costEntry.product_dimensions,
      form_exchange_rate: costEntry.exchange_rate,
      form_tariff: costEntry.tariff,
      form_shipping_cost: costEntry.shipping_cost,
      form_material_cost: costEntry.material_cost,
      form_blade_cost: costEntry.blade_cost,
      form_blade_cost_notes: costEntry.blade_cost_notes,
      form_mold_cost: costEntry.mold_cost,
      form_mold_cost_notes: costEntry.mold_cost_notes,
      form_other_cost: costEntry.other_cost,
      form_other_cost_notes: costEntry.other_cost_notes,
      form_total_cost: costEntry.total_cost,
      form_total_processing_time: costEntry.total_processing_time,
      form_processing_cost: costEntry.processing_cost,
      form_outsourcing_company: costEntry.outsourcing_company,
      form_outsourcing_cost: costEntry.outsourcing_cost,
      form_processing_and_outsourcing_total:
        costEntry.processing_and_outsourcing_total,
      form_total_final_cost: costEntry.total_final_cost,
      form_content_notes: costEntry.content_notes,

      // -- -- 簽核 as BOOLEAN columns
      form_factory_signature: costEntry.factory_signature,
      form_factory_deputy_signature: costEntry.factory_deputy_signature,
      form_manager_signature: costEntry.manager_signature,
      form_manager_approval_signature: costEntry.manager_approval_signature,

      // -- -- 加工內容
      form_lathe: costEntry.lathe,
      form_milling_machine: costEntry.milling_machine,
      form_cnc: costEntry.cnc,
      form_manual: costEntry.manual,
      form_saw: costEntry.saw,
      form_backup_field1: costEntry.backup_field1,
      form_backup_field2: costEntry.backup_field2,
      form_backup_field3: costEntry.backup_field3,
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

  //?? Generate unique Inquiry Number
  const generateUniqueInquiryNumber = (length: number) => {
    const multiplier = Math.pow(10, length);
    return Math.floor(multiplier * Math.random());
  };

  //?? Calculate sum
  const calculateSum = (
    fields: string[], // Accept string field names to maintain compatibility
    resultField: string,
    formValues: any, // Use `any` or your existing hook type
    setFormValues: React.Dispatch<React.SetStateAction<any>>
  ): void => {
    // Validate fields for missing or invalid data
    const hasIncompleteData = fields.some((field) => {
      const value = formValues[field];
      return value === undefined || value === "" || isNaN(Number(value)); // Check for invalid data
    });

    if (hasIncompleteData) {
      alert("數據不完整！請確認所有數據已正確輸入！");
      return; // Exit if any data is missing or invalid
    }

    // Calculate the sum of valid fields
    const total = fields.reduce((sum, field) => {
      const value = parseFloat(formValues[field]);
      return sum + (isNaN(value) ? 0 : value); // Safely parse and sum numbers
    }, 0);

    // Update the result field
    setFormValues((prev: any) => ({
      ...prev,
      [resultField]: total,
    }));
  };

  const calculateFinalCost = (
    formValues: any,
    setFormValues: React.Dispatch<React.SetStateAction<any>>
  ): void => {
    const { form_total_cost, form_processing_and_outsourcing_total } =
      formValues;

    // Validate required totals
    if (
      form_total_cost === undefined ||
      form_total_cost === "" ||
      isNaN(Number(form_total_cost)) ||
      form_total_cost === 0 ||
      form_processing_and_outsourcing_total === undefined ||
      form_processing_and_outsourcing_total === "" ||
      isNaN(Number(form_processing_and_outsourcing_total)) ||
      form_processing_and_outsourcing_total === 0
    ) {
      alert("數據不完整！請確認所有數據已正確輸入！");
      return; // Exit if any required total is invalid
    }

    // Calculate the final total
    const finalCost =
      parseFloat(form_total_cost) +
      parseFloat(form_processing_and_outsourcing_total);

    // Update the final cost field
    setFormValues((prev: any) => ({
      ...prev,
      form_total_final_cost: finalCost,
    }));
  };

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

      <Grid container spacing={2}>
        {/* Inquiry Number and Production Type */}
        <Grid item xs={3}>
          <TextField
            fullWidth
            label="詢價單號"
            value={formValues.form_inquiry_number}
            disabled={true}
            error={formErrors.form_inquiry_number}
          ></TextField>
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputLabel>生產類型</InputLabel>
            <Select
              value={formValues.form_production_type}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  form_production_type: e.target.value as string,
                })
              }
              error={formErrors.form_production_type}
            >
              <MenuItem value="少量">少量生產</MenuItem>
              <MenuItem value="大量">大量生產</MenuItem>
              <MenuItem value="客製化">客製化</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <TextField
            value={formValues.form_material}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                form_material: e.target.value as string,
              })
            }
            error={formErrors.form_material}
            fullWidth
            label="材質"
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            value={formValues.form_product_dimensions || ""}
            onChange={(e) => {
              const value = e.target.value;
              setFormValues({
                ...formValues,
                form_product_dimensions:
                  value === "" ? undefined : parseFloat(value),
              });
            }}
            error={formErrors.form_product_dimensions}
            fullWidth
            label="製品尺寸"
          />
        </Grid>

        {/* Product Size, Accuracy, Tax, Shipping */}
        <Grid item xs={3}>
          <TextField
            value={formValues.form_exchange_rate ?? ""} // Use nullish coalescing to handle undefined
            onChange={(e) => {
              const value = e.target.value;

              // Allow only valid numbers and a single "."
              if (/^\d*\.?\d*$/.test(value)) {
                setFormValues({
                  ...formValues,
                  form_exchange_rate: value, // Temporarily store as string
                });
              }
            }}
            onBlur={(e) => {
              const value = parseFloat(e.target.value);

              setFormValues({
                ...formValues,
                form_exchange_rate: isNaN(value) ? undefined : value, // Convert to number on blur
              });
            }}
            error={formErrors.form_exchange_rate}
            fullWidth
            label="匯率"
          />
        </Grid>

        <Grid item xs={3}>
          <TextField
            value={formValues.form_tariff ?? ""} // Use nullish coalescing to handle undefined
            onChange={(e) => {
              const value = e.target.value;

              // Allow only valid numbers and a single "."
              if (/^\d*\.?\d*$/.test(value)) {
                setFormValues({
                  ...formValues,
                  form_tariff: value, // Temporarily store as string
                });
              }
            }}
            onBlur={(e) => {
              const value = parseFloat(e.target.value);

              setFormValues({
                ...formValues,
                form_tariff: isNaN(value) ? undefined : value, // Convert to number on blur
              });
            }}
            error={formErrors.form_tariff}
            fullWidth
            label="關稅 ($)"
          />
        </Grid>

        <Grid item xs={3}>
          <TextField
            value={formValues.form_shipping_cost ?? ""}
            onChange={(e) => {
              const value = e.target.value;

              if (/^\d*\.?\d*$/.test(value)) {
                setFormValues({
                  ...formValues,
                  form_shipping_cost: value,
                });
              }
            }}
            onBlur={(e) => {
              const value = parseFloat(e.target.value);

              setFormValues({
                ...formValues,
                form_shipping_cost: isNaN(value) ? undefined : value,
              });
            }}
            error={formErrors.form_shipping_cost}
            fullWidth
            label="運費 ($)"
          />
        </Grid>

        <Grid item xs={3}>
          <TextField
            value={formValues.form_material_cost ?? ""}
            onChange={(e) => {
              const value = e.target.value;

              if (/^\d*\.?\d*$/.test(value)) {
                setFormValues({
                  ...formValues,
                  form_material_cost: value,
                });
              }
            }}
            onBlur={(e) => {
              const value = parseFloat(e.target.value);

              setFormValues({
                ...formValues,
                form_material_cost: isNaN(value) ? undefined : value,
              });
            }}
            error={formErrors.form_material_cost}
            fullWidth
            label="素材成本 ($)"
          />
        </Grid>

        {/* Knife Tool Cost Section */}
        <Grid item xs={3}>
          <TextField
            value={formValues.form_blade_cost ?? ""} // Use nullish coalescing to handle undefined
            onChange={(e) => {
              const value = e.target.value;

              // Allow only valid numbers and a single "."
              if (/^\d*\.?\d*$/.test(value)) {
                setFormValues({
                  ...formValues,
                  form_blade_cost: value, // Temporarily store as string
                });
              }
            }}
            onBlur={(e) => {
              const value = parseFloat(e.target.value);

              setFormValues({
                ...formValues,
                form_blade_cost: isNaN(value) ? undefined : value, // Convert to number on blur
              });
            }}
            error={formErrors.form_blade_cost}
            fullWidth
            label="刀具成本 ($)"
          />
        </Grid>
        <Grid item xs={9}>
          <TextField
            value={formValues.form_blade_cost_notes}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                form_blade_cost_notes: e.target.value as string,
              })
            }
            error={formErrors.form_blade_cost_notes}
            fullWidth
            label="刀具成本內容備註"
          />
        </Grid>

        {/* Tool Cost Section */}
        <Grid item xs={3}>
          <TextField
            value={formValues.form_mold_cost ?? ""} // Use nullish coalescing to handle undefined
            onChange={(e) => {
              const value = e.target.value;

              // Allow only valid numbers and a single "."
              if (/^\d*\.?\d*$/.test(value)) {
                setFormValues({
                  ...formValues,
                  form_mold_cost: value, // Temporarily store as string
                });
              }
            }}
            onBlur={(e) => {
              const value = parseFloat(e.target.value);

              setFormValues({
                ...formValues,
                form_mold_cost: isNaN(value) ? undefined : value, // Convert to number on blur
              });
            }}
            error={formErrors.form_mold_cost}
            fullWidth
            label="模具成本 ($)"
          />
        </Grid>
        <Grid item xs={9}>
          <TextField
            value={formValues.form_mold_cost_notes}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                form_mold_cost_notes: e.target.value as string,
              })
            }
            error={formErrors.form_mold_cost_notes}
            fullWidth
            label="模具成本內容備註"
          />
        </Grid>

        {/* Others Cost Section */}
        <Grid item xs={3}>
          <TextField
            value={formValues.form_other_cost ?? ""} // Use nullish coalescing to handle undefined
            onChange={(e) => {
              const value = e.target.value;

              // Allow only valid numbers and a single "."
              if (/^\d*\.?\d*$/.test(value)) {
                setFormValues({
                  ...formValues,
                  form_other_cost: value, // Temporarily store as string
                });
              }
            }}
            onBlur={(e) => {
              const value = parseFloat(e.target.value);

              setFormValues({
                ...formValues,
                form_other_cost: isNaN(value) ? undefined : value, // Convert to number on blur
              });
            }}
            error={formErrors.form_other_cost}
            fullWidth
            label="其他成本 ($)"
          />
        </Grid>
        <Grid item xs={9}>
          <TextField
            value={formValues.form_other_cost_notes}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                form_other_cost_notes: e.target.value as string,
              })
            }
            error={formErrors.form_other_cost_notes}
            fullWidth
            label="其他成本內容備註"
          />
        </Grid>

        <Grid item xs={3}>
          <TextField
            value={formValues.form_total_cost}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                form_total_cost: parseFloat(e.target.value),
              })
            }
            error={formErrors.form_total_cost}
            fullWidth
            label="合計 ($)"
            disabled
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            sx={{ height: "100%", width: "100%" }}
            onClick={() => {
              calculateSum(
                [
                  "form_exchange_rate",
                  "form_tariff",
                  "form_shipping_cost",
                  "form_material_cost",
                  "form_blade_cost",
                  "form_mold_cost",
                  "form_other_cost",
                ],
                "form_total_cost",
                formValues,
                setFormValues
              );
            }}
          >
            執行成本合計
          </Button>
        </Grid>
        <Grid item xs={3}>
          <FormControl>
            <Box display="flex" alignItems="center" sx={{ height: "56px" }}>
              <Typography>廠務簽核:</Typography>
              <Checkbox
                checked={formValues.form_factory_signature}
                onChange={(e) => {
                  setFormValues({
                    ...formValues,
                    form_factory_signature: e.target.checked,
                  });
                }}
              />
            </Box>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl>
            <Box display="flex" alignItems="center" sx={{ height: "56px" }}>
              <Typography>廠長代簽:</Typography>
              <Checkbox
                checked={formValues.form_manager_signature}
                onChange={(e) => {
                  setFormValues({
                    ...formValues,
                    form_manager_signature: e.target.checked,
                  });
                }}
              />
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
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={formValues.form_lathe}
                              onChange={(e) => {
                                setFormValues({
                                  ...formValues,
                                  form_lathe: e.target.checked,
                                });
                              }}
                            />
                          }
                          label="車床"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={formValues.form_milling_machine}
                              onChange={(e) => {
                                setFormValues({
                                  ...formValues,
                                  form_milling_machine: e.target.checked,
                                });
                              }}
                            />
                          }
                          label="銑床"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={formValues.form_cnc}
                              onChange={(e) => {
                                setFormValues({
                                  ...formValues,
                                  form_cnc: e.target.checked,
                                });
                              }}
                            />
                          }
                          label="CNC"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={formValues.form_manual}
                              onChange={(e) => {
                                setFormValues({
                                  ...formValues,
                                  form_manual: e.target.checked,
                                });
                              }}
                            />
                          }
                          label="手工"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={formValues.form_saw}
                              onChange={(e) => {
                                setFormValues({
                                  ...formValues,
                                  form_saw: e.target.checked,
                                });
                              }}
                            />
                          }
                          label="鋸床"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={formValues.form_backup_field1}
                              onChange={(e) => {
                                setFormValues({
                                  ...formValues,
                                  form_backup_field1: e.target.checked,
                                });
                              }}
                            />
                          }
                          label="後備3"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={formValues.form_backup_field2}
                              onChange={(e) => {
                                setFormValues({
                                  ...formValues,
                                  form_backup_field2: e.target.checked,
                                });
                              }}
                            />
                          }
                          label="後備2"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={formValues.form_backup_field3}
                              onChange={(e) => {
                                setFormValues({
                                  ...formValues,
                                  form_backup_field3: e.target.checked,
                                });
                              }}
                            />
                          }
                          label="後備3"
                        />
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
              <TextField
                value={formValues.form_total_processing_time}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    form_total_processing_time: parseFloat(e.target.value),
                  })
                }
                error={formErrors.form_total_processing_time}
                label="總加工時間"
                fullWidth
                margin="dense"
              />
              <TextField
                value={formValues.form_processing_cost}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    form_processing_cost: parseFloat(e.target.value),
                  })
                }
                error={formErrors.form_processing_cost}
                label="加工成本 $"
                fullWidth
                margin="dense"
              />
              <TextField
                value={formValues.form_outsourcing_company}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    form_outsourcing_company: e.target.value as string,
                  })
                }
                error={formErrors.form_outsourcing_company}
                label="委外公司名稱"
                fullWidth
                margin="dense"
              />
              <TextField
                value={formValues.form_outsourcing_cost}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    form_outsourcing_cost: parseFloat(e.target.value),
                  })
                }
                error={formErrors.form_outsourcing_cost}
                label="委外成本 $"
                fullWidth
                margin="dense"
              />
              <TextField
                value={formValues.form_processing_and_outsourcing_total}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    form_processing_and_outsourcing_total: parseFloat(
                      e.target.value
                    ),
                  })
                }
                error={formErrors.form_processing_and_outsourcing_total}
                label="加工時間及委外成本合計 $"
                fullWidth
                margin="dense"
                disabled
              />
              <Button
                variant="contained"
                sx={{ mt: 1.5, width: "100%" }}
                onClick={() => {
                  calculateSum(
                    ["form_processing_cost", "form_outsourcing_cost"],
                    "form_processing_and_outsourcing_total",
                    formValues,
                    setFormValues
                  );
                }}
              >
                執行加工時間及委外成本合計
              </Button>

              <TextField
                value={formValues.form_total_final_cost}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    form_total_final_cost: parseFloat(e.target.value),
                  })
                }
                error={formErrors.form_total_final_cost}
                label="總成本合計 $"
                fullWidth
                margin="dense"
                sx={{ mt: 1.5 }}
                disabled
              />
              <Button
                variant="contained"
                sx={{ mt: 1.5, width: "100%" }}
                onClick={() => {
                  calculateFinalCost(formValues, setFormValues);
                }}
              >
                執行總成本合計
              </Button>
            </Grid>

            {/* Signature Section */}
            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formValues.form_manager_approval_signature}
                    onChange={(e) => {
                      setFormValues({
                        ...formValues,
                        form_manager_approval_signature: e.target.checked,
                      });
                    }}
                  />
                }
                label="廠長簽核"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formValues.form_factory_deputy_signature}
                    onChange={(e) => {
                      setFormValues({
                        ...formValues,
                        form_factory_deputy_signature: e.target.checked,
                      });
                    }}
                  />
                }
                label="廠務代簽"
              />
            </Grid>

            {/* Bottom Section - Submit Button */}
            <Grid item xs={12}>
              <ButtonSection />
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Container>
  );
}

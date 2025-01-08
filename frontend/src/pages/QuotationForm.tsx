import { Box, Container, Grid, Paper, Typography } from "@mui/material";

import SidebarButton from "../components/quotation/SidebarButton";

import EmployeeInfoForm from "../components/forms/EmployeeInfoForm";
import ClientInfoForm from "../components/forms/ClientInfoForm";
import MaintanceMaterialInfo from "../components/forms/MaintanceMaterialInfo";
import OutsourcingVendorForm from "../components/forms/OutsourcingVendorForm";
import CentralDrawingNumberForm from "../components/forms/CentralDrawingNumberForm";
import InquiryForm from "../components/forms/InquiryForm";
import CostEntryForm from "../components/forms/CostEntryForm";
import ApprovedCostForm from "../components/forms/ApprovedCostForm";
import OrderApprovalForm from "../components/forms/OrderApprovalForm";

import { useState } from "react";

type ComponentMapType = {
  [key: string]: React.FC;
};

const componentMap: ComponentMapType = {
  員工基本資料: EmployeeInfoForm,
  客戶基本資料: ClientInfoForm,
  維護材質資料: MaintanceMaterialInfo,
  委外廠商資料: OutsourcingVendorForm,
  中央圖號管理資料: CentralDrawingNumberForm,
  填寫詢價單: InquiryForm,
  填寫成本資料: CostEntryForm,
  已簽核成本資料: ApprovedCostForm,
  訂單簽核: OrderApprovalForm,
};

export default function QuotationPage() {
  const [currentTitle, setCurrentTitle] = useState("員工基本資料");

  const sidebarItems = [
    "員工基本資料",
    "客戶基本資料",
    "維護材質資料",
    "委外廠商資料",
    "中央圖號管理資料",
    "填寫詢價單",
    "填寫成本資料",
    "已簽核成本資料",
    "訂單簽核",
  ];

  const CurrentFormComponent = componentMap[currentTitle];

  return (
    <Container maxWidth="lg" sx={{ ml: 0 }}>
      <Grid container spacing={3}>
        {/* Sidebar Section */}
        <Grid item xs={3}>
          <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6">未/已取單數量</Typography>
            <Typography variant="body1">未取單: 0</Typography>
            <Typography variant="body1">已取單: 0</Typography>
          </Paper>

          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">資料處理</Typography>
            {sidebarItems.map((item) => (
              <SidebarButton
                key={item}
                title={item}
                currentTitle={currentTitle}
                SetCurrentTitle={setCurrentTitle}
              />
            ))}
          </Paper>
        </Grid>

        {/* Main Content Section */}
        <Grid item xs={9}>
          <Paper elevation={3} sx={{ p: 3, width: "140%" }}>
            <Typography variant="h5" gutterBottom>
              {currentTitle}
            </Typography>
            <Box sx={{ height: "800px", overflowY: "auto" }}>
              {CurrentFormComponent && <CurrentFormComponent />}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

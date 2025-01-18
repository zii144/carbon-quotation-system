import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Fab,
  Alert,
  Collapse,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

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
import useAlert from "../hooks/userAlert";
import { useEffect } from "react";
import { useUser } from "../context/userContext";

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

  const [showSidebar, setShowSidebar] = useState(true);

  const { alert, showAlert } = useAlert();

  /* Show alert when user is  authenticated */
  const { user } = useUser();
  useEffect(() => {
    if (user.isAuthenticated) {
      showAlert(`登入成功，身份為: ${user.role}`, "success");
    }
  }, [user.isAuthenticated, user.role, showAlert]);

  return (
    <Container maxWidth="lg" sx={{ ml: -5, mr: -5 }}>
      <Grid container spacing={2}>
        {/* Sidebar Section */}
        {showSidebar && (
          <Grid item xs={3}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                mb: 2,
                width: { xs: "60vw", sm: "65vw", md: "18.5vw", lg: "14.5vw" },
              }}
            >
              <Typography variant="h6">未/已取單數量</Typography>
              <Typography variant="body1">未取單: 0</Typography>
              <Typography variant="body1">已取單: 0</Typography>
            </Paper>

            <Paper
              elevation={3}
              sx={{
                p: 2,
                width: { xs: "60vw", sm: "65vw", md: "18.5vw", lg: "14.5vw" },
                height: { xs: "70vh", sm: "75vh", md: "65vh", lg: "52vh" },
                position: "sticky",
                top: "10px",
                overflowY: "auto",
              }}
            >
              <Typography variant="h6">資料處理列表</Typography>
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
        )}

        {/* Main Content Section */}
        <Grid item xs={showSidebar ? 9 : 12}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              width: {
                xs: "60vw",
                sm: "68vw",
                md: "70vw",
                lg: showSidebar ? "76vw" : "93vw",
              },
              height: { xs: "70vh", sm: "75vh", md: "80vh", lg: "85vh" },
              position: "sticky",
              top: "10px",
              overflowY: "auto",
            }}
          >
            <Typography variant="h5" gutterBottom>
              {currentTitle}
            </Typography>
            <Box sx={{ p: 0, overflowY: "auto" }}>
              {CurrentFormComponent && <CurrentFormComponent />}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label={showSidebar ? "Hide Sidebar" : "Show Sidebar"}
        sx={{
          position: "fixed",
          bottom: "40px",
          left: "30px",
        }}
        onClick={() => setShowSidebar(!showSidebar)}
      >
        {showSidebar ? <CloseIcon /> : <MenuIcon />}
      </Fab>

      {/* Alert Component */}
      <Collapse
        in={alert.open}
        sx={{ position: "fixed", top: "1rem", right: "1rem" }}
      >
        <Alert variant="filled" severity="success">
          {alert.message}
        </Alert>
      </Collapse>
    </Container>
  );
}

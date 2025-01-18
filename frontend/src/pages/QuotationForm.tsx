import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Fab,
  Alert,
  Badge,
  Avatar,
  Stack,
  Fade,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppTheme from "../shared-theme/AppTheme";

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

import { useState, useEffect } from "react";
import useAlert from "../hooks/userAlert";
import { useUser } from "../hooks/useUser";
import { useNavigate } from "react-router-dom";

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
    "登出",
  ];

  //* Role mapping */
  //#region Role Mapping
  const roleMapping: Record<string, string> = {
    總經理: "GeneralManager",
    廠長: "FactoryDirector",
    廠務: "FactoryPeer",
    業務: "Sales",
  };

  // Dynamically create the reverse mapping
  const reverseRoleMapping = Object.fromEntries(
    Object.entries(roleMapping).map(([key, value]) => [value, key])
  );

  const parseRoleToEnglish = (role: string): string => {
    return roleMapping[role] || "UnknownRole";
  };

  const parseRoleToChinese = (role: string): string => {
    return reverseRoleMapping[role] || "未知身份";
  };
  //#endregion

  const CurrentFormComponent = componentMap[currentTitle];

  const [showSidebar, setShowSidebar] = useState(true);

  const { alert, showAlert } = useAlert();

  const navigate = useNavigate();

  //* Role Access */
  //#region  Role Access
  const roleAccess = {
    GeneralManager: [
      "員工基本資料",
      "客戶基本資料",
      "維護材質資料",
      "委外廠商資料",
      "中央圖號管理資料",
      "填寫詢價單",
      "填寫成本資料",
      "已簽核成本資料",
      "訂單簽核",
      "登出",
    ],
    FactoryDirector: [
      "員工基本資料",
      "填寫成本資料",
      "已簽核成本資料",
      "訂單簽核",
      "登出",
    ],
    FactoryPeer: ["填寫成本資料", "已簽核成本資料", "登出"],
    Sales: ["填寫詢價單", "登出"],
  };
  //#endregion

  //* Show alert when user is  authenticated */
  //#region Show alert when user is authenticated
  const { user } = useUser();
  const [alertShown, setAlertShown] = useState(false);
  const filteredSidebarItems = roleAccess[user.role] || [];

  useEffect(() => {
    if (user.isAuthenticated && !alertShown) {
      showAlert(
        `登入成功，身份為: ${parseRoleToChinese(user.role)}`,
        "success"
      );
      setAlertShown(true);
    } else if (!user.isAuthenticated && !alertShown) {
      showAlert("登入失敗，請檢查帳號或密碼", "error");
      navigate("/");
      setAlertShown(true);
    }
  }, [user.isAuthenticated, user.role, showAlert, navigate, alertShown]);
  //#endregion

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "relative",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));

  const { setUser } = useUser();
  const handleLogout = () => {
    setUser({ role: "", isAuthenticated: false }); // Clear user state
    console.log("User logged out"); // Any additional logout logic
  };

  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
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
                }}
              >
                <Grid container spacing={2} sx={{ p: 2 }}>
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                  >
                    <Avatar alt="" />
                  </StyledBadge>

                  <Typography
                    sx={{
                      ml: 1.5,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    身份群組：{parseRoleToChinese(user.role)}
                  </Typography>
                </Grid>
                <Typography variant="h6">未/已取單數量</Typography>
                <Typography variant="body1">未取單: 0</Typography>
                <Typography variant="body1">已取單: 0</Typography>
              </Paper>

              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  position: "sticky",
                  top: "10px",
                  overflowY: "auto",
                }}
              >
                <Typography variant="h6">資料處理列表</Typography>
                <Stack spacing={2} sx={{ mt: 2 }}>
                  {filteredSidebarItems.map((item: string) => (
                    <SidebarButton
                      key={item}
                      title={item}
                      currentTitle={currentTitle}
                      SetCurrentTitle={setCurrentTitle}
                      onLogout={item === "登出" ? handleLogout : undefined} // Pass onLogout only for '登出'
                    />
                  ))}
                </Stack>
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
          variant="extended"
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
        <Fade in={alert.open} timeout={500}>
          <Alert
            variant="filled"
            severity="success"
            sx={{ position: "fixed", top: "1rem", right: "1rem" }}
          >
            {alert.message}
          </Alert>
        </Fade>
      </Container>
    </AppTheme>
  );
}

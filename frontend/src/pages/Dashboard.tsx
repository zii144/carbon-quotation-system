import { Box, Typography, Grid, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SummarizeIcon from "@mui/icons-material/Summarize";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Card 1 - Total Quotations */}
        <Grid item xs={12} md={6} lg={4}>
          <Paper sx={{ p: 3, textAlign: "center" }}>
            <SummarizeIcon sx={{ fontSize: 50, color: "primary.main" }} />
            <Typography variant="h6" mt={2}>
              Total Quotations
            </Typography>
            <Typography variant="h4">124</Typography>
          </Paper>
        </Grid>

        {/* Card 2 - New Quotation */}
        <Grid item xs={12} md={6} lg={4}>
          <Paper sx={{ p: 3, textAlign: "center" }}>
            <AddCircleOutlineIcon
              sx={{ fontSize: 50, color: "secondary.main" }}
            />
            <Typography variant="h6" mt={2}>
              New Quotation
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              sx={{ mt: 2 }}
              onClick={() => navigate("/quotation")}
            >
              Create Quotation
            </Button>
          </Paper>
        </Grid>

        {/* Card 3 - Pending Approvals */}
        <Grid item xs={12} md={6} lg={4}>
          <Paper sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="h6">Pending Approvals</Typography>
            <Typography variant="h4" sx={{ color: "orange" }}>
              8
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Recent Quotations Section */}
      <Box sx={{ mt: 5 }}>
        <Typography variant="h5" gutterBottom>
          Recent Quotations
        </Typography>
        <Paper sx={{ p: 2 }}>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography>Project A - $5000</Typography>
            <Button size="small" variant="outlined">
              View
            </Button>
          </Box>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography>Project B - $3200</Typography>
            <Button size="small" variant="outlined">
              View
            </Button>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography>Project C - $7200</Typography>
            <Button size="small" variant="outlined">
              View
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

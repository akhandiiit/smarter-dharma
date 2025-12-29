import {
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import { AnalyzeResponse } from "../types/building";
import Charts from "./Charts";

export default function Dashboard({ data }: { data: AnalyzeResponse }) {
  return (
    <Card
      elevation={3}
      sx={{
        mt: 4,
        borderRadius: 3,
        textAlign: "center",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Title */}
        <Typography
          variant="subtitle1"
          color="text.secondary"
          gutterBottom
        >
          Estimated Cooling Cost
        </Typography>

        {/* Cost */}
        <Typography
          variant="h4"
          fontWeight={700}
          color="primary"
          gutterBottom
        >
          ₹{data.totalCost.toFixed(2)}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Based on solar heat gain and electricity rates
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* Chart */}
        <Box sx={{ height: 300 }}>
          <Charts breakdown={data.breakdown} />
        </Box>
      </CardContent>
    </Card>
  );
}

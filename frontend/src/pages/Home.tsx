import { Container, Alert, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { analyzeBuilding } from "../api/building.api";
import BuildingForm from "../components/BuildingForm";
import Dashboard from "../components/Dashboard";
import { AnalyzeRequest } from "../types/building";

export default function Home() {
  const mutation = useMutation({
    mutationFn: (data: AnalyzeRequest) => {
      console.log("MUTATION FN CALLED", data);
      return analyzeBuilding(data);
    },
  });

  const handleSubmit = (data: AnalyzeRequest) => {
    console.log("HANDLE SUBMIT", data);
    mutation.mutate(data);
  };

  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }} fontWeight={600}>
          Building Energy Analysis System
        </Typography>
      <BuildingForm
        onSubmit={handleSubmit}
        loading={mutation.isPending}
      />

      {mutation.isError && (
        <Alert severity="error" sx={{ mt: 2 }}>
          API Error – check console
        </Alert>
      )}

      {mutation.data && <Dashboard data={mutation.data} />}
    </Container>
  );
}

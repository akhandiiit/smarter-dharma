import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { AnalyzeRequest, FacadeKey } from "../types/building";


const FACADES: FacadeKey[] = ["north", "south", "east", "west", "roof"];

const defaultFacades = FACADES.reduce((acc, f) => {
  acc[f] = { height: 10, width: 10, wwr: 0.3 };
  return acc;
}, {} as AnalyzeRequest["facades"]);


type FacadeErrors = {
  height?: string;
  width?: string;
  wwr?: string;
};

type FormErrors = {
  city?: string;
  shgc?: string;
  facades: Record<FacadeKey, FacadeErrors>;
};


const createEmptyFacadeErrors = (): Record<FacadeKey, FacadeErrors> =>
  FACADES.reduce((acc, f) => {
    acc[f] = {};
    return acc;
  }, {} as Record<FacadeKey, FacadeErrors>);


export default function BuildingForm({
  onSubmit,
  loading,
}: {
  onSubmit: (data: AnalyzeRequest) => void;
  loading: boolean;
}) {
  const [form, setForm] = useState<AnalyzeRequest>({
    city: "Delhi",
    shgc: 0.6,
    facades: defaultFacades,
  });

  const [errors, setErrors] = useState<FormErrors>({
    facades: createEmptyFacadeErrors(),
  });


  const handleFacadeChange = (
    facade: FacadeKey,
    field: keyof FacadeErrors,
    value: number
  ) => {
    // Update form state
    setForm((prev) => ({
      ...prev,
      facades: {
        ...prev.facades,
        [facade]: {
          ...prev.facades[facade],
          [field]: value,
        },
      },
    }));

    setErrors((prev) => ({
      ...prev,
      facades: {
        ...prev.facades,
        [facade]: {
          ...prev.facades[facade],
          [field]: undefined,
        },
      },
    }));
  };


  const validateForm = (): boolean => {
    let valid = true;

    const newErrors: FormErrors = {
      facades: createEmptyFacadeErrors(),
    };

    // City
    if (!form.city) {
      newErrors.city = "City is required";
      valid = false;
    }

    // SHGC
    if (form.shgc < 0 || form.shgc > 1) {
      newErrors.shgc = "SHGC must be between 0 and 1";
      valid = false;
    }

    // Facades
    FACADES.forEach((facade) => {
      const f = form.facades[facade];

      if (f.height <= 0) {
        newErrors.facades[facade].height =
          "Height must be greater than 0";
        valid = false;
      }

      if (f.width <= 0) {
        newErrors.facades[facade].width =
          "Width must be greater than 0";
        valid = false;
      }

      if (f.wwr < 0 || f.wwr > 1) {
        newErrors.facades[facade].wwr =
          "WWR must be between 0 and 1";
        valid = false;
      }
    });

    setErrors(newErrors);
    return valid;
  };


  return (
    <Card elevation={3} sx={{ borderRadius: 3 }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={600}>
          Building Configuration
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Enter basic building and window parameters
        </Typography>

        {/* City & SHGC */}
        <Grid container spacing={2} mb={2}>
          <Grid item xs={12} md={6}>
            <TextField
              select
              size="small"
              fullWidth
              label="City"
              value={form.city}
              error={!!errors.city}
              helperText={errors.city}
              onChange={(e) => {
                setForm({ ...form, city: e.target.value });
                setErrors((prev) => ({ ...prev, city: undefined }));
              }}
            >
              {["Delhi", "Mumbai", "Kolkata", "Bangalore"].map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              size="small"
              type="number"
              fullWidth
              label="SHGC"
              value={form.shgc}
              error={!!errors.shgc}
              helperText={errors.shgc}
              inputProps={{ min: 0, max: 1, step: 0.1 }}
              onChange={(e) => {
                setForm({ ...form, shgc: Number(e.target.value) });
                setErrors((prev) => ({ ...prev, shgc: undefined }));
              }}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* Facades */}
        {FACADES.map((facade) => (
          <Box key={facade} mb={2}>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              {facade.toUpperCase()}
            </Typography>

            <Grid container spacing={1.5}>
              <Grid item xs={4}>
                <TextField
                  size="small"
                  type="number"
                  label="Height"
                  fullWidth
                  value={form.facades[facade].height}
                  error={!!errors.facades[facade]?.height}
                  helperText={errors.facades[facade]?.height}
                  onChange={(e) =>
                    handleFacadeChange(
                      facade,
                      "height",
                      Number(e.target.value)
                    )
                  }
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  size="small"
                  type="number"
                  label="Width"
                  fullWidth
                  value={form.facades[facade].width}
                  error={!!errors.facades[facade]?.width}
                  helperText={errors.facades[facade]?.width}
                  onChange={(e) =>
                    handleFacadeChange(
                      facade,
                      "width",
                      Number(e.target.value)
                    )
                  }
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  size="small"
                  type="number"
                  label="WWR"
                  fullWidth
                  value={form.facades[facade].wwr}
                  error={!!errors.facades[facade]?.wwr}
                  helperText={errors.facades[facade]?.wwr}
                  inputProps={{ min: 0, max: 1, step: 0.1 }}
                  onChange={(e) =>
                    handleFacadeChange(
                      facade,
                      "wwr",
                      Number(e.target.value)
                    )
                  }
                />
              </Grid>
            </Grid>
          </Box>
        ))}

        {/* Submit */}
        <Button
          variant="contained"
          fullWidth
          size="medium"
          sx={{ mt: 2, py: 1.2, borderRadius: 2 }}
          disabled={loading}
          onClick={() => {
            if (validateForm()) {
              onSubmit(form);
            }
          }}
        >
          {loading ? "Analyzing..." : "Analyze Building"}
        </Button>
      </CardContent>
    </Card>
  );
}

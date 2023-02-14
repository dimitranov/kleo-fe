import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { LoadingButton } from "@mui/lab";
import { Alert } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../auth/auth";
import AppHelmet from "../../components/AppHelmet";
import { AuthService } from "../../services/authService";
import { IAuthResponseModel } from "../../types/authTypes";

export default function Login() {
  const auth = useAuth();
  const [error, setError] = useState<any>(false);
  const [loading, setLoading] = useState<any>(false);

  const { handleSubmit, register } = useForm({
    mode: "onChange",
  });

  const handleFormSubmit = async (data: any) => {
    // data.email = "g_dimitranov_test@abv.bg";
    // data.password = "anorak97";
    setLoading(true);
    try {
      const response = await AuthService.login(data);
      // MAKE THE REFRESH TOKEN WORK
      auth.saveAuth(response.data as IAuthResponseModel);
    } catch (err: any) {
      setLoading(false);
      setError(err.response);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <AppHelmet title="Wakaroo - Login" />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(handleFormSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            {...register("email")}
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            {...register("password")}
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={
              <Checkbox
                value="remember"
                color="primary"
                {...register("rememberMe")}
              />
            }
            label="Remember me"
          />
          <LoadingButton
            loading={loading}
            type="submit"
            loadingPosition="start"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </LoadingButton>
          {error && <Alert severity="error">{error.data.message}</Alert>}
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/registration" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

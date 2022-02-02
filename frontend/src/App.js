import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Container, CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.js";
import LoginPage from "./pages/LoginPage.js";
import RegisterPage from "./pages/RegisterPage.js";
import { AuthProvider, RequireAuth } from "./components/auth.js";

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

export default function MyApp() {
  const [mode, setMode] = React.useState("dark");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<h1>Home</h1>} />
                <Route
                  path="app"
                  element={
                    <RequireAuth>
                      <Navbar />
                    </RequireAuth>
                  }
                />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
              </Routes>
            </BrowserRouter>
          </Container>
        </AuthProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

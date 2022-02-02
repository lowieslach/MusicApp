import { Typography, IconButton, Modal, Box } from "@mui/material";
import {
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
} from "@mui/icons-material";
import { useContext } from "react";
import { useTheme } from "@mui/material/styles";

import { ColorModeContext } from "../App";

export default function SettingsMenu({ open, setOpen }) {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box
        sx={{
          position: "absolute",
          top: "0",
          right: "0",
          width: 300,
          height: "100vh",
          bgcolor: "background.paper",
          boxShadow: 24,
          padding: theme.spacing(2),
          color: "text.primary",
        }}
      >
        <Typography variant="h4" component="h2">
          Settings
        </Typography>
        <Box
          sx={{
            width: "100%",
            color: "text.primary",
          }}
        >
          {theme.palette.mode} mode
          <IconButton
            sx={{ ml: 1 }}
            onClick={colorMode.toggleColorMode}
            color="inherit"
          >
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
        </Box>
      </Box>
    </Modal>
  );
}

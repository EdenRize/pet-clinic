import { CircularProgress } from "@mui/material";

export const AppLoader = () => {
  return (
    <CircularProgress
      size={50}
      sx={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
      }}
    />
  );
};

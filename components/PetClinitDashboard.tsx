import { useClientsQuery } from "@/hooks/clients/useClientsQuery";
import { AppLoader } from "./AppLoader";
import { ClientsTable } from "./ClientsTable";
import { useState, useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";

enum Severity {
  ERROR = "error",
  SUCCESS = "success",
}

export const PetClinicDashboard = () => {
  const [snackbar, setSnackbar] = useState({
    msg: "",
    severity: Severity.SUCCESS,
  });
  const { data: clients, isLoading, error } = useClientsQuery();

  useEffect(() => {
    if (error) {
      setSnackbar({ msg: error.message, severity: Severity.ERROR });
    }
  }, [error]);

  if (isLoading) {
    return <AppLoader />;
  }

  return (
    <section>
      <ClientsTable clients={clients || []} />

      <Snackbar open={!!snackbar.msg}>
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.msg || "Something went wrong..."}
        </Alert>
      </Snackbar>
    </section>
  );
};

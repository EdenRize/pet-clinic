import { useClientsQuery } from "@/hooks/clients/useClientsQuery";
import { useCreateClient } from "@/hooks/clients/useCreateClient";
import { AppLoader } from "./AppLoader";
import { ClientsTable } from "./ClientsTable";
import { useState, useEffect } from "react";
import { Snackbar, Alert, Button, CircularProgress } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { IClient } from "models/clients.interface";
import { ClientModal, IClientModal } from "./ClientModal";

enum Severity {
  ERROR = "error",
  SUCCESS = "success",
}

export const PetClinicDashboard = () => {
  const [snackbar, setSnackbar] = useState({
    msg: "",
    severity: Severity.SUCCESS,
  });

  const [clientModal, setClientModal] = useState<IClientModal>({
    isOpen: false,
    client: null,
  });

  const { data: clients, isLoading, error } = useClientsQuery();
  const { isPending, mutateAsync: addClient } = useCreateClient();
  useEffect(() => {
    if (error) {
      setSnackbar({ msg: error.message, severity: Severity.ERROR });
    }
  }, [error]);

  const onOpenClientModal = (client: IClient | null) => {
    setClientModal({ isOpen: true, client: client });
  };

  const handleSubmit = async (formData: IClient) => {
    try {
      if (clientModal.client) {
        // TODO: Update client logic here
      } else {
        await addClient(formData);
        setSnackbar({
          msg: "Client created successfully",
          severity: Severity.SUCCESS,
        });
        onCloseClientModal();
      }
    } catch (error) {
      setSnackbar({ msg: "Failed to save client", severity: Severity.ERROR });
    }
  };

  const onCloseClientModal = () => {
    setClientModal({ isOpen: false, client: null });
  };

  if (isLoading) {
    return <AppLoader />;
  }

  return (
    <section>
      <div className={`${isPending && "opacity-30 pointer-events-none"}`}>
        <ClientsTable clients={clients || []} />

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => onOpenClientModal(null)}
        >
          Add new client
        </Button>

        <Snackbar
          open={!!snackbar.msg}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ msg: "", severity: Severity.SUCCESS })}
        >
          <Alert
            severity={snackbar.severity}
            sx={{ width: "100%" }}
            onClose={() => setSnackbar({ msg: "", severity: Severity.SUCCESS })}
          >
            {snackbar.msg || "Something went wrong..."}
          </Alert>
        </Snackbar>

        <ClientModal
          {...clientModal}
          onSubmit={handleSubmit}
          onClose={onCloseClientModal}
        />
      </div>

      {isPending && <AppLoader />}
    </section>
  );
};

import { ClientsTable } from "./ClientsTable";
import { useClients } from "../hooks/useClients";
import { AppLoader } from "./AppLoader";

export const PetClinicDashboard = () => {
  const { data: clients, isLoading, error } = useClients();

  if (isLoading) {
    return <AppLoader />;
  }

  if (error) {
    return <div>Error loading clients: {error.message}</div>;
  }

  return (
    <section>
      <ClientsTable clients={clients || []} />
    </section>
  );
};

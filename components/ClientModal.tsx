import { Button, Modal, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { IClient } from "models/clients.interface";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { PetType } from "models/pet-type.enum";
import { PetTypeSelect } from "./common/PetTypeSelect";

interface IClientModalTitleProps {
  client: IClient | null;
}

interface IClientModalInputFieldsProps {
  client: IClient | null;
  formData: IClient;
  setFormData: (data: IClient) => void;
}

interface IClientModalActionsProps {
  client: IClient | null;
  onClose?: () => void;
  onSubmit?: () => void;
}

export interface IClientModal {
  isOpen: boolean;
  client: IClient | null;
}

interface IClientModalProps extends IClientModal {
  onClose: () => void;
  onSubmit: (client: IClient) => void;
}

export const ClientModal = ({
  isOpen,
  client,
  onClose,
  onSubmit,
}: IClientModalProps) => {
  const [formData, setFormData] = useState<IClient>({
    name: client?.name || "",
    phone: client?.phone || "",
    petName: client?.petName || "",
    petAge: client?.petAge || 0,
    petType: client?.petType || PetType.DOG,
  });

  useEffect(() => {
    initFormData();
  }, [isOpen, client]);

  const handleOnClose = () => {
    initFormData();
    onClose();
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const initFormData = () => {
    setFormData({
      name: client?.name || "",
      phone: client?.phone || "",
      petName: client?.petName || "",
      petAge: client?.petAge || 0,
      petType: client?.petType || PetType.DOG,
    });
  };

  return (
    <Modal open={isOpen} onClose={handleOnClose}>
      <div className="fixed flex flex-col gap-4 bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  p-6 rounded-lg shadow-xl min-w-[400px]">
        <ClientModalTitle client={client} />
        <ClientModalInputFields
          client={client}
          formData={formData}
          setFormData={setFormData}
        />
        <ClientModalActions
          onClose={handleOnClose}
          onSubmit={handleSubmit}
          client={client}
        />
      </div>
    </Modal>
  );
};

const ClientModalTitle = ({ client }: IClientModalTitleProps) => {
  if (client) {
    return (
      <div className={"flex items-center justify-between"}>
        <div className="flex items-center gap-2">
          <EditIcon />
          <p>Edit client</p>
        </div>
        <DeleteIcon />
      </div>
    );
  }
  return (
    <div className={"flex items-center gap-2"}>
      <AddIcon />
      <p>Add client</p>
    </div>
  );
};

const ClientModalInputFields = ({
  formData,
  setFormData,
}: IClientModalInputFieldsProps) => {
  return (
    <div className="flex flex-col gap-4 mt-4">
      <TextField
        label="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <TextField
        label="Phone"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
      />
      <TextField
        label="Pet Name"
        value={formData.petName}
        onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
      />
      <TextField
        label="Age"
        type="number"
        value={formData.petAge}
        onChange={(e) =>
          setFormData({ ...formData, petAge: parseInt(e.target.value) || 0 })
        }
      />
      <PetTypeSelect
        value={formData.petType}
        onSelect={(value) => setFormData({ ...formData, petType: value })}
      />
    </div>
  );
};

const ClientModalActions = ({
  client,
  onClose,
  onSubmit,
}: IClientModalActionsProps) => {
  return (
    <div className="flex items-center gap-4 justify-end">
      <Button onClick={onClose} variant="text" color="secondary">
        Close
      </Button>
      <Button onClick={onSubmit} variant="contained" color="primary">
        {client ? "Update Client" : "Add Client"}
      </Button>
    </div>
  );
};

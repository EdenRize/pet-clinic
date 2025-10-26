import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import { PetType } from "../../models/pet-type.enum";

interface PetTypeSelectProps {
  value?: PetType;
  onSelect: (value: PetType) => void;
  label?: string;
}

export const PetTypeSelect = ({
  value,
  onSelect,
  label = "Pet Type",
}: PetTypeSelectProps) => {
  const handleChange = (event: SelectChangeEvent<PetType>) => {
    onSelect(event.target.value as PetType);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select value={value || ""} label={label} onChange={handleChange}>
        {Object.entries(PetType).map(([key, petType]) => (
          <MenuItem key={key} value={petType}>
            {petType}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

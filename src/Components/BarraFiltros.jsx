
import {
  Paper,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  // Checkbox,
  ListItemText,
  Button,
  IconButton,
  InputAdornment,
  Chip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import React from "react";

const categorias = [
  "Flores",
  "Suculentas",
  "Violetas",
  "Cactus",
  "Macetas decorativas"
];

const BarraFiltros = () => {
  return (
    <Paper elevation={3} sx={{ p: 2, mt: 5, mb: 3 }} className="!bg-[#B08968] !text-white">
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        alignItems={{ md: "center" }}
        flexWrap="wrap"
        gap={2}
      >
        {/* Buscar */}
        <TextField
          label="Buscar"
          variant="outlined"
          size="small"
          value=""
          sx={{
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#DDB892",
      },
      "&:hover fieldset": {
        borderColor: "#E6CCB2",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#E6CCB2",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#fff",
    },
    "& label.Mui-focused": {
      color: "#fff",
    },
    color: "#fff",
  }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Categorías con checkboxes */}
        <FormControl sx={{ minWidth: 250 }} size="small">
  <InputLabel
    sx={{
      color: "#fff",
      "&.Mui-focused": { color: "#fff" }, // color del label en focus
    }}
  >
    Categoría
  </InputLabel>

  <Select
    label="Categoría"
    value=""
    onChange={() => {}}
    input={<OutlinedInput label="Categoría" />}
    sx={{
      backgroundColor: "#B08968", // fondo del select
      color: "#fff",              // texto del select
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#DDB892",   // borde normal
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "#E6CCB2",   // borde hover
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#E6CCB2",   // borde focus
      },
      "& .MuiSelect-icon": {
        color: "#fff", // ícono de flecha
      },
    }}
  >
    {categorias.map((cat) => (
      <MenuItem key={cat} value={cat}>
        {cat}
      </MenuItem>
    ))}
  </Select>
</FormControl>



        {/* Chips estáticos  */}
        <Box
          display="flex"
          flexWrap="wrap"
          gap={1}
          sx={{ flex: "1 1 auto", justifyContent: { xs: "flex-start", md: "flex-start" } }}
        >
          {["Suculentas", "Cactus","Macetas","Plantas de interior","Ofertas"].map((categoria) => (
            <Chip
              className="!bg-[#6A994E] !text-white font-bold"
              key={categoria}
              label={categoria}
              size="small"
              onDelete={() => {}}
            />
          ))}
        </Box>

        {/* Botones */}
        <Box display="flex" gap={1}>
          <Button
            variant="contained"
            className="!bg-[#DDB892] !font-bold !text-green-700 hover:!bg-[#C89F77] hover:!text-[#386641]"
            size="small"
          >
            Aplicar
          </Button>
          <Button
            variant="contained"
            size="small"
            startIcon={<ClearIcon />}
            className="!bg-[#6A994E]  hover:!bg-[#F0E6DA] hover:!text-black !text-white !font-bold"
            
          >
            Limpiar
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default BarraFiltros;


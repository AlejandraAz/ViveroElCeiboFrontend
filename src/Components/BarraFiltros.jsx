
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
import React, { useState, useEffect } from "react";
import api from "../Services/Api.js";
import SearchProducts from "./SearchProducts.jsx";




const BarraFiltros = ({ onSearch }) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState([]);
  const [categories, setCategories] = useState([]);

  const handlerSearch = () => {
    onSearch({
      name: search,
      category
    })
  }

  const cleanSearch = () => {
    setCategory([]);
    onSearch({ name: search, category: "" });
  }

  const fetchCategory = async () => {
    try {
      const res = await api.get('/api/categories');
      setCategories(res.data.categories)
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }
  useEffect(() => {
    fetchCategory()
  }, []);

  return (
    <Paper elevation={3} sx={{ p: 2, mt: 5, mb: 3 }} className="!bg-[#B08968] !text-white">
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        alignItems={{ md: "center" }}
        flexWrap="wrap"
        gap={2}
      >
        <SearchProducts/>

        {/* Categorías con checkboxes */}
        <FormControl sx={{ width:'100%', maxWidth:400 }} size="small">
          <InputLabel
            sx={{
              color: "#fff",
              "&.Mui-focused": { color: "#fff" }, // color del label en focus
            }}
          >
            Categoría
          </InputLabel>

          <Select
            multiple
            label="Categoría"
            value={category}
            onChange={(e) => { setCategory(e.target.value) }}
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
            {Array.isArray(categories) && categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.name}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>



        <Box
          display="flex"
          flexWrap="wrap"
          gap={1}
          sx={{ flex: "1 1 auto", justifyContent: { xs: "flex-start", md: "flex-start" } }}
        >
          {Array.isArray(category) && category.map((cat) => (
            <Chip key={cat.id} label={cat} 
              onDelete={() => {
                const newCategories = category.filter(c => c !== cat);
                setCategory(newCategories);
                onSearch({ name: search, category: newCategories });
              }}
              className="!bg-[#6A994E] !text-white font-bold"
            />
          ))}

        </Box>

        {/* Botones */}
        <Box display="flex" gap={1}>
          <Button
            variant="contained"
            onClick={handlerSearch}
            className="!bg-[#DDB892] !font-bold !text-green-700 hover:!bg-[#C89F77] hover:!text-[#386641]"
            size="small"
          >
            Aplicar
          </Button>
          <Button
            variant="contained"
            onClick={cleanSearch}
            size="small"
            startIcon={<ClearIcon />}
            className="!bg-[#6A994E]  hover:!bg-[#F0E6DA] hover:!text-black !text-white !font-bold"

          >
            Restablecer filtros
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default BarraFiltros;


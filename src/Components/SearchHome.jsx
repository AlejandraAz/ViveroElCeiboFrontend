// SearchHome.jsx

import {
  Paper,
  Box,
  TextField,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  Button,
  Typography
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Services/Api";

let debounceTimer;

const SearchHome = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      if (value.trim().length > 1) {
        fetchSearchResults(value);
      } else {
        setResults([]);
      }
    }, 400);
  };

  const fetchSearchResults = async (query) => {
    setSearching(true);
    try {
      const res = await api.get("/products/search", { params: { search: query } });
      setResults(res.data.products || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setResults([]);
    } finally {
      setSearching(false);
    }
  };

  const handleViewMore = () => {
    navigate(`/buscar?query=${search}`);
  };

  return (
    <Paper elevation={3} sx={{ p: 2, mt: 5, mb: 3 }} className="!bg-[#B08968] !text-white">
      <Box sx={{ maxWidth: 600, mx: "auto" }}>
        <TextField
          label="Buscar productos"
          variant="outlined"
          fullWidth
          size="small"
          value={search}
          onChange={handleInputChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon sx={{ color: "#3E3E3E" }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          InputLabelProps={{ sx: { color: "#fff", "&.Mui-focused": { color: "#fff" } } }}
          sx={{
            backgroundColor: "#B08968",
            color: "#fff",
            "& .MuiOutlinedInput-root": {
              color: "#fff",
              "& fieldset": { borderColor: "#DDB892" },
              "&:hover fieldset": { borderColor: "#E6CCB2" },
              "&.Mui-focused fieldset": { borderColor: "#E6CCB2" },
            },
          }}
        />

        {/* Contenedor de resultados */}
        {search.length > 1 && (
          <Paper elevation={2} sx={{ mt: 2, p: 1 }}>
            {searching ? (
              <Typography variant="body2" sx={{ textAlign: 'center', p: 2 }}>
                Buscando...
              </Typography>
            ) : results.length === 0 ? (
              <Typography variant="body2" sx={{ textAlign: 'center', p: 2 }}>
                No se encontraron resultados.
              </Typography>
            ) : (
              <>
                <List dense>
                  {results.slice(0, 5).map((product) => (
                    <ListItem
                      key={product.id}
                      button
                      onClick={() => navigate(`/product/${product.id}`)}
                      alignItems="flex-start"
                    >
                      <ListItemAvatar>
                        <Avatar
                          variant="square"
                          src={product.images?.[0]?.url || "/placeholder.jpg"}
                          alt={product.name}
                          sx={{ width: 64, height: 64, mr: 2 }}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={product.name}
                        secondary={`$${product.price}`}
                      />
                      <span className="text-xl font-bold text-[#6A994E]">{'>'}</span>
                    </ListItem>
                  ))}
                </List>
                <Divider sx={{ my: 1 }} />
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleViewMore}
                  sx={{
                    backgroundColor: "#6A994E",
                    fontWeight: "bold",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#52734D",
                      color: "#fff"
                    }
                  }}
                >
                  Ver más resultados
                </Button>
              </>
            )}
          </Paper>
        )}
      </Box>
    </Paper>
  );
};

export default SearchHome;

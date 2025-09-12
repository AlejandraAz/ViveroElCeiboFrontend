import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Rating,
  Chip,
  IconButton,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import productos from "../data/productos.js";
import { AlignCenter } from "lucide-react";


const Tarjetas = () => {
  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      {/* Contenedor con Grid (12 columnas por fila) */}
      <Typography variant="h4" sx={{ mt: 3, mb: 4,textAlign:'center', fontWeight: 'bold', color: '#6A994E' }}>
        Ofertas
      </Typography>
      <Grid container spacing={3} justifyContent="center" alignItems="stretch">
        {productos.map((item, index) => (
          <Grid
            item
            xs={12}     // ocupa 12 columnas en mobile = 100% ancho
            sm={6}      // ocupa 6 columnas en tablet = 50%
            md={4}      // ocupa 4 columnas en desktop = 33%
            key={index}
            sx={{ display: "flex", height: "100%" }}
          >
            <Card
              sx={{
                width:"100%",
                borderRadius: 2,
                backgroundColor: "#FFF8F0",
                boxShadow: 3,
                height: "100%", // hace que las cards sean igual de altas
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardMedia
                component="img"
                image={item.img}
                alt={item.nombre}
                sx={{
                     height: 200,              // fuerza que todas las imágenes midan lo mismo
                     objectFit: "cover",        // recorta pero no deforma
                    }}
              />

              <CardContent sx={{ flexGrow: 1 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "#6A994E" }}
                  >
                    {item.nombre}
                  </Typography>
                  <Chip
                    label={item.categoria}
                    sx={{
                      backgroundColor: "#B08968",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "0.75rem"
                    }}
                    size="small"
                  />
                </Box>

                <Typography variant="body2" sx={{ color: "#8D6E63", mt: 1 }}>
                  Precio: {item.precio}
                </Typography>

                <Rating value={item.rating} readOnly size="small" sx={{ mt: 1 }} />
              </CardContent>

              <CardActions sx={{ justifyContent: "space-between", px: 2 }}>
                <Button
                  variant="contained"
                  className="!bg-[#DDB892] !text-green-700 font-bold"
                  size="small"
                >
                  agregar al carrito
                </Button>
                <IconButton>
                  <FavoriteBorderIcon sx={{ color: "#B08968" }} />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Tarjetas;

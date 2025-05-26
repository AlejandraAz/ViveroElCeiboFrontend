import { Box, Container, Typography, Button } from "@mui/material";
import heroBg from "../assets/ImgsCarrousel/suculentas.png"; // Ruta a tu imagen de fondo

const HeroOverlay = () => {
  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: "70vh", md: "90vh" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `linear-gradient(rgba(176, 137, 104, 0.6), rgba(106, 153, 78, 0.6)), url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        textAlign: "center",
      }}
    >
      <Container>
        <Typography
          variant="h2"
          sx={{ fontWeight: "bold", mb: 2 ,fontSize:{xs:'2rem',sm:'2.5rem',md: "5rem",}}}>
          Plantas que inspiran
        </Typography>

        <Typography
          variant="h6"
          sx={{ mb: 4 }}
        >
          Ambientá tu hogar con naturaleza y diseño. Explorá nuestra colección exclusiva.
        </Typography>

        <Box display="flex" justifyContent="center" gap={2} flexWrap="wrap">
          <Button
            variant="contained"
            className="!bg-[#DDB892] !text-green-800 font-bold"
            size="large"
            sx={{
              "&:hover": { backgroundColor: "#C49A77" },
            }}
          >
            Ver productos
          </Button>

          <Button
            variant="outlined"
            sx={{
              color: "#fff",
              borderColor: "#fff",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.1)",
                borderColor: "#fff",
              },
            }}
          >
            Conocé más
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroOverlay;

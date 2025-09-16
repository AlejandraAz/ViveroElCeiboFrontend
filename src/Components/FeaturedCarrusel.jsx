import { useEffect, useState } from "react"; 
import api from '../Services/Api.js';
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    Button,
    Rating,
    Chip,
    Box,
} from "@mui/material";

const FeaturedCarousel = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const res = await api.get("/products/featured");
                setFeaturedProducts(Array.isArray(res.data?.data) ? res.data.data : []);
                console.log("respuesta de destacados:", res.data);
            } catch (err) {
                console.error("Error al cargar productos destacados", err);
            }
        };

        fetchFeatured();
    }, []);

    if (!featuredProducts.length) return null;

    return (
        <Box sx={{ px: { xs: 2, md: 4 }, py: 4, mb: 5, overflow: "visible" }}>
            <div className="text-center my-8">
                <h2 className="text-4xl font-bold text-[#6A994E] relative inline-block">
                    Ofertas Especiales
                    <span className="block h-[4px] w-40 bg-[#6A994E] mx-auto mt-3 rounded-full"></span>
                </h2>
            </div>

            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                navigation
                pagination={{ clickable: true }}
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                    },
                    600: {
                        slidesPerView: 1.2,
                    },
                    768: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 4,
                    },
                }}
            >
                {featuredProducts.map((item) => {
                    // 🔽 Usa la imagen principal si existe
                    const mainImage = item.images?.find(img => img.is_main) || item.images?.[0];

                    return (
                        <SwiperSlide key={item.id}>
                            <Card
                                onClick={() => navigate(`/product/${item.id}`)}
                                sx={{
                                    borderRadius: 2,
                                    backgroundColor: "#FFF8F0",
                                    boxShadow: 3,
                                    display: "flex",
                                    flexDirection: "column",
                                    height: "100%",
                                    cursor: "pointer",
                                    transition: "0.3s",
                                    "&:hover": {
                                        boxShadow: 6,
                                    },
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    sx={{
                                        height: 200,
                                        objectFit: "cover",
                                    }}
                                    image={mainImage?.url || "/placeholder.jpg"}
                                    alt={item.name}
                                />

                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Box
                                        display="flex"
                                        justifyContent="space-between"
                                        alignItems="center"
                                    >
                                        <Typography
                                            variant="h6"
                                            sx={{ fontWeight: "bold", color: "#6A994E" }}
                                        >
                                            {item.name}
                                        </Typography>
                                        <Chip
                                            label="Oferta"
                                            size="small"
                                            sx={{
                                                backgroundColor: "#B08968",
                                                color: "white",
                                                fontWeight: "bold",
                                                fontSize: "0.75rem",
                                            }}
                                        />
                                    </Box>

                                    <Typography variant="body2" sx={{ color: "#8D6E63", mt: 1 }}>
                                        ${item.price}
                                    </Typography>

                                    <Rating
                                        value={item.rating || 4}
                                        readOnly
                                        size="small"
                                        sx={{ mt: 1 }}
                                    />
                                </CardContent>

                                <CardActions sx={{ justifyContent: "space-between", px: 2 }}>
                                    <Button
                                        variant="contained"
                                        className="!bg-[#DDB892] !text-green-700 font-bold"
                                        size="small"
                                        onClick={(e) => {
                                            e.stopPropagation(); // evita que se dispare el onClick de la Card
                                            console.log("Agregar al carrito:", item.name);
                                        }}
                                    >
                                        Agregar al carrito
                                    </Button>
                                </CardActions>
                            </Card>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </Box>
    );
};

export default FeaturedCarousel;

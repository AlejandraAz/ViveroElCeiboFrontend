// components/FeaturedCarousel.jsx
import { useEffect, useState } from "react";
import api from '../Services/Api.js';
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
        <Box sx={{ px: { xs: 2, md: 4 }, py: 4 ,mb:5,overflow: "visible" }}>
            <Typography
                variant="h4"
                sx={{ fontWeight: "bold", color: "#6A994E", mb: 4 ,textAlign:"center"}}
            >
                OFERTAS
            </Typography>

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
                {featuredProducts.map((item) => (
                    <SwiperSlide key={item.id}>
                        <Card
                            sx={{
                                borderRadius: 2,
                                backgroundColor: "#FFF8F0",
                                boxShadow: 3,
                                display: "flex",
                                flexDirection: "column",
                                height: "100%",
                                // height: 400,
                            }}
                        >
                            <CardMedia
                                component="img"
                                sx={{
                                height: 200,
                                objectFit: "cover",
                                }}
                                image={item.images?.[0]?.url || "/placeholder.jpg"}
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
                                >
                                    Agregar al carrito
                                </Button>
                            </CardActions>
                        </Card>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    );
};

export default FeaturedCarousel;

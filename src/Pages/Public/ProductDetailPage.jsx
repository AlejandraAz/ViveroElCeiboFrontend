import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    Box,
    Typography,
    Grid,
    Button,
    Paper,
    CircularProgress
} from "@mui/material";
import api from "../../Services/Api.js";

const ProductDetailPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [mainImage, setMainImage] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const res = await api.get(`/products/${id}`);
            setProduct(res.data.product);
            const mainImg =
                res.data.product.images?.find(img => img.is_main)?.url ||
                res.data.product.images?.[0]?.url ||
                "/placeholder.jpg";
            setMainImage(mainImg);
        } catch (err) {
            console.error("Error al obtener producto:", err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!product) {
        return <Typography variant="h6" color="error">Producto no encontrado</Typography>;
    }

    return (
        <Box sx={{ maxWidth: 1200, mx: "auto", my: 5, px: 2 }}>
            <Grid container spacing={4}>
                {/* Imágenes */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <img
                            src={mainImage}
                            alt={product.name}
                            style={{ width: "100%", maxHeight: 500, objectFit: "contain" }}
                        />
                        <Box sx={{ display: "flex", mt: 2, gap: 1 }}>
                            {product.images?.map((img, i) => (
                                <img
                                    key={i}
                                    src={img.url}
                                    alt={`thumb-${i}`}
                                    onClick={() => setMainImage(img.url)}
                                    style={{
                                        width: 60,
                                        height: 60,
                                        objectFit: "cover",
                                        border: mainImage === img.url ? "2px solid #6A994E" : "1px solid #ccc",
                                        cursor: "pointer",
                                        borderRadius: 4
                                    }}
                                />
                            ))}
                        </Box>
                    </Paper>
                </Grid>

                {/* Info del producto */}
                <Grid item xs={12} md={6}>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant="h5" color="green" gutterBottom>
                        ${product.price}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        {product.description}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        Categoría: {product.category?.name || "Sin categoría"}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ mb: 2 }}>
                        Stock disponible: {product.stock}
                    </Typography>

                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#6A994E",
                            "&:hover": { backgroundColor: "#52734D" }
                        }}
                    >
                        Agregar al carrito
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ProductDetailPage;

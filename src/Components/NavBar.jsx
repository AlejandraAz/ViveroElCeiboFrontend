import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
// import AdbIcon from '@mui/icons-material/Adb';
import logoElCeibo from '../assets//Logos/elceibologo2-removebg-preview.png';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, User, ShoppingCart, ClipboardList } from 'lucide-react';


const pages = ["Inicio", "Productos", "Ofertas", "Nosotros", "Contacto"];
// const settings = ["Perfil", "Mis compras", "Cerrar sesión"];

function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);

  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleLogout = () => {
    logout();
  if (user?.rol === "admin") {
    navigate("/login");
  } else {
    navigate("/");  // cliente o visitante
  }
  };


  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#6A994E", top: 0 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          {/* LOGO + NAVEGACIÓN (desktop) */}
          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
            <Box component="a" href="#" sx={{ display: "flex", alignItems: "center", mr: 2 }}>
              <Box
                component="img"
                src={logoElCeibo}
                alt="logo"
                sx={{ height: 90 }}
              />
            </Box>

            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ color: "white", textTransform: "none", fontWeight: "bold",fontSize: "18px", ml: 1 }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* LOGO + MENU HAMBURGUESA (mobile) */}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              alignItems: "center",
              flexGrow: 1,
            }}
          >
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Box component="a" href="#" sx={{ ml: 2 }}>
              <Box
                component="img"
                src={logoElCeibo}
                alt="logo"
                sx={{ height: 40 }}
              />
            </Box>

            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* CARRITO + USUARIO */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Tooltip title="Ver carrito" componentsProps={{
              tooltip: {
                sx: {
                  backgroundColor: '#C1A35D',
                  color: '#333',
                  fontSize: '14px',
                  border: '1px solid #ccc',
                  boxShadow: 3,
                }
              }
            }}>
              <IconButton color="inherit" onClick={() => {
                if (user && user.rol === "cliente") {
                  console.log("Navegando al carrito")
                  navigate('/customer/cart');
                } else {
                  navigate('/login');
                }
              }}>
                <ShoppingCartIcon sx={{ fontSize: { xs: 24, md: 30 } }}  />
              </IconButton>
            </Tooltip>

           
              {user ? (
            
                 <Tooltip title="Abrir configuracion" componentsProps={{
              tooltip: {
                sx: {
                  backgroundColor: '#C1A35D',
                  color: '#333',
                  fontSize: '14px',
                  border: '1px solid #ccc',
                  boxShadow: 3,
                }
              }
            }}>
                  <IconButton onClick={handleOpenUserMenu}>
                    <Avatar className='font-bold' src={user?.photo || null} sx={{ bgcolor: '#C1A35D' ,width: 47,height: 47,fontSize: 22 }}>
                      {!user?.photo && (user?.name?.charAt(0).toUpperCase() || 'U')}
                    </Avatar>
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Iniciar sesión" componentsProps={{
              tooltip: {
                sx: {
                  backgroundColor: '#C1A35D',
                  color: '#333',
                  fontSize: '14px',
                  border: '1px solid #ccc',
                  boxShadow: 3,
                }
              }
            }}>
                  <IconButton onClick={() => navigate('/login')}>
                    <Avatar sx={{ bgcolor: '#C1A35D' }} />
                  </IconButton>
                </Tooltip>
              )}



            <Menu
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
         {!user && (
    <MenuItem
      onClick={() => {
        handleCloseUserMenu();
        navigate("/login");
      }}
    >
      <Typography textAlign="center">Iniciar sesión</Typography>
    </MenuItem>
  )}

  {/* Cliente */}
  {user?.rol === "cliente" && (
    <>
      <MenuItem
        onClick={() => {
          handleCloseUserMenu();
          navigate("/customer/profile");
        }}
      >
        <Typography textAlign="center">Mi perfil</Typography>
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleCloseUserMenu();
          navigate("/customer/orders");
        }}
      >
        <Typography textAlign="center">Mis compras</Typography>
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleCloseUserMenu();
          handleLogout(); // Redirigir al home
        }}
      >
        <Typography textAlign="center">Cerrar sesión</Typography>
      </MenuItem>
    </>
  )}

  {/* Admin */}
  {user?.rol === "admin" && (
    <>
      <MenuItem
        onClick={() => {
          handleCloseUserMenu();
          navigate("/admin/dashboard");
        }}
      >
        <Typography textAlign="center">Panel admin</Typography>
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleCloseUserMenu();
          handleLogout("/login"); // Redirigir a login
        }}
      >
        <Typography textAlign="center">Cerrar sesión</Typography>
      </MenuItem>
    </>
  )}

            </Menu>

          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;

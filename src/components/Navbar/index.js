import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import MenuItem from '@mui/material/MenuItem';
import DnsIcon from '@mui/icons-material/Dns';

const API_URL=process.env.REACT_APP_API_URL;

export default function Navbar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    var [zones, setZones] = React.useState([]);

    function fetchZones() {
        fetch(`${API_URL}/domain/zone`)
        .then(response => response.json())
        .then(data => {
            data.sort();
            setZones(data);
        });
    }

    React.useEffect(() => {
        fetchZones();
    }, []);

    return (
        <AppBar position="sticky">
        <Container maxWidth="xl">
            <Toolbar disableGutters>
                <DnsIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontWeight: 700,
                        letterSpacing: '.1rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    OVH React Interface
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {zones.map((zone) => (
                        <Link href={`/${zone}`} key={zone} underline="none" color="inherit" sx={{ mr: 2 }}>{zone}</Link>
                    ))}
                </Box>
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                        size="large"
                        aria-label="List of zones"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                        }}
                    >
                    {zones.map((zone) => (
                        <MenuItem key={zone} onClick={handleCloseNavMenu}>
                            <Link href={`/${zone}`} key={zone} underline="none" color="inherit" sx={{ mr: 2 }}>{zone}</Link>
                        </MenuItem>
                    ))}
                    </Menu>
                </Box>
                <DnsIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                        fontWeight: 700,
                        letterSpacing: '.1rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    OVH React Interface
                </Typography>
            </Toolbar>
        </Container>
        </AppBar>
    );
}

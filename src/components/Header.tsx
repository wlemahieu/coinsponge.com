import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import startCase from 'lodash/startCase';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import logo from '@assets/android-chrome-512x512.png';
import Navigation from '@components/Navigation';
import useGetTabs from '@src/hooks/useGetTabs';
import Alert from '@mui/material/Alert';

const Header: FC = () => {
  const [alertVisible, setAlertVisible] = useState(true);
  const navigate = useNavigate();
  const [visibleTabs, visibleKey, handleChange] = useGetTabs();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const onClickMenuItem = (e: any) => {
    handleCloseNavMenu();
    handleChange(e);
  };

  const onCloseAlert = () => setAlertVisible(false);

  return (
    <Container maxWidth="md">
      <AppBar component="nav" position="static" sx={{ p: 0, m: 0, mb: 3 }} color="transparent" elevation={0}>
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', cursor: 'pointer' }} onClick={() => navigate('/')}>
            <Avatar sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} src={logo} />
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                mt: 1,
                display: { xs: 'none', md: 'flex' },
                fontWeight: 700,
                letterSpacing: '.2rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              CoinSponge
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
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
              variant="selectedMenu"
            >
              {visibleTabs.map((tab, idx) => (
                <MenuItem key={`key-${idx}`} onClick={onClickMenuItem} selected={idx === visibleKey}>
                  <Typography textAlign="center" id={tab.name}>
                    {startCase(tab.name)}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 500,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            coinsponge.com
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, textAlign: 'center' }}>
            <Navigation />
          </Box>
        </Toolbar>
      </AppBar>

      {alertVisible ? (
        <Alert color="info" onClose={onCloseAlert}>
          Please check back soon! Thank you for your patience as we backfill data.
        </Alert>
      ) : null}
    </Container>
  );
};

export default Header;

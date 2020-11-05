import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon
} from 'react-feather';
import NavItem from './NavItem';
import InputIcon from '@material-ui/icons/Input';
import ArchiveIcon from '@material-ui/icons/Archive';

const user_default = {
  avatar: '/static/images/avatars/avatar_12.png'
};

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({ onMobileClose, openMobile, logout, user }) => {
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const items = [
    {
      href: '/admin/dashboard',
      icon: BarChartIcon,
      title: 'Dashboard',
      perm: user.is_superuser || user.is_admin
    },
    {
      href: '/admin/users',
      icon: UsersIcon,
      title: 'Usuarios',
      perm: user.is_superuser || user.is_admin
    },
    // {
    //   href: '/admin/reports',
    //   icon: ShoppingBagIcon,
    //   title: 'Reportes',
    //   perm:
    //     user.is_superuser ||
    //     user.is_admin ||
    //     user.is_report_maker ||
    //     user.is_report_viewer
    // },
    {
      href: '/admin/sources/1',
      icon: ShoppingBagIcon,
      title: 'Fuentes',
      perm:
        user.is_superuser ||
        user.is_admin ||
        user.is_report_maker ||
        user.is_sniffer
    },
    {
      href: '/admin/entries/1',
      icon: ArchiveIcon,
      title: 'Entradas',
      perm:
        user.is_superuser ||
        user.is_admin ||
        user.is_report_maker ||
        user.is_sniffer
    },
    // {
    //   href: '/admin/settings',
    //   icon: SettingsIcon,
    //   title: 'Settings',
    //   perm: user.is_superuser || user.is_admin
    // },
    // {
    //   href: '/admin/error404',
    //   icon: AlertCircleIcon,
    //   title: 'Error',
    //   perm: true
    // },
    {
      href: '/admin/account',
      icon: UserIcon,
      title: 'Account',
      perm: user.token !== null
    }
  ];
  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={user_default.avatar}
          to="/admin/account"
        />
        <Typography className={classes.name} color="textPrimary" variant="h5">
          {user === undefined
            ? 'loading'
            : `${user.first_name} ${user.last_name}`}
        </Typography>
        {/* <Typography color="textSecondary" variant="body2">
          {user.jobTitle}
        </Typography> */}
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map(
            item =>
              item.perm && (
                <NavItem
                  href={item.href}
                  key={item.title}
                  title={item.title}
                  icon={item.icon}
                />
              )
          )}
          <NavItem
            href="/auth"
            title="Salir"
            icon={InputIcon}
            onClick={e => {
              e.preventDefault();
              logout();
            }}
          />
        </List>
      </Box>
      <Box flexGrow={1} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
  logout: PropTypes.func,
  user: PropTypes.object
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default NavBar;

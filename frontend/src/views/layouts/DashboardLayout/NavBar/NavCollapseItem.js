import React, { useState } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Button,
  ListItem,
  makeStyles,
  Collapse,
  List
} from '@material-ui/core';
import NavItem from './NavItem';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightMedium,
    justifyContent: 'flex-start',
    letterSpacing: 0,
    padding: '10px 8px',
    textTransform: 'none',
    width: '100%'
  },
  icon: {
    marginRight: theme.spacing(1)
  },
  title: {
    marginRight: 'auto'
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

const NavCollapseItem = ({ className, items, icon: Icon, title, ...rest }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  console.log(items);

  return (
    <div>
      <ListItem
        className={clsx(classes.item, className)}
        disableGutters
        {...rest}
      >
        <Button className={classes.button} onClick={handleClick}>
          {Icon && <Icon className={classes.icon} size="20" />}
          <span className={classes.title}>{title}</span>
          {open ? <ExpandLess /> : <ExpandMore />}
        </Button>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {items.map(
            item =>
              item.perm && (
                <NavItem
                  className={classes.nested}
                  href={item.href}
                  key={item.title}
                  title={item.title}
                  icon={item.icon}
                />
              )
          )}
        </List>
      </Collapse>
    </div>
  );
};

NavCollapseItem.propTypes = {
  className: PropTypes.string,
  items: PropTypes.array,
  icon: PropTypes.elementType,
  title: PropTypes.string
};

export default NavCollapseItem;

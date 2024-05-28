import React, { ReactNode } from 'react';
import { NavLink, NavLinkProps, useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import s from './Buttons.module.css';

interface SecondaryButtonProps extends NavLinkProps {
  children: ReactNode;
  link: string;
  clickHandler?: () => void;
}

function SecondaryButton({ children, link, clickHandler = undefined, ...rest }: SecondaryButtonProps) {
  const location = useLocation();
  const isActive = location.pathname === link;

  return (
    <Button variant="dark">
      <NavLink to={rest.to} className={`${s.navLink} ${isActive ? s.active : ''}`} onClick={clickHandler}>
        {children}
      </NavLink>
    </Button>
  );
}

export default SecondaryButton;

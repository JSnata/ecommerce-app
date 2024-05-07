import React from 'react';
import SecondaryButton from '../../ui/Buttons/SecondaryButton';
import styles from './MainHeader.module.css';

function MainHeader() {
  return (
    <div className={styles.main_header}>
      <SecondaryButton to="/login" link="/login">
        Login
      </SecondaryButton>
      <SecondaryButton to="/register" link="/register">
        Sign up
      </SecondaryButton>
    </div>
  );
}

export default MainHeader;

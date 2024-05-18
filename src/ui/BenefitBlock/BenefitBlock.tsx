import React from 'react';
import styles from './BenefitBlock.module.css';

interface BenefitBlockProps {
  children: React.ReactNode[];
}

function BenefitBlock(props: BenefitBlockProps) {
  const { children } = props;
  return (
    <div className={styles.container}>
      <h1>BenefitBlock</h1>
      {...children}
    </div>
  );
}

export default BenefitBlock;

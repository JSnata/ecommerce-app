import React, { useEffect, useState } from 'react';
import styles from './BenefitBlock.module.css';
import useWindowResize from '../../hooks/useWindowResize';

interface BenefitBlockProps {
  label: string;
  description: string;
}

function BenefitBlock(props: BenefitBlockProps) {
  const [isSticky, setIsSticky] = useState(false);
  const width = useWindowResize();

  useEffect(() => {
    if (width && width >= 769) {
      const handleScroll = () => {
        // TODO need test this
        const stickyEndPoint = window.innerHeight;
        const scrollToTop = window.scrollY;
        console.log(stickyEndPoint, scrollToTop);
        if (scrollToTop >= stickyEndPoint) {
          setIsSticky(false);
        } else {
          setIsSticky(true);
        }
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
    return () => null;
  }, [width]);

  const { label, description } = props;
  return (
    <div className={`${styles.container} ${isSticky ? 'sticky-top' : ''} ${width <= 768 ? 'fullHeight' : ''}`}>
      <h1 className="display-1">{label}</h1>
      <p className="lead">{description}</p>
    </div>
  );
}
export default BenefitBlock;

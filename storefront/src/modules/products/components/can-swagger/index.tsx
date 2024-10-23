import React from 'react';
import styles from './CanSwagger.module.css';  // Importa il modulo CSS per gli altri stili

interface CanSwaggerProps {
  imageUrl: string;
}

const bgUrlComposer = (imgUrl : string) => {
  return "url(/can.png) repeat-x, url(/can.png)";
}


const CanSwagger: React.FC<CanSwaggerProps> = ({ imageUrl }) => {
  return (
    <div className={styles.canSwagger}>
      <div className={styles.canContainer}>
        <div
          className={styles.can}
          style={{
            background: `url(${imageUrl}) repeat-x, url('/can.png')`,
            maskImage: "url('/can.png')",
            backgroundSize: "auto 100%"
          }}
        />
      </div>
    </div>
  );
};

export default CanSwagger;

import Link from 'next/link';
import React from 'react';

import styles from "../styles/components.module.css";
export default function HomeLogo(): JSX.Element {
  return (


    <div className={styles.logo}  >

      <Link href={"/"} >
      <p>
        CRUD Todo App
      </p>
      </Link>
    </div>


  );
}

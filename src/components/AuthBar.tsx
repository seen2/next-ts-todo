import React from 'react';
import { Button } from '@nextui-org/react';

import styles from "../styles/components.module.css";
import Link from 'next/link';


export default function AuthBar() {
  return (
    <div className={styles.flexBox}>
      {!window.localStorage.getItem("userAuthToken") ? <Link href={"/auth/Register"}><Button className={styles.flexItems}>Sign Up </Button></Link>:null}

      <Link href={"/auth/Login"}><Button className={styles.flexItems}>Login</Button></Link>
    </div>
  )
}

import React from 'react';
import styles from "../styles/components.module.css";

export default function AppFeature() {
  return (
    <div className={styles.appFeature} >
      <div>
        <h3>In This App</h3>
      </div>
      <div>
        <ul>
          <li>
            You can Create your own account.
          </li>
          <li>
            You can Create and Manage your personal Tasks.
          </li>
          <li>
            You can Delete and Uodate your personal Tasks.
          </li>
        </ul>
      </div>
      <div>
        <div>Note: All your data will stored in the cloud.</div>
        <div>You can access it from anywhere anytime.</div>
      </div>
    </div>
  );
}

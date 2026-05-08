import React from "react";

import styles from "./Dialog.module.css";

type DialogProps = {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  contentClassName?: string;
};

export function Dialog({ title, children, onClose, contentClassName }: DialogProps) {
  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <h2>{title}</h2>
        <div className={contentClassName}>{children}</div>
        <button type="button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

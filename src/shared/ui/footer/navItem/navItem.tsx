import React from "react";
import { Link } from "react-router-dom";
import styles from "../footer.module.css";
import { NavItemProps } from "./types";

export const NavItem: React.FC<NavItemProps> = React.memo(
  ({ href, title, onClick }) => (
    <li className={styles.item}>
      <Link to={href} onClick={onClick}>
        {title}
      </Link>
    </li>
  )
);
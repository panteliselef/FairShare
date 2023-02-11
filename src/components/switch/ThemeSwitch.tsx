import styles from "./theme-switch.module.css";
import clx from "classnames";
import { useTheme } from "@contexts/ThemeContext";

export const ThemeSwitch = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <label className={clx(styles.switch)}>
      <input type="checkbox" onChange={() => toggleTheme()} checked={theme === "light"} />
      <span className={clx(styles.slider)} />
    </label>
  );
};

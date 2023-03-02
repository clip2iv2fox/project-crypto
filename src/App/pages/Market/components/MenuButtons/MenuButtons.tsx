import React from "react";
import PropTypes from "prop-types";
import styles from "./MenuButtons.module.scss";

interface MenuButtonsProps {
  activeTab: string;
  tabs: string[];
  onChangeTab: (tab: string) => void;
}

const MenuButtons: React.FC<MenuButtonsProps> = ({ activeTab, tabs, onChangeTab }) => {
  return (
    <div className={`${styles.menu_buttons}`} >
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`${styles.menu_button} ${tab === activeTab ? styles._active : ""}`} 
          onClick={() => onChangeTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default MenuButtons;

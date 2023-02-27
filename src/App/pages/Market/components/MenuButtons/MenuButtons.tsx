import React from "react";
import PropTypes from "prop-types";
import "./MenuButtons.scss";

interface MenuButtonsProps {
  activeTab: string;
  tabs: string[];
  onChangeTab: (tab: string) => void;
}

const MenuButtons: React.FC<MenuButtonsProps> = ({ activeTab, tabs, onChangeTab }) => {
  return (
    <div className="menu-buttons">
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`menu-button ${tab === activeTab ? "active" : ""}`}
          onClick={() => onChangeTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default MenuButtons;

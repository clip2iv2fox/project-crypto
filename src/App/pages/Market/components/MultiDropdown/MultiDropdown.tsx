import { shallowEqual } from "@babel/types";
import React, { useState, useEffect, useRef } from "react";
import styles from './MultiDropdown.module.scss';

/** Вариант для выбора в фильтре */
export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Преобразовать выбранные значения в строку. Отображается в дропдауне в качестве выбранного значения */
  pluralizeOptions: (value: Option[]) => string;
}

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  options,
  value,
  onChange,
  disabled = false,
  pluralizeOptions,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLUListElement>(null);

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen((prevState) => !prevState);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        optionsRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !optionsRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef, optionsRef]);

  const handleOptionClick = (option: Option) => {
    if (!disabled) {
      const optionIndex = value.findIndex((o) => o.key === option.key);
      let newValue: Option[] = [];

      if (optionIndex === -1) {
        newValue = [...value, option];
      } else {
        newValue = value.filter((o) => o.key !== option.key);
      }

      onChange(newValue);
    }
  };

  return (
    <div ref={dropdownRef} className={`${styles.multi_dropdown}`}>
      <div className={disabled ? `${styles.multi_dropdown__selected_disabled}` : `${styles.multi_dropdown__selected}`} onClick={toggleDropdown}>
        {pluralizeOptions(value)}
        <div className={`${styles.icon}`}/>
      </div>
      {!disabled && (
        <ul
          ref={optionsRef}
          className={`${styles.multi_dropdown__options} ${
            isOpen ? styles.multi_dropdown__options_open : ''
          }`}
        >
          {isOpen && options.map((option) => (
            <li
              key={option.key}
              className={`${styles.multi_dropdown__option} ${
                value.findIndex((o) => o.key === option.key) !== -1
                  ? styles.multi_dropdown__option_selected
                  : ''
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default React.memo(MultiDropdown, (prevProps, nextProps) => {
  return shallowEqual(prevProps, nextProps);
});
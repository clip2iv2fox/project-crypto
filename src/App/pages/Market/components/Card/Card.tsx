import React from "react";
import './Card.scss'

export type CardProps = {
  /** URL изображения */
  image: string;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Подзаголовок карточки */
  subtitle: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  content?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
};

export const Card: React.FC<CardProps> = ({
  image,
  title,
  subtitle,
  content,
  onClick,
}) => {
  return (
    <div 
      className="card" 
      onClick={onClick}
    >
      <div className="card__image-container">
        <img 
          src={image} 
          alt={title ? title.toString() : undefined} 
          className="card__image" 
        />
        <div className="card__content">
          <div className="card__title">{title}</div>
          <div className="card__subtitle">{subtitle}</div>
        </div>
      </div>
      <div className="card__content">
        {content && <div className="card__extra-content">{content}</div>}
      </div>
    </div>
  );
};
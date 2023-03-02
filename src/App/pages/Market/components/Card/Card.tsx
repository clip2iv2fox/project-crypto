import React from "react";
import styles from './Card.module.scss'

export type CardProps = {
  /** URL изображения */
  image: string;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Подзаголовок карточки */
  subtitle: React.ReactNode;
  contentUp?: string;
  contentDown?: string;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
};

export const Card: React.FC<CardProps> = ({
  image,
  title,
  subtitle,
  contentUp,
  contentDown,
  onClick,
}) => {
  return (
    <div 
      className={`${styles.card}`}
      onClick={onClick}
    >
      <div className={`${styles.card__image_container}`}>
        <img 
          src={image} 
          alt={title ? title.toString() : undefined} 
          className={`${styles.card__image}`} 
        />
        <div className={`${styles.card__names}`}>
          <div className={`${styles.card__title}`}>{title}</div>
          <div className={`${styles.card__subtitle}`}>{subtitle}</div>
        </div>
      </div>
      <div className={`${styles.card__content}`}>
          {contentUp && <div className={`${styles.card__contentUp}`}>${contentUp}</div>}
          {contentDown && 
            <div className=
              {`${styles.percent} ${ 
                Number(contentDown) >= 0 ? 
                  styles.plus
                : 
                  styles.minus
                }`}>
              {Number(contentDown) >= 0 ? 
                `+${contentDown.toLocaleString()}` 
              : 
                contentDown.toLocaleString()
              }%
            </div>
          }
      </div>
    </div>
  );
};
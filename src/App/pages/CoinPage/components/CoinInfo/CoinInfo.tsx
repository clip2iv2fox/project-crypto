import styles from "../../CoinPage.module.scss";

type InfoProps = {
    name: string; 
    price: string
  };

export const Coin_info: React.FC<InfoProps> = ({name, price}) =>{
    return(
    <div className={`${styles.Coin_info}`}>
    <div className={`${styles.info_name}`}>
        {name}
    </div>
    <div className={`${styles.info_price}`}>
        {price}
    </div>
    </div>)
}

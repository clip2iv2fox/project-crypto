import { SetStateAction, useEffect, useState } from "react";
import styles from "./CoinPage.module.scss";
import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { Coins } from "@pages/Market/Market";
import Loader from "@components/Loader/Loader";
import { Coin_info } from "./components/CoinInfo/CoinInfo";
import { useParams } from "react-router-dom";
import { Chart } from "./components/CoinInfo/Chart";
import Button from "@components/Button/Button";

const CoinPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<boolean>(false)
  const [time, setTime] = useState<string>("20")
  const [period, setPeriod] = useState<string>("1")
  const [buttonUsed, setButtonUsed] = useState<number>(1)
  const [diagramData, setDiagramData] = useState()
  const [coin, setCoin] = useState<Coins>({
    id: "",
    symbol: "",
    name: "",
    image: "",
    current_price: "",
    price_change_24h: "",
    price_change_percentage_24h: "",
    market_cap: "",
    fully_diluted_valuation: "",
    circulating_supply: "",
    total_supply: "",
    max_supply: "",
    description: "",
  }
  )
  const { id } = useParams();

  const rewriteData = (data: any) => {
    const new_data = [];

    for (let i = 0; i <= data.length; i = i + data.length / 40){
      new_data.push(data[i])
    }

    return new_data;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios({
          method: "get",
          url: `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${period}&interval=${time}`,
        });
        setDiagramData(result.data.prices);
        setError(false)
      } catch (error) {
        setError(true)
      }
    };

    fetchData();
    console.log(diagramData)
  }, [buttonUsed]);

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const result = await axios({
          method: "get",
          url: `https://api.coingecko.com/api/v3/coins/${id}`,
        });
        setCoin(
          {
            id: result.data.id,
            symbol: result.data.symbol,
            name: result.data.name,
            image: result.data.image.small,
            current_price: result.data.market_data.current_price.usd,
            price_change_24h: result.data.market_data.price_change_24h,
            price_change_percentage_24h: result.data.market_data.price_change_percentage_24h,
            market_cap: result.data.market_data.market_cap.usd,
            fully_diluted_valuation: result.data.market_data.fully_diluted_valuation.usd,
            circulating_supply: result.data.market_data.circulating_supply,
            total_supply: result.data.market_data.total_supply,
            max_supply: result.data.market_data.max_supply,
            description: result.data.description.en,
          },
        );
        setError(false)
      } catch (error) {
        setError(true)
      }
    };

    fetchCoin();

    const interval = setInterval(() => {
      fetchCoin();
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const description_creator = (description: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(description, "text/html");
    return <div dangerouslySetInnerHTML={{ __html: description }} />;
  };

  const changeTime = (time: string, period: string) => {

  }

  return (
    error ?
      <div className={`${styles.Page_loading}`}>
        <div className={`${styles.Exit_icon}`} onClick={() => navigate(`/`)} />
        <div className={`${styles.Body_text} ${styles.error}`}>Error, wrong coin...</div>
      </div>
    :
      coin.id === "" ?
        <div className={`${styles.Page_loading}`}>
          <div className={`${styles.Exit_icon}`} onClick={() => navigate(`/`)} />

          <div className={`${styles.Body_text}`}><Loader className="market" /><div>Loading</div></div>
        </div>
        :
        <div className={`${styles.Coin_page}`}>
          <header className={`${styles.Coin_Header}`}>
            <div className={`${styles.Exit_icon}`} onClick={() => navigate(`/`)} />
            <img
              src={coin.image}
              alt="Coin_image"
              className={`${styles.Coin_image}`}
            />
            <div className={`${styles.Coin_name}`}>
              <div className={`${styles.Coin_Title}`}>
                {coin.name}
              </div>
              <div className={`${styles.Coin_abriviation}`}>
                ({coin.symbol})
              </div>
            </div>
          </header>
          <div className={`${styles.Coin_body}`}>
            <div className={`${styles.Price_title}`}>
              <div className={`${styles.Price}`}>
                ${coin.current_price.toLocaleString()}
              </div>
              <div className={
                `${styles.Price_difference} ${Number(coin.price_change_percentage_24h) >= 0 ? 
                  styles.plus 
                : 
                  styles.minus}`
              }>
                {
                  Number(coin.price_change_24h) >= 0 ? 
                    `+${coin.price_change_24h.toLocaleString()}` 
                  : 
                    coin.price_change_24h.toLocaleString()
                } {' '}  
                ({
                  Number(coin.price_change_percentage_24h) >= 0 ? 
                    `+${coin.price_change_percentage_24h.toLocaleString()}` 
                  : 
                    coin.price_change_percentage_24h.toLocaleString()
                }%)
              </div>
            </div>
            <Coin_info name={"Market Cap"} price={`$${coin.market_cap.toLocaleString()}`}/>
            <Coin_info name={"Fully Diluted Valuation"} price={
              `$${coin.fully_diluted_valuation !== undefined ? 
                coin.fully_diluted_valuation.toLocaleString() 
              : 
                coin.fully_diluted_valuation}`
            }/>
            <Coin_info name={"Circulating Supply"} price={
              coin.circulating_supply == null ? 
                "<none>" 
              : 
                coin.circulating_supply.toLocaleString()
            }/>
            <Coin_info name={"Total Supply"} price={
              coin.total_supply == null ? 
                "<none>" 
              : 
                coin.total_supply.toLocaleString()
            }/>
            <Coin_info name={"Max Supply"} price={
              coin.max_supply == null ? 
                "<none>" 
              : 
                coin.max_supply.toLocaleString()
            }/>
            <div className={`${styles.Coin_description}`}>
              <div className={`${styles.description_title}`}>
                Description
              </div>
              <article className={`${styles.description_info}`}>
                {coin.description !== undefined ? description_creator(coin.description) : coin.description}
              </article>
            </div>
            <div className={`${styles.Coin_diagram}`}>
              <div className={`${styles.diagram_title}`}>
                Diagram
              </div>
              <div className={`${styles.diagram}`}>
                <Chart/>
              </div>
              <div className={`${styles.time_buttons}`}>
                <Button className={buttonUsed == 1 ? 'time_using' : `time`} onClick={() => (changeTime("1", ""), setButtonUsed(1))}>
                  1 H
                </Button>
                <Button className={buttonUsed == 2 ? 'time_using' : `time`} onClick={() => (changeTime("1", "hourly"), setButtonUsed(2))}>
                  24 H
                </Button>
                <Button className={buttonUsed == 3 ? 'time_using' : `time`} onClick={() => (changeTime("7", ""), setButtonUsed(3))}>
                  1 W
                </Button>
                <Button className={buttonUsed == 4 ? 'time_using' : `time`} onClick={() => (changeTime("30", ""), setButtonUsed(4))}>
                  1 M
                </Button>
                <Button className={buttonUsed == 5 ? 'time_using' : `time`} onClick={() => (changeTime("183", ""), setButtonUsed(5))}>
                  6 M
                </Button>
                <Button className={buttonUsed == 6 ? 'time_using' : `time`} onClick={() => (changeTime("365", ""), setButtonUsed(6))}>
                  1 Y
                </Button>
                <Button className={buttonUsed == 7 ? 'time_using' : `time`} onClick={() => (changeTime("max", ""), setButtonUsed(7))}>
                  All
                </Button>
              </div>
            </div>
          </div>
        </div>
    
  )
}

export default CoinPage

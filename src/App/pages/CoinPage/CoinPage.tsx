import React, { useEffect, useState, useContext } from 'react'
import "./CoinPage.scss"
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { Coins } from '@pages/Market/Market';
import { CoinContext } from "../../../configs/CoinContext";
import { Loader } from '@components/Loader/Loader';

const CoinPage = () => {
  const navigate = useNavigate();
  const [coin, setCoin] = useState<Coins>({
    id: '',
    symbol: '',
    name: '',
    image: '',
    current_price: '',
    price_change_24h: '',
    price_change_percentage_24h: '',
    market_cap: '',
    fully_diluted_valuation: '',
    circulating_supply: '',
    total_supply: '',
    max_supply: '',
    description: '',}
  )
  const [loading, setloading] = useState<boolean>(false)

  const { coinName } = useContext(CoinContext);

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        setloading(true)
        const result = await axios({
          method: "get",
          url: `https://api.coingecko.com/api/v3/coins/${coinName}`,
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
        setloading(false)
      } catch (error) {
        console.log(error);
      }
    };

    // Call fetchCoins immediately when component is mounted
    fetchCoin();
  
    // Call fetchCoins every 30 seconds
    const interval = setInterval(() => {
      fetchCoin();
    }, 30000);
  
    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  const coin_info = (name: string, price: string) =>
    <div className='Coin_info'>
      <div className='info_name'>
        {name}
      </div>
      <div className='info_price'>
        {price}
      </div>
    </div>

  const description_creator = (description: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(description, "text/html");
    return <div dangerouslySetInnerHTML={{ __html: description }} />;
  };

  return (
      loading ?
          <div className='Page_loading'>
            <div className='Exit_icon' onClick={() => navigate(`/`)}/>

            <div className='Body_text'><Loader className='market'/><div>Loading</div></div>
          </div>
      :
      <div className='Coin_page'>
        <div className='Coin_Header'>
          <div className='Exit_icon' onClick={() => navigate(`/`)}/>
          <img 
            src={coin.image}
            alt="Coin_image"
            className="Coin_image" 
            onClick={() => console.log(coin)}
          />
          <div className='Coin_name'>
            <div className='Coin_Title'>
              {coin.name}
            </div>
            <div className='Coin_abriviation'>
              ({coin.symbol})
            </div>
          </div>
          {/* checkbox favorites */}
        </div>
        <div className='Coin_body'>
          <div className='Price_title'>
            <div className='Price'>
              ${coin.current_price.toLocaleString()}
            </div>
            <div className={`Price_difference ${ Number(coin.price_change_percentage_24h) >= 0 ? "plus" : "minus"}`}>
            {Number(coin.price_change_24h) >= 0 ? `+${coin.price_change_24h.toLocaleString()}` : coin.price_change_24h.toLocaleString()} ({Number(coin.price_change_percentage_24h) >= 0 ? `+${coin.price_change_percentage_24h.toLocaleString()}` : coin.price_change_percentage_24h.toLocaleString()}%)
            </div>
          </div>
          {/* ставим map с повтором инфы либо через поток, либо через свой JSON */}
          {coin_info("Market Cap", `$${coin.market_cap.toLocaleString()}`)}
          {coin_info("Fully Diluted Valuation", `$${coin.fully_diluted_valuation.toLocaleString()}`)}
          {coin_info("Circulating Supply", coin.circulating_supply == null ? "<none>" : coin.circulating_supply.toLocaleString())}
          {coin_info("Total Supply", coin.total_supply == null ? "<none>" : coin.total_supply.toLocaleString())}
          {coin_info("Max Supply", coin.max_supply == null ? "<none>" : coin.max_supply.toLocaleString())}
          <div className='Coin_description'>
            <div className='description_title'>
              Description
            </div>
            <div className='description_info'>
              {description_creator(coin.description)}
            </div>
          </div>
          {/* <div className="Coin_diagram">
            <div className='diagram_title'>
              Diagram
            </div>
            <div className='diagram_chart'>
            diagram_chart
            </div>
            <div className='diagram_time'>
            diagram_time
            </div>
          </div> */}
        </div>
    </div>
  )
}

export default CoinPage

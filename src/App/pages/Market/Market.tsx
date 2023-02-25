import { Button } from '@components/Button/Button'
import React, { useState, useEffect, useContext } from 'react'
import { Input } from './components/Input/Input'
import MenuButtons from './components/MenuButtons/MenuButtons'
import { MultiDropdown, Option } from './components/MultiDropdown/MultiDropdown'
import SearchIcon from "./components/Images/SearchIcon.png"
import "./Market.scss"
import axios from 'axios'
import { Card } from './components/Card/Card'
import { useNavigate } from "react-router-dom";
import { CoinContext } from "../../../configs/CoinContext";
import { Loader } from '@components/Loader/Loader'

export type Coins = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: string;
  price_change_24h: string
  price_change_percentage_24h: string;
  market_cap: string;
  fully_diluted_valuation: string;
  circulating_supply: string;
  total_supply: string;
  max_supply: string;
  description: string;
}

const Market = () => {
  const [input, setInput] = useState<string>("")
  const [search, setSearch] = useState<string>("")
  const [select, setSelect] = useState<Option[]>([])
  const [activeTab, setActiveTab] = useState("All");
  const [coins, setCoins] = useState<Coins[]>([])
  const [loading, setloading] = useState<boolean>(false)

  const { setCoinName } = useContext(CoinContext);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        setloading(true)
        const result = await axios({
          method: "get",
          url:
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd",
        });
        setCoins(
          result.data.map((coin: Coins) => ({
            id: coin.id,
            symbol: coin.symbol,
            name: coin.name,
            image: coin.image,
            current_price: coin.current_price,
            price_change_percentage_24h: coin.price_change_percentage_24h,
          }))
        );
        setloading(false)
      } catch (error) {
        console.log(error);
      }
    };

  
    // Вызовите fetch Coins немедленно, когда компонент смонтирован
    fetchCoins();
  
    // Вызывайте сбор монет каждые 30 секунд
    const interval = setInterval(() => {
      fetchCoins();
    }, 15000);
  
    // Очистите интервал при отключении компонента
    return () => clearInterval(interval);
  }, []);

  const search_element = () => {
    setSearch(input)
    setInput("")
  }

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
  };

  const goToCoin = (id: string) => {
    navigate(`/coin`)
    setCoinName(id)
  }

  const card_creator = (coin: Coins) => 
    <Card
      key={coin.id+coin.name+activeTab}
      image={coin.image}
      title={coin.name}
      onClick={() => goToCoin(coin.id)}
      subtitle={<a>{coin.symbol}</a>}
      content={<span><b>${coin.current_price.toLocaleString()}</b><i className={ Number(coin.price_change_percentage_24h) >= 0 ? "percent plus" : "percent minus"}>{Number(coin.price_change_percentage_24h) >= 0 ? `+${coin.price_change_percentage_24h.toLocaleString()}` : coin.price_change_percentage_24h.toLocaleString()}%</i></span>}
    />

  const coins_cards = coins.map((coin)=>{
    return(
    activeTab == "All" ?
      card_creator(coin)
    : activeTab == "Gainer" ? 
        Number(coin.price_change_percentage_24h) >= 0 ?
          card_creator(coin)
        : <div/>
      : activeTab == "Loser" ? 
        Number(coin.price_change_percentage_24h) < 0 ?
          card_creator(coin)
        : <div/>
      : <div/>
    )
  })

  return (
    <div className='Market_page'> 
      <div className='Market_header'>
        <div className='Market_Searcher'>
          <Input
            value={input}
            onChange={(value: string) => setInput(value)}
            placeholder="Search Cryptocurrency"
          />
          <Button className="search" onClick={() => search_element()}>
            <img 
              src={SearchIcon} 
              alt="SearchIcon"
              className="SearchIcon" 
            />
          </Button>
        </div>
        <div className='Market_Title_Area'>
          <div className='Market_Title'>
            Coins
          </div>
          <div className='Market_Category'>
            <MultiDropdown
              options={[
                  { key: 'usd', value: 'usd' },
                  { key: 'eur', value: 'eur' },
              ]}
              value={[{ key: 'msk', value: 'msk' }]}
              onChange={( value: Option[]) => setSelect(value)}
              pluralizeOptions={() => select.length > 0 ? `Selected: ${select.length}` : `Chose category`}
            />
          </div>
        </div>
        <div className='Market_Menu'>
          <MenuButtons
            activeTab={activeTab}
            tabs={["All", "Gainer", "Loser", "Favourites"]}
            onChangeTab={handleTabChange}
          />
        </div>
      </div>
      <div className='Market_Body'>
        {loading ?
          <div className='Body_loading'>
            <div className='Body_text'><Loader className='market'/><div>Loading</div></div>
          </div>
        :
          coins_cards
        }
      </div>
    </div>
  )
}

export default Market

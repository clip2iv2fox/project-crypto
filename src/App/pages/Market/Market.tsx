import { useState, useEffect } from "react";
import { Button } from "@components/Button/Button";
import { Input } from "./components/Input/Input";
import MenuButtons from "./components/MenuButtons/MenuButtons";
import { MultiDropdown, Option } from "./components/MultiDropdown/MultiDropdown";
import SearchIcon from "./components/Images/SearchIcon.png";
import styles from "./Market.module.scss";
import axios from "axios";
import { Card } from "./components/Card/Card";
import { useNavigate } from "react-router-dom";
import { Loader } from "@components/Loader/Loader";

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

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCoins = async () => {
      try {
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
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchCoins();
  
    const interval = setInterval(() => {
      fetchCoins();
    }, 15000);
  
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
    navigate(`/coin/${id}`)
  }

  const card_creator = (coin: Coins) => 
    <Card
      key={coin.id+coin.name+activeTab}
      image={coin.image}
      title={coin.name}
      onClick={() => goToCoin(coin.id)}
      subtitle={coin.symbol}
      contentUp={coin.current_price.toLocaleString()}
      contentDown={coin.price_change_percentage_24h}
    />

  const coins_cards = coins.map((coin: Coins)=>{
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
    <div className={`${styles.Market_page}`}> 
      <div className={`${styles.Market_header}`}>
        <div className={`${styles.Market_Searcher}`}>
          <Input
            value={input}
            onChange={(value: string) => setInput(value)}
            placeholder="Search Cryptocurrency"
          />
          <Button className={`search`} onClick={() => search_element()}>
            <img 
              src={SearchIcon} 
              alt="SearchIcon"
              className={`${styles.SearchIcon}`}
            />
          </Button>
        </div>
        <div className={`${styles.Market_Title_Area}`}>
          <div className={`${styles.Market_Title}`}>
            Coins
          </div>
          <div className={`${styles.Market_Category}`}>
            <MultiDropdown
              options={[
                  { key: "usd", value: "usd" },
                  { key: "eur", value: "eur" },
              ]}
              value={[{ key: "msk", value: "msk" }]}
              onChange={( value: Option[]) => setSelect(value)}
              pluralizeOptions={() => select.length > 0 ? `Selected: ${select.length}` : `Chose category`}
            />
          </div>
        </div>
        <div className={`${styles.Market_Menu}`}>
          <MenuButtons
            activeTab={activeTab}
            tabs={["All", "Gainer", "Loser", "Favourites"]}
            onChangeTab={handleTabChange}
          />
        </div>
      </div>
      <div className={`${styles.Market_Body}`}>
        {coins.length === 0 ?
          <div className={`${styles.Body_loading}`}>
            <div className={`${styles.Body_text}`}><Loader className="market"/><div>Loading</div></div>
          </div>
        :
          coins_cards
        }
      </div>
    </div>
  )
}

export default Market

import React, { useState, useEffect } from "react";
import MenuButtons from "./components/MenuButtons/MenuButtons";
import Button from "@components/Button/Button";
import Input from "./components/Input/Input";
import MultiDropdown, { Option } from "./components/MultiDropdown/MultiDropdown";
import SearchIcon from "./components/Images/SearchIcon.png";
import styles from "./Market.module.scss";
import axios from "axios";
import { Card } from "./components/Card/Card";
import { useNavigate } from "react-router-dom";
import Loader from "@components/Loader/Loader";
import InfiniteScroll from "react-infinite-scroll-component";

export interface Coins {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: string;
  price_change_24h: string;
  price_change_percentage_24h: string;
  market_cap: string;
  fully_diluted_valuation?: string;
  circulating_supply: string;
  total_supply?: string;
  max_supply?: string;
  description?: string;
}

const Market = (): JSX.Element => {
  const [input, setInput] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [select, setSelect] = useState<Option[]>([]);
  const [activeTab, setActiveTab] = useState<string>("All");
  const [coins, setCoins] = useState<Coins[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [visibleCoins, setVisibleCoins] = useState<Coins[]>(coins.slice(0, 10));
  const [hasMoreCoins, setHasMoreCoins] = useState<boolean>(true)

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCoins = async (): Promise<void> => {
      try {
        const result = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd");
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
        setError(false)
      } catch (error) {
        setError(true)
      }
    };

    fetchCoins();

    const interval = setInterval(() => {
      fetchCoins();
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const searchElement = React.useCallback(() => {
    setSearch(input);
    setInput("");
  }, [input]);

  const changeInput = React.useCallback((newInput: string) => {
    setInput(newInput);
  }, []);

  const handleTabChange = React.useCallback((newTab: string) => {
    setActiveTab(newTab);
  }, []);

  const changeSelect = React.useCallback((newSelect: Option[]) => {
    setSelect(newSelect)
  }, []);

  const goToCoin = (id: string) => {
    navigate(`/coin/${id}`)
  }

  const card_creator = (coin: Coins) => 
    <Card
      key={coin.id}
      image={coin.image}
      title={coin.name}
      onClick={() => goToCoin(coin.id)}
      subtitle={coin.symbol}
      contentUp={coin.current_price.toLocaleString()}
      contentDown={coin.price_change_percentage_24h}
    />
  
  const coins_list = () => {return (
    coins.map((coin: Coins) => 
          activeTab == "All" ?
            card_creator(coin)
          : activeTab == "Gainer" ? 
              Number(coin.price_change_percentage_24h) >= 0 ?
                card_creator(coin)
              : <div key={coin.id}/>
            : activeTab == "Loser" ? 
              Number(coin.price_change_percentage_24h) < 0 ?
                card_creator(coin)
              : <div key={coin.id}/>
            : <div key={coin.id}/>
        )
      )
    }

  return (
    <div className={`${styles.Market_page}`}> 
      <div className={`${styles.Market_header}`}>
        <div className={`${styles.Market_Searcher}`}>
          <Input
            value={input}
            onChange={changeInput}
            placeholder="Search Cryptocurrency"
          />
          <Button className={`search`} onClick={searchElement}>
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
              onChange={changeSelect}
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
          coins_list()
        }
      </div>
    </div>
  )
}

export default Market

import { Button } from '@components/Button/Button'
import React, {useState} from 'react'
import { Input } from './components/Input/Input'
import MenuButtons from './components/MenuButtons/MenuButtons'
import { MultiDropdown, Option } from './components/MultiDropdown/MultiDropdown'
import SearchIcon from "./components/Images/SearchIcon.png"
import "./Market.scss"

const Market = () => {
  const [input, setInput] = useState<string>("")
  const [search, setSearch] = useState<string>("")
  const [select, setSelect] = useState<Option[]>([])
  const [activeTab, setActiveTab] = useState("All");

  const search_element = () => {
    setSearch(input)
    setInput("")
  }

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
  };

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
                  { key: 'msk', value: 'msk' },
                  { key: 'spb', value: 'spb' },
                  { key: 'ekb', value: 'ekb' }
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
      Market_Body
      </div>
    </div>
  )
}

export default Market

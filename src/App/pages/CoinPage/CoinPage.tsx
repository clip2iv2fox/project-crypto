import React from 'react'
import "./CoinPage.scss"
import { useNavigate  } from "react-router-dom";


const CoinPage = () => {
  const navigate = useNavigate();

  return (
    <div className='Coin_page'>
      <div className='Coin_Header'>
        <div className='Exit_icon' onClick={() => navigate(`/`)}/>
        <img 
          src="https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg" 
          alt="Coin_image"
          className="Coin_image" 
        />
        <div className='Coin_Title'>
        Coin_Title
        </div>
        <div className='Coin_abriviation'>
        Coin_abriviation
        </div>
        {/* checkbox favorites */}
      </div>
      <div className='Coin_body'>
        <div className='Price_title'>
          <div className='Price'>
          Price
          </div>
          <div className='Price_difference plus'>
          Price_difference
          </div>
        </div>
        {/* ставим map с повтором инфы либо через поток, либо через свой JSON */}
        <div className='Coin_info'>
          <div className='info_name'>
          info_name
          </div>
          <div className='info_price'>
          info_price
          </div>
        </div>
        <div className='Coin_description'>
          <div className='description_title'>
            Description
          </div>
          <div className='description_info'>
          description_info
          </div>
        </div>
        <div className="Coin_diagram">
          <div className='diagram_title'>
            Diagram
          </div>
          <div className='diagram_chart'>
          diagram_chart
          </div>
          <div className='diagram_time'>
          diagram_time
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoinPage

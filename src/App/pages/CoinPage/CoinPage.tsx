import React from 'react'

const CoinPage = () => {
  return (
    <div className='Coin_page'>
      <div className='Coin_Header'>
        <div className='Exit_icon'/>
        <img src="" alt="" />
        <div className='Coin_Title'>
        Coin_Title
        </div>
        <div className='Coin_abriviation'>
        Coin_abriviation
        </div>
        <div className='Star_button'/>
      </div>
      <div className='Coin_body'>
        <div className='Price_title'>
          <div className='Price'>
          Price
          </div>
          <div className='Price_difference'>
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

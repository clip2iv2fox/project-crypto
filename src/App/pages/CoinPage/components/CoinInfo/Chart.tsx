import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const dta = [{
  name: "string;,",
  coin: '1',
  amt: '2',
},{
  name: "string;,",
  coin: '3',
  amt: '5',
},{
  name: "string;,",
  coin: '4',
  amt: '6',
},{
  name: "string;,",
  coin: '4',
  amt: '6',
},{
  name: "string;,",
  coin: '4',
  amt: '6',
},{
  name: "string;,",
  coin: '4',
  amt: '6',
},{
  name: "string;,",
  coin: '4',
  amt: '6',
},{
  name: "string;,",
  coin: '4',
  amt: '6',
},{
  name: "string;,",
  coin: '4',
  amt: '6',
},{
  name: "string;,",
  coin: '4',
  amt: '6',
},{
  name: "string;,",
  coin: '4',
  amt: '6',
},{
  name: "string;,",
  coin: '4',
  amt: '6',
},{
  name: "string;,",
  coin: '4',
  amt: '6',
},{
  name: "string;,",
  coin: '4',
  amt: '6',
},{
  name: "string;,",
  coin: '4',
  amt: '6',
},{
  name: "string;,",
  coin: '4',
  amt: '6',
},{
  name: "string;,",
  coin: '4',
  amt: '6',
},{
  name: "string;,",
  coin: '4',
  amt: '6',
},{
  name: "string;,",
  coin: '4',
  amt: '6',
},{
  name: "string;,",
  coin: '4',
  amt: '6',
},{
  name: "string;,",
  coin: '4',
  amt: '6',
}]

export type Date = {
  name: string;
  coin: number;
  amt: number;
}

type ChartProps = {
  data: any;
};


export const Chart: React.FC<ChartProps> = ({data}) => {
    return (
        <LineChart
          width={373}
          height={300}
          data={data}
          margin={{
            top: 15,
            right: 0,
            left: 0,
            bottom: 10,
          }}
        >
          <XAxis dataKey="name" />
          <Tooltip />
          <Line dataKey="coin" stroke="#0000EE" dot={false} />
        </LineChart>
    );
  
}

import React, { useState } from 'react';
import { LineChart, Line, XAxis, Tooltip } from 'recharts';

export type Data = {
  name: string;
  time: string;
  coin: number;
  amt: number;
}

type ChartProps = {
  data: Data[];
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

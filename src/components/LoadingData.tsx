import React, { MouseEvent, useEffect, useState, useCallback } from 'react';
import logo from './logo.svg';
import './App.css';
import { csv, csvFormat, csvParse } from 'd3';

const width = 960;
const height = 500;

const circleRadius = 30 / 2;
const initMousePos = { x: width / 2, y: height / 2 };

const csvUrl: string = 'https://gist.githubusercontent.com/leinadmahpel/e4f1faaa15761314064108ccb65b0049/raw/colors.csv';

export const message = (data: d3.DSVRowArray<string>) => {
      let message = '';
      message += Math.round(csvFormat(data).length / 1024) + ' kB\n';
      message += data.length + ' rows\n';
      message += data.columns.length + ' columns\n';
      return message;
}

function LoadingData() {

	const [data, setData] = useState<d3.DSVRowArray<string> | null>(null);

      useEffect(() => {
            csv(csvUrl).then((data: d3.DSVRowArray<string>) => {
                  setData(data);
            });
      }, []);
      

	return (
            <pre>{data ? message(data) : 'Loading...'}</pre>
	);
}

export default LoadingData;

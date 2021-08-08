import React, { MouseEvent, useEffect, useState, useCallback } from 'react';
import logo from './logo.svg';
import './App.css';
import { csv, csvFormat, csvParse, DSVRowArray, DSVRowString } from 'd3';

const width = 960;
const height = 500;

const circleRadius = 30 / 2;
const initMousePos = { x: width / 2, y: height / 2 };

const csvUrl: string = 'https://gist.githubusercontent.com/leinadmahpel/e4f1faaa15761314064108ccb65b0049/raw/colors.csv';

function RenderingDataWithD3(): JSX.Element {

      const [data, setData] = useState<d3.DSVRowArray<string> | null>(null);

      useEffect(() => {
            csv(csvUrl).then((data: DSVRowArray<string>) => {
                  setData(data);
            });
      }, []);
      // console.log(data ? data[0] : null);

      if (!data) {
            return <pre>Loading...</pre>
      }

      return <> 
                  <header>Rendering Data with React and D3</header>
                  {data.map((d: DSVRowString<string>) => (
                        <div 
                              style={{ 
                                    backgroundColor: d['RGB hex value'], 
                                    width: '960px', 
                                    height: '4px' 
                              }} 
                        />
                  ))} 
            </>
}

export default RenderingDataWithD3;

import React, { MouseEvent, useEffect, useState, useCallback } from 'react';
import logo from './logo.svg';
import '../App.css';
import { csv, DSVRowArray, format, max, scaleBand, ScaleLinear, scaleLinear, scaleOrdinal } from 'd3';
import { useData } from './useData';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Marks } from './Marks';

const width = 960;
const height = 500;

const margin = {
      top: 20,
      right: 30,
      bottom: 65,
      left: 220
};
const xAxisLabelOffset = 50;

function D3BarChartStylized(): JSX.Element {
      const data = useData();

      if (!data) {
            return <pre>Loading...</pre>
      }

      // these are accessor functions
      const yValueFunc = (d: any) => d.Country;
      const xValueFunc = (d: any) => d.Population;
      const siFormat = format(".2s");
      const xAxisTickFormatter = (tickVal: number) => siFormat(tickVal).replace('G', 'B'); 
      // function yValFunc(d: any) {
      //       return d.Country;
      // }
      // function xValFunc(d: any) {
      //       return d.Population;
      // }

      // innerHeight and innerWidth will be used to size the individual bar's height and width
      const innerHeight = height - margin.top - margin.bottom;
      const innerWidth = width - margin.left - margin.right;

      // https://github.com/d3/d3-scale#scaleBand
      // this gives us a new scaleBand instance
      const yScale = scaleBand()
                        .domain(data.map(yValueFunc))
                        .range([0, innerHeight]) // the range is the pixel space coordinates that the domain will be mapped on to. accepts an array of two values i.e. minimum height of bar and maximum height of bar
                        .padding(.15);
                        // .paddingInner(.5)
                        // .paddingOuter(1);
                        
      console.log(data[0]);

      /* LinearScale notes:
            -the domain of the linear scale is an array of two numbers i.e. min and max, 
                  which is from your "Data Space" i.e. in our case, the min and max population values
            -the range of the linear scale is also an array of two numbers, i.e. min and max,
                  which is our "Screen Space".
                  If we want our bars to go all the way across the screen horizontally,
                  then the range will start at 0 and the max will be our width
      */
      const maxPopStr = max(data, xValueFunc); // this is the d3.max() function not Math.max()
      const maxPop = maxPopStr ? +maxPopStr : 0;
      const xScale = scaleLinear()
                        .domain([0, maxPop]) // use d3.max() to find the max Population value in the dataset. pass the dataset and an accessor function as input
                        .range([0, innerWidth]);

      // we can view the x-axis labels i.e. ticks using xScale.ticks()
            // read more here: https://github.com/d3/d3-scale#continuous_ticks
      console.log(xScale.ticks()); // all ticks on the x-axis
      console.log(yScale.domain()); // all ticks on the y-axis

      // to figure out the width of the bars, which will be derived from the population of each country, we will use a construct called a LinearScale
      return (
            <>
                  {/* <header>D3 Bar Chart showing top 10 of UN World Population 2019 with Axes</header> */}
                  <svg width={width} height={height} style={{backgroundColor: 'lightBlue'}}>
                        // these are the x-axis ticks
                        {/* // we can move everything inside the group element to the right and down, by setting the transform attribute by setting something in the x and y direction */}
                        <g transform={`translate(${margin.left}, ${margin.top})`}>
                              <AxisBottom 
                                    xScale={xScale} 
                                    innerHeight={innerHeight} 
                                    tickFormat={xAxisTickFormatter}
                              />
                              <AxisLeft yScale={yScale} />
                              <text 
                                    className="axis-label"
                                    x={innerWidth / 2}
                                    y={innerHeight + xAxisLabelOffset}
                                    textAnchor="middle"
                              >
                                          Population
                              </text>
                              <Marks 
                                    data={data} 
                                    xScale={xScale} 
                                    yScale={yScale} 
                                    xValueFunc={xValueFunc} 
                                    yValueFunc={yValueFunc} 
                                    tooltipFormatter={xAxisTickFormatter}
                              />
                        </g>
                  </svg>
            </>
      );
}

export default D3BarChartStylized;

import React, { MouseEvent, useEffect, useState, useCallback } from 'react';
import logo from './logo.svg';
import '../App.css';
import { csv, DSVRowArray, max, scaleBand, scaleLinear, scaleOrdinal } from 'd3';

const width = 960;
const height = 500;

const csvUrl: string = 'https://gist.githubusercontent.com/leinadmahpel/fdba3592766b5689aab42dd23b658610/raw/3c603542e3ccdf30b1a0e6d94451125c6a2100c6/un_population_2019.csv';
const margin = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 200
}

function D3BarChartWithAxes(): JSX.Element {

      const [data, setData] = 
            useState<
                  any
                  // | d3.DSVRowArray<string> 
                  // | null
            >(null);


      // if we only want to show the top ten of the bars, then we do this by filtering the data before passing it to setData()
      useEffect(() => {
            const row = (d: any) => {
                  // can add a new column into the data element
                  d.Population = Math.round(+d['2020']);//parseFloat(d['2020']);
                  return d;
            }
            csv(csvUrl, row).then((data: DSVRowArray<string> | any) => {
                  // take only the the top ten, so use slice()
                  setData(data.slice(0, 10));
            });
      }, []);

      if (!data) {
            return <pre>Loading...</pre>
      }

      // innerHeight and innerWidth will be used to size the individual bar's height and width
      const innerHeight = height - margin.top - margin.bottom;
      const innerWidth = width - margin.left - margin.right;

      // https://github.com/d3/d3-scale#scaleBand
      // this gives us a new scaleBand instance
      const yScale = scaleBand()
                        .domain(data.map((d: any) => d.Country))
                        .range([0, innerHeight]) // the range is the pixel space coordinates that the domain will be mapped on to. accepts an array of two values i.e. minimum height of bar and maximum height of bar
                        .padding(.005)
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
      const maxPopStr = max(data, (d: any) => d.Population);
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
                              {xScale.ticks().map(tickValue => (
                                    // This will build the x-axis
                                    // to see props we can pass into SVGLineElement: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/line
                                    // x1 is where the line starts in the x direction
                                    // since tickValue is a value from the scale's domain, we can use our xScale to map that tickValue from the domain to the range
                                    <g key={tickValue} transform={`translate(${xScale(tickValue)}, ${0})`}>
                                          <line 
                                                // x1, y1, x2 are set to 0 by default so we can omit them if we want to
                                                // x1={0} // top of line starts at
                                                // y1={0} // top height of line 
                                                // x2={0} // bottom of line ends at
                                                y2={innerHeight} // bottom height of line
                                                stroke="white" 
                                          />
                                          {/* 
                                                // This will add a label for the given tick by using <text> element (could also add images here instead) 
                                                // to set the text to be at the bottom, just set the y coordinate of the text to be innerHeight
                                          */}
                                          <text 
                                                dy=".71em"
                                                y={innerHeight + 3}
                                                style={{
                                                      textAnchor: 'middle'
                                                }}
                                          >
                                                {tickValue}
                                          </text>
                                    </g>
                              ))}

                              // these are the y-axis ticks
                              // if we call domain() without passing in any arguments, it will return whatever we passed in initially when we set domain() for yScale
                              {yScale.domain().map(tickValue => {
                                    const yCoordOfYAxisLabel = yScale(tickValue);
                                    const centerYCoordOfYAxisLabel = yCoordOfYAxisLabel ? yCoordOfYAxisLabel + (yScale.bandwidth() / 2) : 0;
                                    // yScale() returns the coordinate of the top of the bar
                                    // so if we want the center of the bar, we need to add half of the bandwidth to it
                                    return (<g key={tickValue} transform={`translate(${0}, ${centerYCoordOfYAxisLabel})`}>
                                                
                                                <text 
                                                      key={tickValue}
                                                      dy=".32em"
                                                      x={-3}
                                                      // y={centerYCoordOfYAxisLabel}
                                                      style={{textAnchor: 'end'}}
                                                >
                                                      {tickValue}
                                                </text>
                                          </g>
                                    )
                              })}

                              // These are the bars
                              {data.map((d: any) => (
                                    <rect 
                                          key={d.Country}
                                          x={0} 
                                          y={yScale(d.Country)} // use d3.bandScale
                                          width={xScale(d.Population)} // use d3.LinearScale
                                          height={yScale.bandwidth()} // use bandScale's bandwidth, where bandwidth is the width of one bar
                                    />
                              ))}
                        </g>
                  </svg>
            </>
      );

      // return <> 
      //             <header>Rendering Data with React and D3</header>
      //             {data.map((d: DSVRowString<string>) => (
      //                   <div 
      //                         style={{ 
      //                               backgroundColor: d['RGB hex value'], 
      //                               width: '960px', 
      //                               height: '4px' 
      //                         }} 
      //                   />
      //             ))} 
      //       </>
}

export default D3BarChartWithAxes;

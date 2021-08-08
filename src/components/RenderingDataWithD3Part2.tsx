import React, { MouseEvent, useEffect, useState, useCallback } from 'react';
import logo from './logo.svg';
import './App.css';
import { Arc, arc, csv, csvFormat, csvParse, DefaultArcObject, DSVRowArray, DSVRowString, pie, PieArcDatum } from 'd3';

const width = 960;
const height = 500;
const centerX = width / 2;
const centerY = height / 2;

const circleRadius = 30 / 2;
const initMousePos = { x: width / 2, y: height / 2 };

const csvUrl: string = 'https://gist.githubusercontent.com/leinadmahpel/e4f1faaa15761314064108ccb65b0049/raw/colors.csv';

const pieArc: any = arc()
      .innerRadius(0) // explode from the middle
      .outerRadius(width); // want it to go off the screen
      // .startAngle(Math.PI / 2) // each arc will have a start and end angle based on the index of the datapoint in the array
      // .endAngle(Math.PI * 3 / 2);

function RenderingDataWithD3Part2(): JSX.Element {

      const [data, setData] = 
            useState<
                  any
                  // | d3.DSVRowArray<string> 
                  // | null
            >(null);

      useEffect(() => {
            csv(csvUrl).then((data: DSVRowArray<string>) => {
                  setData(data);
            });
      }, []);
      console.log(data ? data[0] : null);

      if (!data) {
            return <pre>Loading...</pre>
      }
      // <g> is a group element that allows us to move the svg
      // we can put our path elements within the group element
            // that will be transformed by our centerX and centerY
      // pie()(data) will return all the arc objects for the given dataset passed as input into the d3.pie generator
      
      // pie.value([value]) is a function that returns the ratio of how big the slice should be
      // pie.value([value]) associates an accessor with each data element to the return object. This allows us to do things like d.data to get the original data element
            // more info on pie.value here https://github.com/d3/d3-shape#pie_value
            // more info on pie.value here https://github.com/d3/d3-shape#pie_value
      
      const colorPie = pie().value(d => 1);

      return (
            <>
                  <header>Rendering Data with React and D3 Part2 - With a Radial Burst!</header>
                  <svg width={width} height={height}>
                        <g transform={`translate(${centerX},${centerY})`}>
                              {colorPie(data).map((d: any) => (
                                    // the original data elements are exposed at d.data
                                    <path 
                                          fill={d.data['RGB hex value']}
                                          d={pieArc(d)} 
                                    />
                              ))}

                              {/* alternative without using d3.pie(). d is the row from original dataset. i is the index of the data element in the array */}
                              {/* {data.map((d: DSVRowString<string>, i: number) => (
                                    <path 
                                          fill={d['RGB hex value']}
                                          d={pieArc({
                                                startAngle: (i / data.length) * (2 * Math.PI), // compute the percentage around the circle
                                                endAngle: ((i + 1) / data.length) * (2 * Math.PI)
                                          })} 
                                    />
                              ))}  */}
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

export default RenderingDataWithD3Part2;

import { ScaleLinear } from "d3";

export const AxisBottom = (props:{xScale: ScaleLinear<number, number, never>, innerHeight: number}): JSX.Element => {
      const {xScale, innerHeight} = props;
      return (
                  <>
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
                  </>
      );
}
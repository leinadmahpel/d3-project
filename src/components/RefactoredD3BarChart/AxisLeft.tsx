import { ScaleBand } from "d3";

export const AxisLeft = ({yScale}: {yScale: ScaleBand<string>}): JSX.Element => {
      // these are the y-axis ticks
      // if we call domain() without passing in any arguments, it will return whatever we passed in initially when we set domain() for yScale
      return (
            <>
                  {yScale.domain().map(tickValue => {
                        const yCoordOfYAxisLabel = yScale(tickValue);
                        const centerYCoordOfYAxisLabel = yCoordOfYAxisLabel ? yCoordOfYAxisLabel + (yScale.bandwidth() / 2) : 0;
                        // yScale() returns the coordinate of the top of the bar
                        // so if we want the center of the bar, we need to add half of the bandwidth to it
                        return (
                              <g className="tick" 
                                    key={tickValue} 
                                    transform={`translate(${0}, ${centerYCoordOfYAxisLabel})`}
                              >
                                    <text
                                          key={tickValue}
                                          dy=".32em"
                                          x={-3}
                                          // y={centerYCoordOfYAxisLabel}
                                          style={{ textAnchor: 'end' }}
                                    >
                                          {tickValue}
                                    </text>
                              </g>
                        );
                  })}
            </>
      );   
}

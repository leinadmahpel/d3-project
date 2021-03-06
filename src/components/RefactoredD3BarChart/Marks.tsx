import { ScaleBand, ScaleLinear } from "d3"

export const Marks = ({data, xScale, yScale, xValueFunc, yValueFunc, tooltipFormatter} 
      : {
            data: any, 
            xScale: ScaleLinear<number, number, never>, 
            yScale: ScaleBand<string>,
            xValueFunc: Function,
            yValueFunc: Function,
            tooltipFormatter: Function
      }) => {
      return (
            <>
                  // These are the bars
                  {data.map((d: any) => (
                        <rect 
                              className="mark"
                              // key={d.Country}
                              key={yValueFunc(d)}
                              x={0} 
                              // y={yScale(d.Country)} // use d3.bandScale
                              y={yScale(yValueFunc(d))}
                              // width={xScale(d.Population)} // use d3.LinearScale
                              width={xScale(xValueFunc(d))}
                              height={yScale.bandwidth()} // use bandScale's bandwidth, where bandwidth is the width of one bar
                        >
                              <title>{tooltipFormatter(xValueFunc(d))}</title>
                        </rect>
                  ))}
            </>
      );
}
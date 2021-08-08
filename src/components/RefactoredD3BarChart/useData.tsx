import { csv, DSVRowArray } from "d3";
import { useEffect, useState } from "react";

const csvUrl: string = 'https://gist.githubusercontent.com/leinadmahpel/fdba3592766b5689aab42dd23b658610/raw/3c603542e3ccdf30b1a0e6d94451125c6a2100c6/un_population_2019.csv';

export const useData = () => {
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
                  d.Population = Math.round(+d['2020'] * 1000);//parseFloat(d['2020']); data is in thousands so need to multiple by 1000
                  return d;
            }
            csv(csvUrl, row).then((data: DSVRowArray<string> | any) => {
                  // take only the the top ten, so use slice()
                  setData(data.slice(0, 10));
            });
      }, []);
      return data;
}
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import LoadingData from './components/LoadingData';
import reportWebVitals from './reportWebVitals';
import RenderingDataWithD3 from './components/RenderingDataWithD3';
import RenderingDataWithD3Part2 from './components/RenderingDataWithD3Part2';
import D3BarChart from './components/D3BarChart/D3BarChart';
import D3BarChartWithAxes from './components/D3BarChart/D3BarChartWithAxes';

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <LoadingData /> */}
    {/* <RenderingDataWithD3 /> */}
    {/* <RenderingDataWithD3Part2 /> */}
    {/* <D3BarChart /> */}
    <D3BarChartWithAxes />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

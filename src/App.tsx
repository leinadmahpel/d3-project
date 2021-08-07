import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import d3, { arc } from 'd3';

const width = 960;
const height = 500;
const centerX = width / 2;
const centerY = height / 2;
const strokeWidth = 20;
const eyeOffsetX = 90;
const eyeOffsetY = 100;
const eyeRadius = 40;
const mouthWidth = 20;
const mouthRadius = 140;

const BackgroundCircle = (props: { radius: number }) => (
	<circle r={props.radius} fill="yellow" stroke="black" stroke-width={strokeWidth} />
);

function App() {


	const mouthArc: any = arc()
		.innerRadius(mouthRadius)
		.outerRadius(mouthRadius + mouthWidth)
		.startAngle(Math.PI / 2)
		.endAngle((Math.PI * 3) / 2);

	return (

		<svg width={width} height={height}>
			<g transform={`translate(${centerX},${centerY})`}>
				<BackgroundCircle radius={centerY - strokeWidth / 2} />
				<circle cx={-eyeOffsetX} cy={-eyeOffsetY} r={eyeRadius} />
				<circle cx={eyeOffsetX} cy={-eyeOffsetY} r={eyeRadius} />
				<path d={mouthArc()} />
			</g>
		</svg>
	);
}

export default App;

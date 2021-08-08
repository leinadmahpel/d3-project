import React, { MouseEvent, useEffect, useState, useCallback } from 'react';
import logo from './logo.svg';
import './App.css';
import { csv, csvFormat, csvParse } from 'd3';

const width = 960;
const height = 500;
// const centerX = width / 2;
// const centerY = height / 2;
// const strokeWidth = 20;
// const eyeOffsetX = 90;
// const eyeOffsetY = 100;
// const eyeRadius = 40;
// const mouthWidth = 20;
// const mouthRadius = 140;

// const circleX = width / 2;
// const circleY = height / 2;
const circleRadius = 30 / 2;
const initMousePos = { x: width / 2, y: height / 2 };
// const BackgroundCircle = (props: { radius: number }) => (
// 	<circle r={props.radius} fill="yellow" stroke="black" strokeWidth={strokeWidth} />
// );

const csvUrl: string = 'https://gist.githubusercontent.com/leinadmahpel/e4f1faaa15761314064108ccb65b0049/raw/colors.csv';


function App() {

	const fetchText = async (url: RequestInfo): Promise<string> => {
		const response: Response = await fetch(url);
		// const text = await response.text();
		// console.log(text);
		return await response.text();
		
	}

	/* this is how you would do it with fetch, async, await; alternative is just use d3.csv which fetches and parses
	fetchText(csvUrl).then((text: string) => {
		const data: d3.DSVRowArray<string> = csvParse(text);
		let message: string = '';
		message += Math.round(text.length / 1024) + ' kB\n';
		message += data.length + ' rows\n';
		message += data.columns.length + ' columns\n';
		console.log(message);
		
		var msgContainer: HTMLElement | null = document.getElementById('message-container');
		if (msgContainer) {
			msgContainer.textContent = message;
		}
			
		// console.log(Math.round(text.length / 1024) + ' kB');
		// console.log(data.length + ' rows');
		// console.log(data.columns.length + ' columns');
	});
	*/

	// with d3.csv
	csv(csvUrl).then((data: d3.DSVRowArray<string>) => {
		let message = '';
		message += Math.round(csvFormat(data).length / 1024) + ' kB\n';
		message += data.length + ' rows\n';
		message += data.columns.length + ' columns\n';
		console.log(message);
		
		var msgContainer: HTMLElement | null = document.getElementById('message-container');
		if (msgContainer) {
			msgContainer.textContent = message;
		}
	});

	/*
	var promise: Promise<Response> = fetch(url); // dispatches a network request for the resource at this url
	// promises are a construct for dealing with asynchronous control flow
	// a promise is a thing that is in a certain state: it's either pending or it's resolved.
	// and when the promise is resolved, it either succeeds or fails
	promise.then((response: Response) => {
		var readableStream: Promise<void> = 
			response.text()
			.then((result: string) => {
				console.log(response)
			});
	}); // this is a callback function, bc it will be called back when something is ready
	*/
	// const mouthArc: any = arc()
	// 	.innerRadius(mouthRadius)
	// 	.outerRadius(mouthRadius + mouthWidth)
	// 	.startAngle(Math.PI / 2)
	// 	.endAngle((Math.PI * 3) / 2);

	const [mousePos, setMousePos] = useState(initMousePos);
	const handleMouseMove = useCallback( (event: MouseEvent) => {
		const { clientX, clientY } = event;
		//console.log({ clientX, clientY });
		//console.log(event);
		setMousePos({x: clientX, y: clientY});
	}, [setMousePos]);

	return (
		<pre id="message-container">
			<svg width={width} height={height} onMouseMove={handleMouseMove}>
					<circle cx={mousePos.x} cy={mousePos.y} r={circleRadius} fill="lightblue" stroke="yellow" />
			</svg>
		</pre>
		// <svg width={width} height={height}>
		// 	<g transform={`translate(${centerX},${centerY})`}>
		// 		<BackgroundCircle radius={centerY - strokeWidth / 2} />
		// 		<circle cx={-eyeOffsetX} cy={-eyeOffsetY} r={eyeRadius} />
		// 		<circle cx={eyeOffsetX} cy={-eyeOffsetY} r={eyeRadius} />
		// 		<path d={mouthArc()} />
		// 	</g>
		// </svg>
	);
}

export default App;

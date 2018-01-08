
import React from "react";
import PropTypes from "prop-types";

import { scaleTime } from "d3-scale";

import { ChartCanvas, Chart } from "react-stockcharts";
import { CandlestickSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import { HoverTooltip } from "react-stockcharts/lib/tooltip";
import { MouseCoordinateX} from "react-stockcharts/lib/coordinates";

import { Label } from "react-stockcharts/lib/annotation";

const formatDate = timeFormat("%Y-%m-%d %H:%M");
const priceFormat = format(".4f");

function expandedView(view) {
	return ({ currentItem, xAccessor }) => {
		return {
			x: formatDate(xAccessor(currentItem)),
			y: [
				{
					label: "open",
					value: currentItem.open && priceFormat(currentItem.open)
				},
				{
					label: "high",
					value: currentItem.high && priceFormat(currentItem.high)
				},
				{
					label: "low",
					value: currentItem.low && priceFormat(currentItem.low)
				},
				{
					label: "close",
					value: currentItem.close && priceFormat(currentItem.close)
				}
			]
				
				.filter(line => line.value)
		};
	};
}



class CandleStickChart extends React.Component {

	render() {
		const { type, width, data, ratio } = this.props;
		const xAccessor = d => d.date;
		const xExtents = [
			xAccessor(last(data)),
			xAccessor(data[data.length - 100])
		];
		const margin = { left: 80, right: 80, top: 30, bottom: 50 };
		const height = 600;
			
	
		return (
			<ChartCanvas height={600}
					ratio={ratio}
					width={width}
					margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
					type={type}
					seriesName="GBPUSD"
					data={data}
					xAccessor={xAccessor}
					xScale={scaleTime()}
					xExtents={xExtents}>

				<Chart id={1} yExtents={d => [d.high, d.low]}>
					<XAxis axisAt="bottom" orient="bottom" ticks={6} tickStroke="#FFFFFF" stroke="#FFFFFF"/>
					<YAxis axisAt="left" orient="left" ticks={5}  tickStroke="#FFFFFF" stroke="#FFFFFF"/>
					
					<MouseCoordinateX
						at="bottom"
						orient="bottom"
						displayFormat={timeFormat("%m/%d %H:%M")} />

					<Label x={(width - margin.left - margin.right) / 2} y={height - 45}
						fontSize="12" text="Time by the Minute" fill="#FFFFFF"/>

					<CandlestickSeries
						stroke={d => d.close > d.open ? "#6BA583" : "#DB0000"}
						wickStroke={d => d.close > d.open ? "#6BA583" : "#DB0000"}
						fill={d => d.close > d.open ? "#6BA583" : "#DB0000"} />

					<HoverTooltip
						yAccessor={d=>d.close}
						tooltipContent={expandedView()}
						fontSize={15}
						bgwidth={50}
						bgheight={100}
					/>
				</Chart>

			</ChartCanvas>
		);
	}
}

CandleStickChart.propTypes = {
	data: PropTypes.array.isRequired,
	width: PropTypes.number.isRequired,
	ratio: PropTypes.number.isRequired,
	type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

CandleStickChart.defaultProps = {
	type: "svg",
};
CandleStickChart = fitWidth(CandleStickChart);

export default CandleStickChart;

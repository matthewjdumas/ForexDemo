
import React from 'react';
import { render } from 'react-dom';
import Chart from './Chart';
import { getData } from "./utils"

import { TypeChooser } from "react-stockcharts/lib/helper";
import DateWrapper from "./DateWrapper"
import './index.css'

class ChartComponent extends React.Component {
	constructor(props){
		super(props);

		
		this.handleStartChange = this.handleStartChange.bind(this);
		this.handleEndChange = this.handleEndChange.bind(this);
		this.dates = {endDate:'2017-12-07 23:00:00', startDate:'2017-12-07 00:00:00'};
	}

	componentDidMount() {
		getData(this.dates.endDate, this.dates.startDate).then(data => {
			this.setState({data})
		});
	}
	
	

	handleStartChange(startDate){
		if (Date.parse(startDate) < Date.parse(this.dates.endDate)){
			this.dates.startDate = startDate;
			getData(this.dates.endDate, this.dates.startDate).then(data => {
				this.setState({data})
			});
		} else {
			alert("Start date must be before end date.")
		}

	}

	handleEndChange(endDate){
		if (Date.parse(endDate) > Date.parse(this.dates.startDate)){
			this.dates.endDate = endDate;
			getData(this.dates.endDate, this.dates.startDate).then(data => {
				this.setState({data})
			});
		} else {
			alert("End Date cannot be before start date.")
		}
	}

	
	render() {
		if (this.state == null) {
			return <div>Loading...</div>
		}
		return (
			<div>
				<div id="date_range">
					<div id="innerDates">
				        <p class="date_label">Chart Start Date:</p>
				        <div id="dt_start"><DateWrapper id="date_start" maxDate="2017-12-29" minDate="2000-01-01" defaultValue={this.dates.startDate} onDateChange={this.handleStartChange}/></div>
				        <br/>
				        <p class="date_label">Chart End Date:</p>
				        <div id="dt_end"><DateWrapper id="date_end" maxDate="2017-12-29" minDate="2000-01-01" defaultValue={this.dates.endDate} onDateChange={this.handleEndChange}/></div>
				    </div>
			    </div>
	      		<div id="chart">
	      			<TypeChooser>
						{type => <Chart type={type} data={this.state.data} />}
					</TypeChooser>
				</div>
			</div>
		)
	}
}


render(	<ChartComponent />,	document.getElementById("generated_content") );

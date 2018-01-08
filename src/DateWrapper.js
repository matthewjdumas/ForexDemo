
import React from 'react';
import DateTime from 'react-datetime';
import './react-datetime.css';

class DateWrapper extends React.Component { 
	
	constructor(props){
		super(props);
		this.state = { date: new Date(this.props.defaultValue), maxDate:new Date(this.props.maxDate), minDate:new Date(this.props.minDate), dateFormat: 'YYYY-MM-DD', timeFormat:"HH:MM:SS" };
		this.updateDate = this.updateDate.bind(this);
		this.valid = this.valid.bind(this);
	}

	valid(current){
		if (current.isBefore(this.state.minDate) || current.isAfter(this.state.maxDate)){
			return false;
		}
		return true;
	}

	updateDate(e) {
		var cur_day = e._d.getDate();
		var cur_mo = e._d.getMonth() + 1;
		var cur_yr = e._d.getFullYear();

		var cur_h = e._d.getHours();
		var cur_m = e._d.getMinutes();
		var cur_s = e._d.getSeconds();


		cur_mo = (cur_mo < 10) ? "0" + cur_mo : cur_mo;
		cur_day = (cur_day < 10) ? "0" + cur_day : cur_day;
		cur_h = (cur_h < 10) ? "0" + cur_h : cur_h;
		cur_m = (cur_m < 10) ? "0" + cur_m : cur_m;
		cur_s = (cur_s < 10) ? "0" + cur_s : cur_s;

		this.setState({date : cur_yr + "-" + cur_mo + "-" + cur_day + " " + cur_h + ":" + cur_m + ":" + cur_s});
		this.props.onDateChange(this.state.date);
	}

	render() {
		const date = this.state.date;

		return (

			<DateTime 
				dateFormat={this.state.dateFormat}
				defaultValue={date}
				onChange={this.updateDate}	
				value={date}
				isValidDate={this.valid}
			/>
			

		);
	}

}

export default DateWrapper;
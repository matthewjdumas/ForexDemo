import { timeParse } from "d3-time-format";

const parseDate = timeParse("%Y-%m-%d %H:%M:%S");

function fixDate(k,v){
	 if (k==="date"){
	 	v = parseDate(v);
	 }
	 return v;
}

function parseDataJSON (data) {
	var d = JSON.parse(data, fixDate); 
	return d;
}

export function getData(maxDate, minDate) {
	var formData = new FormData();
	formData.append('maxDate', maxDate);
	formData.append('minDate', minDate);

	const promiseGBPUSD = fetch("https://thehome.bar/rest/read.php", {
		method:"POST",
		body: formData, 
	})
		.then(response => response.text())
		.then(data => parseDataJSON(data));

	return promiseGBPUSD;
}

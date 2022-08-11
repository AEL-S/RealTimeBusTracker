 mapboxgl.accessToken = 'yourAccessTokenHere';

var markers = [];

var map = new mapboxgl.Map({
    container: 'map',
	style: 'mapbox://styles/mapbox/dark-v10',
    center: [-71.104081, 42.365554],
    zoom: 14

});

// this adds a marker to MIT - doesn't move
// var marker = new mapboxgl.Marker()
//     .setLngLat([-71.092761, 42.357575])
//     .addTo(map);

	async function run(){
if (markers.length > 0) {
	markers.forEach((marker) => marker.remove());
}

		const locations = await getBusLocations();
	console.log(new Date());
	console.log (locations);

		locations.forEach((element) => {
		const el = document.createElement('div');
			el.className = 'marker';

		var marker = new mapboxgl.Marker()
    		.setLngLat([
			element.attributes.longitude,
			element.attributes.latitude,
		])
    		.addTo(map);
			markers.push(marker)
		})

	console.log(new Date());
	setTimeout(run,15000);
}

	async function getBusLocations(){
		const url = 'https://api-v3.mbta.com/vehicles?api_key=ca34f7b7ac8a445287cab52fb451030a&filter[route]=1&include=trip';	
		const response = await fetch(url);
		const json     = await response.json();
	return json.data;
}

 run();


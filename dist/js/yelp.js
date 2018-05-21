'use strict';

(function () {

	var API_KEY = 'xICUj5FsqM8P6cfNhFQEYwtYzrv75F4WEqj-Hns-fUTZgyLOzQBVyr01f9g3p-5P3J9S7LkrGhLEWjqi7t_ZHoZedrj9zV1E34GIIu1nLLF814cws_futxGtRGPiWnYx';

	var termEl = document.getElementById('term');
	var locationEl = document.getElementById('location');
	var searchBtn = document.getElementById('search');
	var resultsEl = document.getElementById('results');

	var YelpMarkersArray = [];

	searchBtn.addEventListener("click", function (e) {
		e.preventDefault();

		var queryTerm = termEl.value;
		var location = locationEl.value;
		var prices = getCheckedValues(document.querySelectorAll('[name=price]:checked'));

		searchYelp(location, queryTerm, prices);
	});

	function getCheckedValues(checkedItems) {
		console.log('checked', checkedItems);

		var allChecked = '';
		for (var i = checkedItems.length - 1; i >= 0; i--) {
			var checkedItem = checkedItems[i];
			allChecked = allChecked + ', ' + checkedItem;
		}

		return allChecked;
	}

	function displayBusinesses(businessArray) {

		resultsEl.innerHTML = '';

		for (var i = 0; i <= businessArray.length - 1; i++) {

			var currentBusiness = businessArray[i];
			var currentBusinessLocation = businessArray[i].location;
			var liEl = document.createElement('li');
			var aEl = document.createElement('a');
			var imgEl = document.createElement('img');
			var pAddressEl = document.createElement('p');
			var p$El = document.createElement('p');
			var pRatingEl = document.createElement('p');
			imgEl.style.width = "200px";
			var coordinatesLat = currentBusiness.coordinates.latitude;
			var coordinatesLong = currentBusiness.coordinates.longitude;

			aEl.innerHTML = currentBusiness.name;
			aEl.href = currentBusiness.url;
			imgEl.src = currentBusiness.image_url;
			pAddressEl.innerHTML = currentBusinessLocation.address1 + "<br/>" + currentBusinessLocation.city + ", " + currentBusinessLocation.state + " " + currentBusinessLocation.zip_code;
			p$El.innerHTML = currentBusiness.price;
			pRatingEl.innerHTML = "Rating " + currentBusiness.rating;

			liEl.appendChild(aEl);
			liEl.appendChild(imgEl);
			liEl.appendChild(pAddressEl);
			liEl.appendChild(p$El);
			liEl.appendChild(pRatingEl);

			resultsEl.appendChild(liEl);

			YelpMarkersArray.push({
				lat: coordinatesLat,
				lng: coordinatesLong

			});

			GoogleMapModule.showMarkers(YelpMarkersArray);
		}
	}

	function searchYelp(location, queryTerm, prices) {
		axios.get("https://circuslabs.net/proxies/yelp-fusion-proxy/", {
			params: {
				'_ep': '/businesses/search',
				'term': queryTerm,
				'location': location
			},
			headers: {
				'Authorization': 'Bearer ' + API_KEY
			}
		}).then(function (response) {
			console.log('here is the get response data for key:', response.data, response);
			displayBusinesses(response.data.businesses);
		});
	}
})();
//# sourceMappingURL=yelp.js.map

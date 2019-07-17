function request(url, cb) {
	console.log(url);
	fetch(url)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			return cb(data);
		})
		.catch((error) => {
			console.log(error);
		});
}

const countryInput = document.getElementById('country');

const countryList = document.getElementById('countrylist');

const button = document.getElementById('m');

countryInput.addEventListener('keyup', function() {
	var country = countryInput.value;
	console.log(country);
	request(`/search/${country}`, (data) => {
		countryList.innerHTML = '';
		countryList.style.display = 'none';
		var node = document.createElement('LI');
		for (let i = 0; i < 5; i++) {
			countryList.style.display = 'block';
			var textnode = document.createTextNode(data.filteredData[i].name);
			console.log('data', data);
			node.appendChild(textnode);
			const br = document.createElement('br');
			node.appendChild(br);

			if (data.filteredData[i] !== undefined) {
				countryList.appendChild(node);
			}
		}
	});
});



function request(url, cb) {
  fetch(url)
    .then(response => {
      return response.json();
    })
    .then(data => {
      return cb(data);
    })
    .catch(error => {
      console.log(error);
    });
}
const countryInput = document.getElementById("country");



const buttonsearch = document.getElementById("buttonsearch");
country.addEventListener("input", function() {

  const input = countryInput.value;
  console.log("hellllo", input);
  request(`/search/${input}`, data => {
    console.log("dataa", data);

    var ul = document.createElement("ul");
    ul.setAttribute("id", "countryName");
    for (var i = 0; i < data.length; i++) {
      var li = document.createElement("li");
      li.setAttribute("class", "item");
      var valueofarray = document.createTextNode(data[i].name);
      li.appendChild(valueofarray);
      ul.appendChild(li);
    }
    var sec = document.getElementById("section-res");
    sec.innerHTML = "";
    sec.appendChild(ul);
  });
});

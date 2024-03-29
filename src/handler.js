
	const fs = require("fs");
const path = require("path");

const homeHandler = (request, response) => {
  const filePath = path.join(__dirname, "..", "public", "index.html");
  console.log("filepath", filePath);

  fs.readFile(filePath, (error, file) => {
    if (error) {
      console.log("notdone");
      response.writeHead(500, {
        "Content-Type": "text/html"
      });
      response.end("<h1>server error</h1>");
    } else {
      console.log("done");
      response.writeHead(200, {
        "Content-Type": "text/html"
      });
      response.end(file);
    }
  });
};

const publicHandler = (request, response, url) => {
  const extension = url.split(".")[1];
  const extensionType = {
    html: "text/html",
    css: "text/css",
    js: "application/javascript",
    jpg: "img/jpg",
    txt: "text/plain",
    ico: "image/x-icon"
  };

  const filePath = path.join(__dirname, "..", "public", url);
  fs.readFile(filePath, (error, file) => {
    if (error) {
      response.writeHead(500, {
        "Content-Type": "text/html"
      });
      response.end("<h1>server error</h1>");
    } else {
      response.writeHead(200, {
        "Content-Type": extensionType[extension]
      });
      response.end(file);
    }
  });
};

const searchHandler = (request, response) => {
  let inputValue = request.url.split("/")[2];
  console.log("input text", inputValue);
  const filePath = path.join(__dirname, "country.json");
  console.log("search file path", filePath);
  fs.readFile(filePath, "utf8", (error, file) => {
    if (error) {
      response.writeHead(500, {
        "Content-Type": "text/html"
      });
      console.log(error);
      response.end("<h1>server error</h1>");
    } else if (inputValue.length > 0) {
      response.writeHead(200, { "Content-Type": "application/json" });
  
      const allList = JSON.parse(file);
      const capitalizedFirstLetter = inputValue[0].toUpperCase();
  
      inputValue = capitalizedFirstLetter + inputValue.slice(1);
     
      const filteredData = allList.filter(element => {
        return element.name.indexOf(inputValue) === 0;
      });

      const country = JSON.stringify(filteredData);
    
      console.log("file text", JSON.stringify(country));
      response.end(country);
    } else {
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify(country));
    }
  });
};

module.exports = { homeHandler, publicHandler, searchHandler };


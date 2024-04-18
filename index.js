const express = require('express');
const path = require('path');
var fs = require('fs');
const cors = require('cors');

const app = express();

//const cors = require('cors'); // #2

app.use(cors()); // #3

app.use(express.static('public')); //app.use(express.static(path.join(__dirname, 'public'))); I couldn't get this to work

//app.use(express.urlencoded( { extended: true } ) // Add this middleware

app.get('/api', (req, res) => {
	res.json(`HTTP GET request received`);
})



app.listen(3000, () => {
	console.log("App listening on port 3000");
})

// #2
app.use(cors());
app.use(express.urlencoded({ extended: true })) //if you want to do this with just the upload root, change this to middle (check tutorial at 11:00)

app.post('/upload', function(req, res){
  console.log("hello")
	//Handle form upload
  console.log("This is the data:")
  console.log("This is the data:")
  console.log(req.body);
  let data = `${req.body.firstName}, ${req.body.location}`
  //console.log(data.get("firstName"))
  //let data = req.body
  //console.log(data.get("firstName"))
	writeData(data);
})

function writeData(data){
	//const tableData = ["John", "39, -77"];
  //let csvData = String(data)+"\n";
  let stringData = String(data)
  let name = stringData.substring(0, stringData.indexOf(","))
  console.log("Name " + name)
  let latitude = stringData.substring(stringData.indexOf("Latitude") + 10, stringData.indexOf("Longitude") - 2)
  let longitude = stringData.substring(stringData.indexOf("Longitude") + 11, stringData.length)
  let csvData = name + ", " + latitude + ", " + longitude + ", " + latitude + " " + longitude + "\n"
			//const csv = tableData.join(',') + "\n";
			let output_name = "userData.csv";
			fs.appendFile(output_name, csvData, (err) => {
			if (err) throw err;
			});

      let output_testing = "public/testing.csv";
      fs.appendFile(output_testing, csvData, (err) => {
      if (err) throw err;
      });
	
	}

app.use((req, res) => {
  res.status(404);
  res.sendFile(path.join(__dirname, 'public', '404.html')); //This code may not work, it was a suggestion. I would need a 404.html page
  //Here's the suggested code:
  //res.sendFile(`<h1>Error 404: Resource Not Found T-T</h1>`)
})
//writeData();


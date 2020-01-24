// Dependencies
const express = require("express");
const path = require("path");

// Set up express
const app = express();
const PORT = process.env.PORT || 3005;

//Set handle data parsing
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

//array 
const resList = [];
// console.log(resList);

const waitList = [];


//Basic route that sends the user first to the AJAX page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/reserve", function (req, res) {
    res.sendFile(path.join(__dirname, "res.html"));
});

app.get("/tables", function (req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});


app.post("/api/tables", function (req, res) {
    return res.json(resList);
})

app.post("/api/tables", function (req, res) {
    return res.json(waitList);
})



// Creating List
app.post("/api/tables", function (req, res) {
    //req.body hosts is equal to the JSON post sent from the user
    //This works because of our body parsing middleware
    var newRes = req.body;

    if (resList.length <= 5) {
        resList.push(newRes);
    } else {
        waitList.push(newRes);
    }

});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
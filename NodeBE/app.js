'use strict';
// using file stream library to read and write json file
const fs = require('fs');
var cors = require('cors')
const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();
// enable cors to access this site from another port or url.
app.use(cors())
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())
var Twitter = require('twitter');
app.get('/',(req,res) => {
    var client = new Twitter({
        consumer_key: 'RVk1UUwwWVJxUlZRenpHeXJkR1A6MTpjaQ',
        consumer_secret: '2uZSORdMs1PRCB8uiq54Yn218JwhtChBcm1I01VD0u-Ez1pn6C',
        access_token_key: '1537039563373391873-01r2DsF2fGsKcpLkeLEnWvxR5t86FZ',
        access_token_secret: 'LaRwpeCdHzEBzuqOywDMZpcinIZcDb4LOwFbBTa5EoOI3'
        
        });
        console.log(client);
        var params = {screen_name: 'nodejs'};
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
        console.log(tweets);
        console.log(response);
        }
        });
});
// to get all workitems
app.get('/getAllWorkItems', (req, res) => {
    let rawdata = fs.readFileSync('workItems.json');
    let workItems = JSON.parse(rawdata);
    res.json(workItems);
});
// post methord - to update the title of a work item
app.post('/updateWorkItem', (req, res) => {
    // loading json file
    let rawdata = fs.readFileSync('workItems.json');
    let workItems = JSON.parse(rawdata);
    // updating the title based on id
    for(var i=0;i<workItems.length;i++){
        if(workItems[i].ID == req.body.id){
            workItems[i].Title = req.body.title;
        }
    }
    // saving the updated json file
    fs.writeFile('workItems.json', JSON.stringify(workItems), function writeJSON(err) {
        if (err) return console.log(err);
      });
    res.json(true);
});

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
let friendsData = require("../data/friends");

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.json(friendsData);
    });

    app.post("/api/friends", function(req, res) {
        // res.json(true);
        
        //insert compatibility logic here
        
        let totalDifference = 50; //set initial totalDifference very high
        let tempDifference = 0;
        let bestMatches = [];
        
        for (let i = 0; i < friendsData.length; i++) {
            for (let j = 0; j < friendsData[i].scores.length; j++) {
                tempDifference = tempDifference + Math.abs(req.body.scores[j] - friendsData[i].scores[j]);
            };

            if (tempDifference <= totalDifference) {
                totalDifference = tempDifference;
                bestMatches.push(friendsData[i]);
            };

            tempDifference = 0;

        };
        
        res.json(bestMatches);
        // res.json(false); option to add if no matches found or errors occur
        friendsData.push(req.body);
    });



};



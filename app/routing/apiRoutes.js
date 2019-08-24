let friendsData = require("../data/friends");

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.json(friendsData);
    });

    app.post("/api/friends", function(req, res) {
        let differencesArray = []; //all the absolute differences
        let totalDifference = 0;
        let minDifference = 50; //set an arbitrary high number
        let bestMatches = [];
        
        for (let i = 0; i < friendsData.length; i++) {
            for (let j = 0; j < friendsData[i].scores.length; j++) {
                totalDifference = totalDifference + Math.abs(req.body.scores[j] - friendsData[i].scores[j]);
            };

            differencesArray.push(totalDifference);

            totalDifference = 0;

        };

        for (let k = 0; k < differencesArray.length; k++) {
            if (differencesArray[k] < minDifference) {
                minDifference = differencesArray[k];
            };
        };

        for (let l = 0; l < differencesArray.length; l++) {
            if (differencesArray[l] === minDifference) {
                bestMatches.push(friendsData[l]);
            };
        };
        
        res.json(bestMatches);
        friendsData.push(req.body);
    });

};



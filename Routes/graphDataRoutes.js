const { Intrested } = require('../Models/models');
const fs = require('fs');
var graphDataRoutes = (app) => {
    app.post('/api/statistic', (req, res) => {
        console.log(req.body);
        Intrested.find().sort({
            "_id": -1
        }).limit(1).then((post) => {
            if (post[0]) {
                const now = Date.now();
                var t = ((now - +post[0].timeStamp) / 600000);
                console.log(t);
                if (t < 1) {
                    countA = req.body.countA;
                    countNA = req.body.countNA;
                    console.log('here');
                    Intrested.findByIdAndUpdate(post[0]['_id'], {
                        $set: {
                            timeStamp: post[0].timeStamp,
                            countA: countA,
                            countNA: countNA
                        }
                    }, {
                        new: true
                    }).then(
                        docs => res.send(docs),
                        err => res.send(err)
                    );
                } else {
                    var time = +post[0].timeStamp;
                    while (t > 1) {
                        var i = Intrested({
                            timeStamp: time + 600000,
                            countA: 0,
                            countNA: 0
                        });
                        i.save();
                        time = time + 600000;
                        t = t - 1;
                    }
                    countA = req.body.countA;
                    countNA = req.body.countNA;
                    Intrested.findByIdAndUpdate(post[0]['_id'], {
                        $set: {
                            timeStamp: time - 600000,
                            countA: countA,
                            countNA: countNA
                        }
                    }, {
                        new: true
                    }).then(
                        docs => res.send(docs),
                        err => res.send(err)
                    );
                }
            } else {
                var ins = Intrested({
                    countA: 0,
                    countNA: 0
                });
                ins.save();
            }


        });
    });
    app.get('/api/people', (req, res) => {
        var data = JSON.parse(fs.readFileSync(__dirname + '/../4forces3.json'));
        res.send(data);
        Intrested.find().sort({
            "_id": -1
        }).limit(1).then((post) => {
            if (post[0]) {
                const now = Date.now();
                var t = ((now - +post[0].timeStamp) / 600000);
                console.log(t);
                if (t < 1) {
                    countA = data.len;
                    countNA = 0;
                    console.log('here');
                    Intrested.findByIdAndUpdate(post[0]['_id'], {
                        $set: {
                            timeStamp: post[0].timeStamp,
                            countA: countA,
                            countNA: countNA
                        }
                    }, {
                        new: true
                    }).then();
                } else {
                    var time = +post[0].timeStamp;
                    while (t > 1) {
                        var i = Intrested({
                            timeStamp: time + 600000,
                            countA: 0,
                            countNA: 0
                        });
                        i.save();
                        time = time + 600000;
                        t = t - 1;
                    }
                    countA = data.len;
                    countNA = 0;
                    Intrested.findByIdAndUpdate(post[0]['_id'], {
                        $set: {
                            timeStamp: time - 600000,
                            countA: countA,
                            countNA: countNA
                        }
                    }, {
                        new: true
                    }).then();
                }
            } else {
                var ins = Intrested({
                    countA: 0,
                    countNA: 0
                });
                ins.save();
            }


        });
    });
    app.get('/api/stats', (req, res) => {
        console.log(typeof (+req.query.no));
        Intrested.find().sort({
            "_id": -1
        }).limit(+req.query.no).then(
            (docs) => {
                console.log(docs.length);
                res.send(docs)
            },
            (err) => res.send(err)
        );
    });
}

module.exports = {
    graphDataRoutes
}
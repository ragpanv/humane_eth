var express = require('express');
var bodyParser = require('body-parser');
const morgan = require('morgan');
var mongoose = require('mongoose');
const web3 = require('web3');

const ObjectID = require('mongodb').ObjectId;
const Donor = require('./models/Donor');
const { name, render } = require('ejs');
const app = express()
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(express.static('views'));
app.use(express.static('css'));
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}))

mongoose.connect('mongodb://localhost:27017/humane', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;
db.on('error', () => console.log("error in connecting to the databse"));
db.on('open', () => console.log("connected to database"));

app.get("/add_projects_req", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": "*"
    })
    return res.redirect('add_projects_req');
})

app.get("/org", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.render('org');
})

app.post("/donor", (req, res) => {
    var name = req.body.name;
    var mail = req.body.email;
    var phone = req.body.phone;
    var adhaar = req.body.adhaar;
    var password = req.body.pass;

    var data = {
        "Name": name,
        "Email": mail,
        "MobileNo": phone,
        "Adhaar": adhaar,
        "Password": password
    }
    db.collection('donor').findOne({ $and: [{ Name: name }, { Adhaar: adhaar }, { Email: mail }, { MobileNo: phone }] }, function (err, user) {
        if (user != null) {
            console.log(name);
            return res.render('login-donor');
        }
        else {
            console.log(mail);
            db.collection('donor').insertOne(data, (err, collection) => {
                if (err) {
                    throw err;
                }
                console.log("REcord inserted successfully");
                db.collection("transaction").find().sort({"Timestamp":-1}).limit(6).toArray(function (err, result) {
                    if (err) throw err;
                   return res.render('home-donor', { trans: result });
                })
            });
        }
    });
})
app.get('/donor', (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.render('donor');
});

app.post("/ben", (req, res) => {
    var name = req.body.name;
    var mail = req.body.email;
    var phone = req.body.phone;
    var adhaar = req.body.adhaar;
    var password = req.body.pass;
    var data = {
        "Name": name,
        "Email": mail,
        "MobileNo": phone,
        "Adhaar": adhaar,
        "Password": password
    }
    db.collection('ben').findOne({ $and: [{ Name: name }, { Adhaar: adhaar }, { Email: mail }, { MobileNo: phone }] }, function (err, user) {
        if (user != null) {
            console.log(name);
            return res.render('login-ben');
        }
        else {
            console.log(mail);
            db.collection('ben').insertOne(data, (err, collection) => {
                if (err) {
                    throw err;
                }
                console.log("REcord inserted successfully");
                db.collection("transaction").find().sort({"Timestamp":-1}).limit(6).toArray(function (err, result) {
                    if (err) throw err;
                   return res.render('home-donor', { trans: result });
                })
            });
        }
    });
})

app.get('/home-donor', (req, res) => {
    db.collection("transaction").find().sort({"Timestamp":-1}).limit(6).toArray(function (err, result) {
        if (err) throw err;
       return res.render('home-donor', { trans: result });
    })
});
app.get('/home-ben', (req, res) => {
    db.collection("transaction").find().sort({"Timestamp":-1}).limit(6).toArray(function (err, result) {
        if (err) throw err;
       return res.render('home-ben', { trans: result });
    })
});
app.get('/transaction', (req, res) => {
    db.collection("transaction").find().sort({"Timestamp":-1}).toArray(function (err, result) {
        if (err) throw err;
       return res.render('transaction', { trans: result });
    })
});
app.get('/login-ben', (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.render('login-ben');
});

app.get('/login-donor', (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.render('login-donor');
});
app.post("/login-ben", (req, res) => {
    var mail = req.body.email;
    var password = req.body.pass;
    db.collection('ben').findOne({ Email: mail, Password: password }, function (err, user) {
        console.log(mail, password);
        if (user == null) {
            res.render('login-ben');
        }
        console.log(user);
        db.collection("transaction").find().sort({"Timestamp":-1}).limit(6).toArray(function (err, result) {
            if (err) throw err;
           return res.render('home-ben', { trans: result });
        })
    });
})
app.post("/login-donor", (req, res) => {
    var mail = req.body.email;
    var password = req.body.pass;
    db.collection('donor').findOne({ Email: mail, Password: password }, function (err, user) {
        console.log(mail, password);
        if (user == null) {
            res.render('login-donor');
        }
        console.log(user);
        db.collection("transaction").find().sort({"Timestamp":-1}).limit(6).toArray(function (err, result) {
            if (err) throw err;
           return res.render('home-donor', { trans: result });
        })
    });
})
app.get('/ben', (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.render('ben');
});

app.post("/org", (req, res) => {
    var name = req.body.name;
    var mail = req.body.email;
    var phone = req.body.phone;
    var id = req.body.id;
    var bid = req.body.bid;

    var data = {
        "Name": name,
        "Email": mail,
        "MobileNo": phone,
        "Id": id,
        "Bid": bid,
    }
   
    db.collection('org').findOne({ $or: [{ Bid: bid }, { Name: name }, { Id: id }, { MobileNo: phone }] }, function (err, user) {
        console.log(bid);
        if (user != null) {
            return res.redirect('org_err.html');
        }
        else {
            db.collection('org').insertOne(data, (err, collection) => {
                if (err) {
                    throw err;
                }
                console.log("REcord inserted successfully");
                return res.redirect('admin/admin.html');
            });
        }
    });
})
app.get('/org', (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.render('org');
});
app.post("/signup", (req, res) => {
    var fullname = req.body.fullname;
    var email = req.body.email;
    var phone = req.body.phone;
    var password = req.body.password;

    var data = {
        "Fullname": fullname,
        "Email": email,
        "MobileNo": phone,
        "Password": password
    }
    db.collection('user').insertOne(data, (err, collection) => {
        if (err) {
            throw err;
        }
        console.log("REcord inserted successfully");
    });
    return res.render('login')
})
app.get("/signup", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.render('signup');
})
app.get("/signup-ben", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.render('signup-ben');
})
app.get("/signup-donor", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.render('signup-donor');
})
app.get("/login", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.render('login');
})
app.get('/ben-display', (req, res) => {

    db.collection("ben").find().sort().toArray(function (err, result) {
        if (err) throw err;
        res.render('ben_display', { bens: result });
    })
});
app.get('/donor-display', (req, res) => {

    db.collection("donor").find().sort().toArray(function (err, result) {
        if (err) throw err;
        res.render('donor_display', { donors: result });
    })
});
app.get('/admin/req-proj-display', (req, res) => {

    db.collection("add_projects_req").find().sort().toArray(function (err, result) {
        if (err) throw err;

        res.render('req_proj_display', { requ: result });
    })
});
app.get('/admin/req_proj_display', (req, res) => {
  
    const u = Object.keys(req.query)
    const uid = u[0];
    console.log('1 ', uid);

    if (uid) {
        db.collection('add_projects_req').findOne({ "_id": new ObjectID(uid) }, function (err, user) {

            console.log(user);
            db.collection('projects_to_donate').insertOne(user, (err, collection) => {
                if (err) {
                    console.log('check details');
                    res.render('admin/admin.html');
                }
                console.log("REcord inserted successfully");
            });
            db.collection("add_projects_req").deleteOne({ "_id": new ObjectID(uid) }, function (err, result) {
                if (err) throw err;
                console.log(req.query.id + 'deleted');
                db.collection("add_projects_req").find().sort().toArray(function (err, result) {
                    if (err) throw err;
                    res.render('req_proj_display', { requ: result });
                })
            })
            return app.get('projects-to-donate');

        });
    }
    else {
        console.log('check');
        return res.redirect('admin.html')
    }

});
app.get('/donate_details', (req, res) => {
    const u = Object.keys(req.query)
    const uid = u[0];
    console.log('donate id ', uid);
    db.collection("projects_to_donate").findOne({ "_id": new ObjectID(uid) }, function (err, result) {
        if (err) throw err;
        console.log(result);
        return res.render('donate_details', { proj: result })
    })
})

app.get('/update_amount', (req, res) => {
    console.log(req.query.id, req.query.m);


    db.collection('transaction').findOne({ "Tid": req.query.tid }, function (err, user) {
        if (user == null) {
            db.collection('transaction').insertOne({ "Tid": req.query.tid, "From": req.query.from, "To": req.query.to, "Timestamp": new Date() }, (err, collection) => {

                db.collection('projects_to_donate').findOne({ "_id": new ObjectID(req.query.id) }, function (err, user) {
                    console.log('yyyyyyyyyy');
                    console.log(user)
                    if (user != null) {
                        db.collection("projects_to_donate").updateOne({ "_id": new ObjectID(req.query.id) },
                            { $set: { "AvailableAmount": (Number(user.AvailableAmount) + Number(req.query.m)).toString(), "RequiredAmount": (user.RequiredAmount - req.query.m).toString() } }
                            , function (err, res) {
                                if (err) throw err;
                                console.log("1 document updated");
                            });
                    }
                });
            });
           return res.render('thank_you', { 'tid': req.query.tid });
        }
        res.redirect('org_err.html');
    });

   
})

app.get('/org-display', (req, res) => {

    db.collection("org").find().sort().toArray(function (err, result) {
        if (err) throw err;
        res.render('org_display', { orgs: result });
    })
});
app.post('/', (req, res) => {
    res.sendFile('./views/index.html', { root: __dirname });
});
app.get('/index.html', (req, res) => {
    res.sendFile('./public/index.html', { root: __dirname });
});

app.get('/projects-to-see', (req, res) => {
    db.collection("projects_to_donate").find().sort().toArray(function (err, result) {
        if (err) throw err;
        res.render('projects_to_see', { projs: result });
    })
});
app.get('/projects-to-donate', (req, res) => {
    db.collection("projects_to_donate").find().sort().toArray(function (err, result) {
        if (err) throw err;
        res.render('projects_to_donate', { projs: result });
    })
});
app.post("/add_projects_req", (req, res) => {
    var name = req.body.name;
    var desc = req.body.desc;
    var mail = req.body.email;
    var phone = req.body.phone;
    var amount = req.body.amount;
    var adhaar = req.body.adhaar;
    var projholder = req.body.projholder;
    var bid = req.body.bid;
    var data = {
        "Name": name,
        "Desc": desc,
        "Email": mail,
        "MobileNo": phone,
        "Amount": amount,
        "Adhaar": adhaar,
        "ProjectHolder": projholder,
        "Bid": bid,
        "AvailableAmount": 0,
        "RequiredAmouont": amount
    }
    db.collection('add_projects_req').findOne({ $and: [{ ProjectHolder: projholder }, { Name: name }, { Adhaar: adhaar }, { MobileNo: phone }] }, function (err, user) {
        console.log(projholder);
        if (user != null) {
            console.log(user);
            return res.redirect('org_err.html');
        }
        else {
            db.collection('add_projects_req').insertOne(data, (err, collection) => {
                if (err) {
                    throw err;
                }
                console.log("REcord inserted successfully");
                return res.redirect('success.html')
            });
        }
    });
})
app.get('/add-projects-req', (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": "*"
    })
    return res.render('add_projects_req');
});

app.use((req,res)=>{
    res.sendFile('./public/index.html',{root: __dirname});
})
app.listen(5000);

console.log("listening on port 5000");
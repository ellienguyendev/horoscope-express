const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;

const url = "mongodb+srv://726:2019@cluster0-stpgj.mongodb.net/test?retryWrites=true&w=majority";
const dbName = "horoscope";

app.listen(2000, () => {
  MongoClient.connect(url, {
    useNewUrlParser: true
  }, (error, client) => {
    if (error) {
      throw error;
    }
    db = client.db(dbName);
    console.log("Connected to `" + dbName + "`!");
  });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('signs').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {
      signs: result
    })
  })
})

app.post('/input', (req, res) => {
  db.collection('signs').save({
    name: req.body.name,
    month: req.body.month,
    day: req.body.day,
    color: "000"
  }, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})


app.put('/like', (req, res) => {
  db.collection('signs')
    .findOneAndUpdate({
      name: req.body.name,
      month: req.body.month,
      day: req.body.day,
      color: "000"
    }, {
      $set: {
        color: "B22E28"
      }
    }, {
      sort: {
        _id: -1
      },
      upsert: true
    }, (err, result) => {
      if (err) return res.send(err)
      res.send(result)
    })
})

app.delete('/delete', (req, res) => {
  db.collection('signs').findOneAndDelete({
    name: req.body.name,
    month: req.body.month,
    day: req.body.day
  }, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})

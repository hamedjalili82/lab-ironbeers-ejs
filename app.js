const express = require('express');
const expressLayouts = require('express-ejs-layouts');
// const { request } = require('http');

const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);

app.use(express.static(path.join(__dirname, 'public')));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

// app.get('/beers', (req, res) => {
//   res.render('beers');
// });

app.get("/beers", (request, response) => {
  punkAPI
    .getBeers()
    .then(beers => {
      console.log ("Beers from the database:", beers);
      response.render("beers", {data: beers});
    })

    .catch(error => {
      console.log(error);
    res.send('Error retrieving beers');
});
// app.get('/beers', (req, res) => {
//   punkAPI
//     .getBeers()
//     .then(beersFromApi => {
//       res.render('beers', { beers: beersFromApi });
//     })
//     .catch(error => {
//       console.log(error);
//       res.send('Error fetching beers');
//     });
});


// });

// app.get('/random-beer', (req, res) => {
//   res.render('random-beer');
// });

// app.get("/random-beer", (req, res) => {
//   punkAPI
//     .getRandom()
//     .then(random => {
//       response.render("random-beer", {data: random[0]});
//       console.log ("Random beers from punkAPI", random);
//     })
//     .catch(error => console.log(error));  
// });

// });


app.get('/random-beer', (req, res) => {
  punkAPI
  .getRandom()
    .then(responseFromAPI => {
      const beer = responseFromAPI[0]; // Assuming the response is an array of beers, and you want the first one
      res.render('random-beer', { beer});
    })
    .catch(error => console.log(error));
});




// app.get('/beers', (req, res) => {
 
//   const beers = [
//     { name: 'Beer 1', type: 'Ale' },
//     { name: 'Beer 2', type: 'Lager' },
//     { name: 'Beer 3', type: 'Stout' },
 
//   ];

//   res.render('beers', { beers });
// });

app.listen(3000, () => console.log('🏃‍ on port 3000'));

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) =>
{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) =>
{
  if(err)
  {
    console.log('Unable to append file.');
  }
});
  next();
});

// maintenance page
// app.use((req, res, next) =>
// {
//   res.render('maintenance.hbs',
//   {
//     pageTitle: 'Maintenance'
//   });
// });

app.use(express.static(__dirname + '/public'));
// prevent access to public folder html page since order determines execution.

hbs.registerHelper('getCurrentYear', () =>
{
  return new Date().getFullYear();
});

hbs.registerHelper('scream', (text) =>
{
  return text.toUpperCase();
});

app.get
('/', (req, res) =>
{
  res.render('homepage.hbs',
{
  pageTitle: 'Home Page',
  welcomeMes: 'Welcome to this Website',
});
});

app.get
('/about',
(req, res) =>
{
  res.render('about.hbs',
{
    pageTitle: 'About Page',
});
});

app.get
('/bad',
(req,res) =>
{
  res.send(
    {
      errorMessage: 'Unable to send Message.'
    }
  );
});

app.listen(port,
() => {console.log(`Server is listening on port ${port}`);}
);

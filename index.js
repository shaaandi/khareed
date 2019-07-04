const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const app = express();
const cookieSession = require('cookie-session');
const passport = require('passport');
mongoose.connect(keys.mongoURI);


require('./models/customer');
require('./services/passport');



app.use(cookieSession({
    maxAge : 15*24*60*60*1000,
    keys : [keys.cookieKey]
}))

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))

    const path = require('path');
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}


app.listen(PORT, () => console.log('Server is listening '))
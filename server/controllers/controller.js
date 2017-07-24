// server/controllers/controller.js
// This is the file that handles all of the server-side logic. The controller is called upon by the routes.
// The controller interacts with preloaded models to run database commands.
// The controller sends the response to the client.
// There can be many controllers in the server/controllers folder.
const mongoose = require('mongoose');
const passport = require('passport');
require('./../config/passport')(passport);
const User = mongoose.model('User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cert = 'KEEP_IT_SECRET.KEEP_IT_SAFE.'

getToken = (headers) => {
  if (headers && headers.authorization) {
    let parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
},

module.exports = {

  // authenticate: (req, res) => {
  //   console.log(JSON.parse(connection.request.getBody()))
  //   // console.log(req.headers)
  //   // let token = getToken(req.headers);
  //   // if (!token) {
  //   //   return res.status(403).json({success: false});
  //   // } else {
  //   //   return res.status(400).json({success: true})
  //   // }
  // },
  // // passport.authenticate('jwt', { session: false }),

  register: (req, res) => {
    User.findOne({username: req.body.username}, (err, newUser) => {
      if (err) {
        console.log('Error in controller-check:', err)
      } else if (newUser == null) {
        let hashedpw = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
        let user = new User({firstname: req.body.firstname, lastname: req.body.lastname, username: req.body.username, email: req.body.email, dob: req.body.dob, password: hashedpw}, (err, success) => {
          if (err) {
            console.log('Error in controller-register:', err)
          } else {
            console.log('Success:', success)
          }
        })
        user.save( (err, user) => {
          if (err) {
            console.log('Error in controller-register:', err)
          } else {
            res.json({username: user.username, password: req.body.password})
          }
        })
      } else {
        res.json({_id: 'error'})
      }
    })
  },
  authenticate: (req, res) => {
    User.findOne({username: req.body.username}, (err, user) => {
      if (err) {
        console.log('Error in controller-login-findUser:', err)
      }
      if (!user) {
        res.status(403).json({success: false, message: 'User not found.'})
      } else if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          let token = jwt.sign(user, cert, {
            expiresIn: 86400 // expires in 24 hours
          });
          res.status(400).json({
            user: user,
            username: user.username,
            name: user.firstname,
            success: true,
            message: 'Logged in successfully.',
            token: token
          });
        } else {
          res.status(403).json({success: false, message: 'User not found.'})
        }
      } else {
        console.log('Error in controller-login-else.')
      }
    })
  },

  // apiRoutes.use(function(req, res, next) {
  //
  // 	// check header or url parameters or post parameters for token
  // 	var token = req.body.token || req.param('token') || req.headers['x-access-token'];
  //
  // 	// decode token
  // 	if (token) {
  //
  // 		// verifies secret and checks exp
  // 		jwt.verify(token, app.get('superSecret'), function(err, decoded) {
  // 			if (err) {
  // 				return res.json({ success: false, message: 'Failed to authenticate token.' });
  // 			} else {
  // 				// if everything is good, save to request for use in other routes
  // 				req.decoded = decoded;
  // 				next();
  // 			}
  // 		});
  //
  // 	} else {
  //
  // 		// if there is no token
  // 		// return an error
  // 		return res.status(403).send({
  // 			success: false,
  // 			message: 'No token provided.'
  // 		});
  //
  // 	}
  //
  // });




  read: (req, res) => {
    var token = getToken(req.headers);
    if (!token) {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    } else {
      User.find({}, (err, users) => {
        if (err) {
          console.log('Error in controller-read:', err)
        } else {
          res.json(users)
        }
      })
    }
  },
  // logged: (req, res) => {
  //   if (req.session.uid != 'undefined') {
  //     res.json({b: req.session.uid})
  //   } else {
  //     res.json({b: false})
  //   }
  // },
  logout: (req, res) => {

  }
}

// Possible:
// // authenticate: function(request, response) {
// //   if (!request.session.tries)
// //     request.session.tries = 0
// //   if (request.session.tries >= 5) {
// //     response.json({
// //       action: 'login',
// //       status: false,
// //       attempt: request.session.tries,
// //       msg: ('Invalid Credentials ( Attempt '+request.session.tries+' / 5 '+') Invalid request, please try again later.')
// //     })
// //   }
// //   else {
// //     request.session.tries += 1
// //     User.findOne({email: request.body.email, password:request.body.password}, function(err, record){
// //       if(record){
// //
// //         // Actionable
// //
// //         // Generate auth_token
// //         // Store auth_token into session
// //         // request.session.lag = Date.time // Store Date/time into session
// //         response.json({
// //           action: 'login',
// //           status: true,
// //           auth_token: '123abc', // pass auth_token
// //           uid: record.id
// //         })
// //       }
// //       else{
// //         response.json({
// //           action: 'login',
// //           status: false,
// //           errors: err,
// //           msg: ('Invalid Credentials ( Attempt '+request.session.tries+' / 5 '+')')
// //         })
// //       }
// //
// //     })
// //   }
// // },
// // create: function(request, response){
// //
// //   User.findOne({_id: request.params.uid}, function(err, record){
// //
// //     // Actionable
// //
// //     // If the record exists, and the auth token matches, and the uid matches this record, and the time between the post request and the get request which follows is under ~1 second, session the user, redirect and confirm 'logged in'
// //     // if ( record
// //     // && request.session.auth_token == request.params.auth_token
// //     // && record._id == request.params.uid
// //     // && (Date.time - request.session.lag) < 1 ){
// //
// //
// //     if(record && '123abc' == request.params.auth_token && record._id == request.params.uid){
// //       // Set new Auth token for someone logged in.
// //       request.session.auth = '5389uhyjw0ju0589j03h89jw3890'
// //       response.redirect('/dashboard')
// //     }
// //   })
// //
// // },

// Example:
// // create: (req, res) =>{
// //   let user = new User({name: req.params.name});
// //   user.save( (err, user) => {
// //     if(err){
// //       res.status(400).send("Error saving user");
// //     }else{
// //       res.redirect('/' + user.name);
// //     }
// //   })
// // },
// // destroy: (req, res) =>{
// //   User.findOne({name: req.params.name}, (err ,user)=>{
// //     if(err) return res.status(400).send("Problem getting user");
// //     else{
// //       user.remove();
// //       res.redirect('/');
// //     }
// //   })
// // }

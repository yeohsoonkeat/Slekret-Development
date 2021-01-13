require('dotenv').config();
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const appConfig = require('./app.config');
passport.use(
	new GitHubStrategy(
		{
			clientID: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
			callbackURL: appConfig.backendUrl + '/auth/github/callback',
			scope: ['user:email'],
		},
		function(accessToken, refreshToken, profile, cb) {
			const user = {
				profileImg: profile.photos[0].value,
				email: profile.emails[0].value,
			};
			cb(null, user);
		}
	)
);

passport.serializeUser(function(user, cb) {
	cb(null, user);
});

passport.deserializeUser(function(user, cb) {
	cb(null, user);
});

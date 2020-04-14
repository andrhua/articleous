import passport from 'passport';
import { Strategy } from 'passport-github2';
import { github } from './keys.js';
import { getUser, addUser } from './user.js';

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	getUser(id).then((user) => {
		done(null, user);
	});
});

passport.use(new Strategy({
	clientID: github.clientID,
	clientSecret: github.clientSecret,
	callbackURL: 'http://localhost:3000/auth/github/callback'
}, function (accessToken, refreshToken, profile, done) {
	const { id } = profile;
	getUser(id).then(user => {
		if (user) {
			done(null, user);
		}
		else {
			addUser(profile).then((user) => done(null, user));
		}
	});
}));	

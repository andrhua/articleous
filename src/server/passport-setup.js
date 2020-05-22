import passport from 'passport';
import { Strategy } from 'passport-github2';
import { getUser, addUser } from './user.js';

export default function passportSetup(server) {
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		getUser(id).then((user) => {
			done(null, user);
		});
	});

	passport.use(new Strategy({
		clientID: process.env.GITHUB_CLIENTID,
		clientSecret: process.env.GITHUB_SECRET,
		callbackURL: `${server}/auth/github/callback`
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
}

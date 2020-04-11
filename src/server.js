import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import bodyParser from 'body-parser';
import passport from 'passport';
import { ensureLoggedIn, ensureLoggedOut } from 'connect-ensure-login';
import session from 'express-session';
import './server/passport-setup.js';
import { router as authRoutes } from './routes/_auth.js';
import { session as cookieSession } from './server/keys.js';
export { fetch } from 'node-fetch';


const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';
export const server = dev ? 'http://localhost:3000' : 'https://your_deployment.server.com';
const app = polka();

/* polka does not have res.redirect */
app.use(function(req, res, next) {
	res.redirect = url => {
		res.writeHead(302, {Location: url});
		res.end();
	};
	next();
});

app.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		bodyParser.urlencoded({extended: true}),
		bodyParser.json(),
		session({
			cookie: {
				maxAge: 31 * 24 * 60 * 60 * 1000,
			},
			secret: cookieSession.key,
			resave: false,
			saveUninitialized: false 
		}),
		passport.initialize(),
		passport.session(),
	);

/* protect endpoints from (un)authorized access */
/*
['/home', '/practice*', '/me*'].forEach((path) => {
	app.use(path, ensureLoggedIn('/'));
});

function root_only(fn) {
	return async function (req, res, next) {
		if (req.path === '/') return fn(req, res, next);
		next();
	}
}

app.use('/', root_only(ensureLoggedOut('/home')));
*/
app.use('/auth', authRoutes);

app.get('/logout', function(req, res){
	req.session.destroy(() => res.redirect('/'));
});

app.use(
	sapper.middleware({
		session: (req, res) => ({user: req.user})
	})
).listen(PORT, err => {
		if (err) console.log('error', err);
	});

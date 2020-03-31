import Router from 'polka';
import passport from 'passport';


export const router = Router();

router.get('/github', 
	passport.authenticate('github', { scope: ['profile'] }));

router.get('/github/callback', 
	passport.authenticate('github', { failureRedirect: '/' }),
	(req, res) => {
		res.redirect('/home');
	});

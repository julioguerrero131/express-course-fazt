const {Router} = require('express');

const router = Router();

router.get('/users', (req, res) => {
    res.render('users');
});

module.exports = router;

// function UserRoutes(app) {
//     app.get('/userName', (req, res) => {
//         res.send('Username Route');
//     });

//     app.get('/profile', (req, res) => {
//         res.send('Profile Page');
//     });
// }

// module.exports = UserRoutes 
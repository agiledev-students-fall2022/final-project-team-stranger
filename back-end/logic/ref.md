authRouter.get("/login", (req, res) => {
    passport.authenticate('strangerLogin', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'authFail',
                user   : user,
                err: err, 
                info: info
            });
        }

        req.login(user, {session : false}, (err) => {
            if (err) {
                res.send(err); 
            } 

            const body = {_id: user._id, email: user.email}
            const token = jwt.sign(body, 'SAMPLE_SECRET');
            return res.json({user: token})
        }); 
    })(req, res)
}); 
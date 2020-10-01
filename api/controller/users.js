const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../model/users');

/**
 * @desc    sign up new user
 */
exports.register_user = (req, res) => {
    Users.find({email: req.body.email})
        .exec()
        .then(user => {
            if (user.length >= 1) {
                res.status(409).json({
                    message: 'Email already exists!'
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        res.status(500).json({ error: err });
                    } else {
                        const user = new Users({
                            email: req.body.mail,
                            password: hash
                        });
                        user.save()
                            .then(resp => {
                                console.log(resp);
                                res.status(201).json({
                                    message: 'User created successfully!'
                                });
                            })
                            .catch(err => {
                                res.status(500).json({ error: err });
                            });
                    }
                });

            }
    });
}

/**
 * @desc    login user
 */
exports.login_user = (req, res) => {
    Users.findOne({email: req.body.email})
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Failed to authenticate'
                });
            } else {
                bcrypt.compare(req.body.password, user.password, (err, resp) => {
                    if (err) {
                        return res.status(401).json({ message: 'Failed to authenticate!' })
                    }
                    if (resp) {
                        const token = jwt.sign(
                            {
                                email: user.email,
                                userId: user._id
                            },
                            process.env.JWT_SECRET_KEY,
                            {
                                expiresIn: "2h"
                            }
                        );
                        return res.status(200).json({
                            message: 'Login successful!',
                            token: token
                        });
                    }

                    res.status(401).json({ message: 'Failed to authenticate!' })
                });
            }
        })
        .catch(err => {
            res.status(500).json({ error: err });
        })
}

/**
 * @desc    delete a user
 */
exports.delete_user = (req, res) => {
    Users.deleteOne({_id: req.params.id})
        .exec()
        .then(user => {
            res.status(200).json({
                message: 'User deleted successfully!'
            });
        })
        .catch(err => {
            res.status(500).json({ error: err });
        })
}
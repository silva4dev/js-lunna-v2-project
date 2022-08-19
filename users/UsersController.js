const express = require("express");
const router = express.Router();
const User = require("./User");
const bcrypt = require("bcryptjs");

router.get("/admin/users", (req, res) => {
    if(req.session.user == undefined) {
        res.redirect("/");
    }
    User.findAll().then(users => {
        res.render("admin/users/index", {
            users: users
        });
    });
}); 

router.get("/admin/users/create", (req, res) => {
    res.render("admin/users/create");
});

router.post("/users/create", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({
        where: { 
            email: email
        }
    }).then(user => {
        if(user == undefined) {
            const salt = bcrypt.genSaltSync(10); // aumentar mais a segurança 
            const hash = bcrypt.hashSync(password, salt);
            User.create({
                email: email,
                password: hash
            }).then(() => {
                res.redirect("/");
            }).catch(err => {
                res.redirect("/");
            })
        } else {
            res.redirect("/admin/users/create");
        }
    });
});

router.get("/login", (req, res) => {
    res.render("admin/users/login");
});

router.post("/authenticate", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({
        where: {
            email: email
        }
    }).then(user => {
        if(user != undefined) { // Se existe um usuário com esse e-mail
            // Validar senha
            const correct = bcrypt.compareSync(password, user.password);
            if(correct) {
                req.session.user = {
                    id: user.id,
                    email: user.email
                }
                res.redirect("admin/articles");
            } else {
                res.redirect("/login");
            }
        } else {    
            res.redirect("/login");
        }
    });
});

router.get("/logout", (req, res) => {
    delete req.session.user;
    res.redirect("/")
}); 

module.exports = router;
import { db } from "../database.js";

export const submitController = (req, res) => {

    const name = req.body.username;
    const email = req.body.email;
    const password = req.body.pass;

    db.query(`insert into user (username, email, password) values ('${name}', '${email}', '${password}')`)
    res.redirect('/')
}

export const deleteController = (req, res) => {
    const id = req.params.id

    db.query(`delete from user where id = ${id}`)
    res.redirect('/dataAdmin')
}

export const updateController = (req, res) => {
    const id = req.params.id

    db.query(`update user set password = "guest" where id = ${id}`)
    res.redirect('/dataAdmin')
}

export const ubahController = (req, res) => {
    const id = req.params.id
    const data = req.body
    console.log(data)

    db.query(`update user set username = "${data.username}" where id = ${id}`)
    res.redirect('/dataAdmin')
}
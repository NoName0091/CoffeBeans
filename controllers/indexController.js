import { db } from "../database.js"

export const indexController = (req, res) => {
    res.render('index')
}

export const formController = (req, res) => {
    return db.query('select * from form', (err, result) => {
        if (err) throw err
        return res.render('form', { form: result })
    })
}

export const aboutController = (req, res) => {
    res.render('about')
}

export const submitController = (req, res) => {
    res.render('submit')
}

export const cafeController = (req, res) => {
    res.render('cafe')
}

export const cafe2Controller = (req, res) => {
    res.render('cafe2')
}

export const adminLoginController = (req, res) => {
    res.render('adminLogin')
}

export const editController = (req, res) => {
    const id = req.params.id

    return db.query(`select * from user where id = ${id}`, (err, result) => {
        if (err) throw err
        return res.render('edit', { user: result[0] })
    })
}
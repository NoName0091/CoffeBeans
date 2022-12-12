import jwt from "jsonwebtoken";
import { db } from "../database.js";

const JWT_Secret = 'rahacia'

export const adminController = (req, res) => {
    return res.render('admin')
}

export const dbadminController = (req, res) => {
    const email = req.body.email
    const password = req.body.pass

    db.query(`select * from admin where email = '${email}' and password = '${password}'`, (err, result) => {
        if (err) {
            console.log(err)
            return res.redirect('/adminLogin')
        }

        const admin = result[0]
        console.log(admin)
        if (!admin) return res.redirect('/adminLogin')

        const token = jwt.sign({
            email: admin.email,
            password: admin.password
        }, JWT_Secret, { expiresIn: '1h' })

        req.session.adminToken = token;
        return res.redirect('/dataAdmin')
    })
}

export const adminFormController = (req, res) => {
    return db.query('select * from user', (err, result) => {
        if (err) throw err
        return res.render('admin', { user: result })
    })
}

export const logoutController = (req, res) => {
    req.session.adminToken = undefined
    return res.redirect('/index')
}

export const cekAdminController = (req, res, next) => {
    if (!req.session.adminToken) return res.redirect('/adminLogin')

    jwt.verify(req.session.adminToken, JWT_Secret, (err, admin) => {
        if (err) {
            console.log(err)
            return res.redirect('/adminLogin')
        }
        req.admin = admin
        next()
    })
}

export const dataController = (req, res) => {
    db.query('select * from items', (err, items) => {
        if (err) console.error(err);

        db.query('select * from pembukuan order by create_time desc limit 5', (err, pembukuan) => {
            if (err) console.error(err);
            res.render("trscAdmin", {
                pembukuan: pembukuan || [],
                items: items || []
            })
        })
    })
}

export const tmbhAdminController = (req, res) => {
    const data = req.body;

    db.query('insert into items (name) values (?)', [data.name], (err, result) => {
        if (err) console.error(err);
        res.redirect('/trscAdmin');
    })
}

export const trscAdminController = (req, res) => {
    const data = req.body;

    db.query('insert into pembukuan (type, item_id, amount) values (?, ?, ?)', [data.type, data.item_id, data.amount], (err, result) => {
        if (err) {
            console.error(err);
            res.redirect('/');
            return;
        }

        const qty = data.type === 'keluar' ? data.amount * -1 : data.amount;
        db.query('update items set qty = qty + ? where id = ?', [qty, data.item_id], (err, result) => {
            if (err) console.error(err);
            res.redirect('/trscAdmin');
        });
    })
}
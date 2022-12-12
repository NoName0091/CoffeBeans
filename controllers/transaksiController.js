import { db } from "../database.js";

export const trscAdminController = (req, res) => {
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

export const tambahController = (req, res) => {
    const data = req.body;

    db.query('insert into items (name, harga, gambar) values (?, ?, ?)', [data.name, data.harga, data.gambar], (err, result) => {
        if (err) console.error(err);
        res.redirect('/trscAdmin');
    })
}

export const tarikController = (req, res) => {
    const data = req.body;

    db.query('insert into pembukuan (type, item_id, amount, pembeli) values (?, ?, ?, ?)', [data.type, data.item_id, data.amount, data.pembeli], (err, result) => {
        if (err) {
            console.error(err);
            res.redirect('/trscAdmin');
            return;
        }

        const qty = data.type === 'ditarik' ? data.amount * -1 : data.amount;
        db.query('update items set qty = qty + ? where id = ?', [qty, data.item_id], (err, result) => {
            if (err) console.error(err);
            res.redirect('/trscAdmin');
        });
    })
}

export const updateItemController = (req, res) => {

    const id = req.params.id;

    db.query(`update items set status = "ready" where id = ${id}`)

    res.redirect('/trscAdmin')
}

export const deleteItemsController = (req, res) => {
    const id = req.params.id

    db.query(`delete from items where id = ${id}`)
    res.redirect('/trscAdmin')
}

export const deletePembukuanController = (req, res) => {
    const id = req.params.id

    db.query(`delete from pembukuan where id = ${id}`)
    res.redirect('/trscAdmin')
}
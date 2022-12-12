import { db } from "../database.js";

export const trscUserController = (req, res) => {
    res.render('trscUser')
}

export const shopChartController = (req, res) => {
    db.query('select * from items', (err, items) => {
        if (err) console.error(err);

        db.query('select * from pembukuan order by create_time desc limit 5', (err, pembukuan) => {
            if (err) console.error(err);
            res.render("trscUser", {
                pembukuan: pembukuan || [],
                items: items || []
            })
        })
    })
}

export const transaksiController = (req, res) => {
    const data = req.body;

    db.query('insert into pembukuan ( type, item_id, amount, pembeli) values ( ?, ?, ?, ?)', [ data.type, data.item_id, data.amount, data.pembeli], (err, result) => {
        if (err) {
            console.error(err);
            res.redirect('/trscUser');
            return;
        }

        const qty = data.type === 'dibeli' ? data.amount * -1 : data.amount;
        db.query('update items set qty = qty + ? where id = ?', [qty, data.item_id], (err, result) => {
            if (err) console.error(err);
            res.redirect('/trscUser');
        });
    })
}
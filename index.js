import express, { urlencoded } from 'express';
import session from 'express-session';
import path from "path";
import { fileURLToPath } from "url";
import { aboutController, adminLoginController, cafe2Controller, cafeController, editController, indexController } from './controllers/indexController.js';
import { deleteController, submitController, ubahController, updateController } from './controllers/submitController.js';
import { cekUserController, dbloginController, dbregistrasiController, loginController, logoutController, registrasiController } from './controllers/userController.js';
import { adminController, adminFormController, cekAdminController, dataController, dbadminController,} from './controllers/adminController.js';
import { shopChartController, transaksiController, trscUserController } from './controllers/checkoutController.js';
import { deleteItemsController, deletePembukuanController, tambahController, tarikController, trscAdminController } from './controllers/transaksiController.js';


const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(urlencoded({ extended: true }));
app.use(session({
    secret: 'rahacia'
}));
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '/views')));

app.get("/index", indexController);
app.get("/about", aboutController);
app.get("/cafe", cekUserController, cafeController);
app.get("/cafe2", cafe2Controller);
app.get("/adminLogin", adminLoginController);
app.get("/delete/:id", deleteController);
app.get("/update/:id", updateController);
app.get("/edit/:id", editController);
app.post("/submit", submitController);
app.post("/edit/:id", ubahController);

// user
app.get("/registrasi", registrasiController);
app.post("/registrasi", dbregistrasiController);
app.get("/login", loginController);
app.post("/login", dbloginController);
app.get("/logout", logoutController);

// admin
app.get("/admin", cekAdminController, adminController);
app.post("/admin", dbadminController);
app.get("/dataAdmin", cekAdminController, adminFormController);

app.get("/trscUser", cekUserController,shopChartController, trscUserController);

//transaksi admin
app.get("/trscAdmin", cekAdminController,trscAdminController);
app.post("/items/tambah", tambahController);
app.post("/items/tarik", tarikController);
app.get("/updateItems/:id" , updateController);
app.get("/deleteItems/:id", deleteItemsController);
app.get("/deletePembukuan/:id", deletePembukuanController)

//transaksi user
app.post("/items/beli" , transaksiController);

app.listen(3000);
console.log('Yeay!');
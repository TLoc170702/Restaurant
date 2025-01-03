require('dotenv').config();
const express = require('express'); 
const configViewEngine = require('./config/viewEngine');

const apiRoutes = require('./routes/api');
const userAdminApiRoutes = require('./routes/UserAdminAPI');
const roomApiRoutes = require('./routes/roomApi');
const offerApiRoutes = require('./routes/offerAPI')
const staffApiRoutes = require('./routes/staffAPI')
const feedbackApiRoutes = require('./routes/feedbackApi')
const orderApiRoutes = require('./routes/orderAPI')

const connection = require('./config/database');
const { getHomepage } = require('./controllers/homeController');
const cros = require('cors');

const app = express();
const path = require('path');
const port = process.env.PORT || 8888;

// config cros
app.use(cros());

//config req.body
app.use(express.json()) // for json
app.use(express.urlencoded({ extended: true })) // for form data

// Phục vụ thư mục 'uploads' như tài nguyên tĩnh
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

//config template engine
configViewEngine(app);
const webAPI = express.Router();
webAPI.get('/', getHomepage);

//khai báo route
app.use('/', webAPI);
app.use('/v1/api/', apiRoutes);
app.use('/v1/api/admin', userAdminApiRoutes);
app.use('/v1/api/admin', roomApiRoutes);
app.use('/v1/api/admin', offerApiRoutes);
app.use('/v1/api/admin', staffApiRoutes);
app.use('/v1/api/admin', feedbackApiRoutes);
app.use('/v1/api/admin', orderApiRoutes);


(async () => {
    try {
        //using mongoose
        await connection();

        app.listen(port, () => {
            console.log(`Backend Nodejs App listening on port ${port}`)
        })
    } catch (error) {
        console.log(">>> Error connect to DB: ", error)
    }
})()

import express from "express"
import routes from "./src/routes/routes.js"
import hbs from 'hbs'
import path from 'path'
import { fileURLToPath } from 'url';
// import pkg from 'pg'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express();
const port = 3000;
// const { Pool } = pkg;

// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database:'my-portofolio',
//   password:'12345',
//   port: 5432,
// })

// export default pool; 

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src/views"));
hbs.registerPartials(path.join(__dirname, "src/views/partials"));


app.use("/assets", express.static("src/assets"))
app.use(express.urlencoded({extended: false}))

hbs.registerHelper('eq', function (a, b) {
  return a === b
})

hbs.registerHelper('includes', function (array,  value) {
  if (!Array.isArray(array)) return false;
  return array.includes(value)
})

app.use('/', routes)

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})

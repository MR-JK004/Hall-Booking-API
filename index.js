import express from 'express'
import controller from './src/controller/index.js'

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json())
app.use(controller);

app.listen(PORT,
    ()=>{
        console.log("App is Listening Port ",{PORT});
    }
)
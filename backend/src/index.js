import { app } from "./app.js";
import connectDB from "./db/index.js";
import dotenv from "dotenv";

dotenv.config({path:"../src/.env"});
connectDB().then(()=>{
    app.listen(8000,()=>(
        console.log('Server is running on PORT 8000')
    ))
})
.catch((err) => {
    console.log(err)
})
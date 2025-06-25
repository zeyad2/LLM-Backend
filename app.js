import express from "express";
// import { pool } from "./config/db.js";
import userRouter from "./routes/users.routes.js";
import authRouter from "./routes/auth.routes.js";
// import adminRouter from "./routes/admin.routes.js";
import courseRouter from "./routes/courses.routes.js";


const app= express();
app.use(express.json())

app.use("/students", userRouter);
app.use("/auth", authRouter);
app.use("/courses", courseRouter);
// app.use("/admin", adminRouter)

app.listen(3500,()=>{
    console.log("Server is running on port 3500");

})

app.get("/",(req,res)=>{
    res.send("welcome");
})


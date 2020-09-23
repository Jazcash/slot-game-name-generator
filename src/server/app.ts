import express from "express";

const app = express();

app.use(express.static("../../dist/client"));

app.get("/", (req, res) => {
    res.sendFile("index.htm", { root: "../client" });
});

app.listen(3850, () => {
    console.log(`App listening at http://localhost:${3850}`);
});
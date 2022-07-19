// const express = require("express");
// const server = express();
// server.listen(3000, () => console.log("Express working on port  3000"));
// const fs = require("fs");

// // router:
// server.get('/', home);
// server.get('/pic', Pic);

// // request handlers:


// let tem = `<!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta http-equiv="X-UA-Compatible" content="IE=edge">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Document</title>
// </head>
// <body>
//     Hello
//     <img src="/pic" alt="pic here">
// </body>
// </html>`


// function home (req, res) {
//     res.write(tem);
//     res.end();
// };

// function Pic (req, res) {
//     const dataStream = fs.createReadStream("./static/hummingbird.jpg");
//     dataStream.on("data", data => res.write(data));
//     dataStream.on("end", () => res.end());
// };


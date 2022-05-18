// database:
let dataBase = {
    "a1": {
        name: "Spas",
        age: 31
    },
    "a2": {
        name: "Anna",
        age: 26
    }
};


const express = require('express');
const res = require('express/lib/response');
const server = express();
server.listen(5000, ()=> console.log('>>> RESTserver work on port 5000'));



// --------- global middlewares:

// bodiparser:
server.use(express.json());

// Protector:
server.use((req, res, next) =>{
    res.setHeader('Access-Controll-Allow-Origin', '*');
    res.setHeader('Access-Controll-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Controll-Allow-Header', 'Content-Type');
    next();
});


// ----------- router:
// we can use express router to simplify this because we have repitable paths:
server.get('/api/users', (req, res) => {
    res.status(301).json(dataBase);
});
server.post('/api/users', (req, res) => {
    const id = "a" + Math.random()
    const person = req.body;
    dataBase[id] = person;
    res.status(201).json(dataBase[id]);
});
server.put('/api/users/:id', (req, res) => {
    const idToReplace = req.params.id;
    const person = req.body;
    dataBase[idToReplace] = person;
    res.json(dataBase[idToReplace]);
});
server.patch('/api/users/:id', (req, res) => {
    const idToModify = req.params.id;
    const newName = req.body.name;
    dataBase[idToModify].name = newName;
    res.json(dataBase[idToModify]);
});
server.delete('/api/users/:id', (req, res) => {
    const idToDelete = req.params.id;
    delete dataBase[idToDelete];
    res.status(410).end();
});

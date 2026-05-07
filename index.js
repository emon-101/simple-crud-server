const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


// mongodb+srv://simpleCrudUser:YotNKNbXB6PoVPsP@cluster0.immgcuf.mongodb.net/?appName=Cluster0

app.get('/', (req, res)=> {
    res.send('Simple CRUD server is serving');
});

app.listen(port, ()=> {
    console.log(`Server is running on ${port}`);
})
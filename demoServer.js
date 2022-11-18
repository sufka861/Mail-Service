const express = require('express')
const app = express()
const port = 8080
const{events, templateEvents } = require(`./templates`)


app.get('/templates/:id', (req,res) =>{
    res.send(`Hello World! check`);
    templateEvents.emit(events.DELETE, req.params.id);
})
app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`);
})

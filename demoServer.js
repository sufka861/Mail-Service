const express = require('express')
const app = express()
const port = 8080
const{events, templateEvents, templatesList} = require(`./templates`)


app.get('/templates/', (req,res) =>{

   res.send(templatesList())
})
app.get('/templates/:id', (req, res)=>
{
    res.send(templatesList().find(temp => temp.template_id === req.params.id))
})

app.put('/templates/', (req,res) =>{

    templateEvents.emit(events.CREATE, req.params.name, req.params.creator, req.params.date, req.params.date )
})
app.put('/templates/:id', (req, res)=> {
    templateEvents.emit(events.EDIT,req.params.id,  req.params.name, req.params.creator, req.params.html);
})
app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`);
})
app.delete('/templates/:id', (req, res)=> {
    templateEvents.emit(events.DELETE, req.params.id);
})

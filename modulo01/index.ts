import express from 'express';
const app = express();
app.use(express.json());

const users = ['AAAA','Cláudio','Victor']


function checkUserExist(req:express.Request,res:express.Response,next:express.NextFunction){
    if(!req.body.name) return res.status(400).json({error:'User name is required'})
    return next();
}

function checkUserInArray(req:express.Request,res:express.Response,next:express.NextFunction){
    if(!users[req.params.index]) return res.status(400).json({error:'User does not exists'})
    return next();
}

app.use((req,res,next) => {
    console.log(`Método: ${req.method}; URL: ${req.url}`);
    next();
})

app.get('/user',(req,res) =>res.json(users))

app.get('/user/:index',checkUserInArray, (req,res) => {
    const {index} = req.params;
    return res.json(users[index]);
});

app.post('/user',checkUserExist,(req,res) =>{
    const {name} = req.body;
    users.push(name);
    
    return res.json(users);
})

app.put('/user/:index',checkUserInArray,checkUserExist,(req,res)=>{
    const {index} = req.params;
    const {name} = req.body;
    users[index] = name;
    return res.json(users);
})

app.delete('/user/:index',checkUserInArray,(req,res) =>{
    const {index} = req.params;
    users.splice(<any>index,1);
    return res.send();
})
app.listen(3000);
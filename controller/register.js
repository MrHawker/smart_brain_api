const handleRegister = (db,bcrypt)=>(req,res)=>{
    const {name,email,password} = req.body;
    if (!name || !email || !password){
       return res.status(400).json('wrong format')
    }
    const hash = bcrypt.hashSync(password)
    db.transaction(trx=>{
        trx.insert({
            hash:hash,
            email:email
        })
        .into('login')
        .returning('email')
        .then(loginemail=>{
            return trx('users')
            .returning('*')
            .insert({
             name:name,
             email:loginemail[0].email,
             joinedon:new Date()
            })
            .then(user=>{
             res.json(user[0])
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err=>{
        res.status(400).json('oops something went terribly wrong')
    })
    
}
module.exports ={
    handleRegister:handleRegister
};

   
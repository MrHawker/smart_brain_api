const handleSignin = (req,res,db,bcrypt)=>{
    const {email,password} = req.body;
    if (!email || !password){
       return res.status(400).json('wrong format')
    }
    db.select('email','hash').from('login')
    .where({
        email:email
    })
    .then(data=>{
        const isValid = bcrypt.compareSync(password,data[0].hash);
        if(isValid){
            return db.select('*').from('users').where({
                email:email
            })
            .then(user=>{
                res.json(user[0])
            })
            .catch(err=>{
                res.status(404).json('user not found')
            })
        }
        res.status('404').json('wrong username and password combination')
    })
    .catch(err=>{
        res.status('404').json('wrong username and password combination')
    })
}
module.exports={
    handleSignin:handleSignin
}
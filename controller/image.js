
const handleApiCall = (req,res)=>{
    const USER_ID = 'mrhawker_123';
    const PAT = '8197818d73d24575b69f40d7d81ea978';
    const APP_ID = 'my-first-application';
    const MODEL_ID = 'face-detection';
    const MODEL_VERSION_ID = '5e026c5fae004ed4a83263ebaabec49e';    
    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": req.body.input
                    }
                }
            }
        ]
    });
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };


    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs",requestOptions)
        .then(data=>data.json())
        .then(result=>res.send(result))
    .catch(err=>res.status(400).json('something went wrong'))
}

const handleImage=(req,res,db)=>{
    const {id} = req.body;
    db('users').where({id}).increment('entries',1).returning('entries').then(entries=>{
        res.json(entries[0].entries)
    })
    .catch(err=>{
        res.status(404).json(`cant't get count`)
    })
}
module.exports={
    handleImage:handleImage,
    handleApiCall:handleApiCall
}
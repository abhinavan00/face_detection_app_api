const handleProfileId = (req, res, db) => {
    const {id} = req.params;
    db.select('*').from('users')
    .where('id', '=', id)
    .then(user => {
        if (user.length) {
            res.json(user[0])
        } else {
            res.status(400).json('Not Found')
        }  
    })
    .catch(err => res.status(400).json('Error getting user'))
}

export default handleProfileId;
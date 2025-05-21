const handleRegister = (req, res, db, bcrypt) => {
    console.log('Registering user');
    console.log(req.body);
    const {name, email, password} = req.body;
    if (!name || !email || !password) {
        return res.status(400).json('Incorrect form submission')
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
        db.transaction(trx => {
            trx.insert({
                hash: hash,
                email: email
            })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                .returning('*')
                .insert({
                    name: name,
                    email: loginEmail[0].email,
                    joined: new Date()
                })
                .then(user => {
                    res.json(user[0])
                })
            })
            .then(trx.commit)
            .catch(trx.rollback)
            .catch(err => res.status(400).json('Unable to register'))
        }
    )               
}

export default handleRegister;
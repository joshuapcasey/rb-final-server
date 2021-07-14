const Express = require('express');
const router = Express.Router();
const validateSession = require('../middleware/validate-session');
const validateRole = require('../middleware/validate-role');
const { CredentialModel } = require('../models');

router.get("/practice", validateSession, (req, res) => {
    res.send("Hey!! This is a practice route!")
});


// ! authenticated routes

//post new credential (req authorization)
router.post('/create', validateSession, async(req, res) =>{
    const { npi, med_school, licenses, specialty } = req.body.credential;
    const { id } = req.user;
    const credEntry = {
        npi,
        med_school,
        licenses,
        specialty,
        bio,
        owner: id,
    }
    try {
        const newCred = await CredentialModel.create(credEntry);
        res.status(200).json(newCred);
    } catch (err) {
        res.status(500).json({ msg: `Oh no! Server error: ${err}`})
    }
});

// find all credentials from given user 
router.get('/view/user/:userId', validateSession, async(req, res)=>{
    const { userId } = req.params
    try {
        const userCred = await CredentialModel.findAll({
            where: {userId: userId},
        });
        res.status(200).json({userCred})
    } catch (err) {
        res.status(500).json({msg: `Oh no, server error: ${err}`})
    }
})

// update credential by USER
router.put('/edit/:credId', validateSession, async (req, res) => {
    const { npi, med_school, licenses, specialty, bio } = req.body;
    const { id } = req.user;
    const { credId } = req.params

    try {
        const updatedCred = await CredentialModel.update({
            npi,
            med_school,
            licenses,
            specialty,
            bio,
        }, { where: { userId: id, id: credId } });
            res.status(200).json({
                msg: `Credential updated`,
                updatedCred: updatedCred == 0? `none` : updatedCred
            })
    } catch (err) {
        res.status(500).json({ msg: `Oh no, server error: ${err}` })
    }
})


//delete credential by USER
router.delete('/delete/:credId', validateSession, async(req, res)=>{
    const { id } = req.user;
    const { credId } = req.params
    try {
        const deletedCred = await CredentialModel.destroy({
            where: { userId: id, id: credId }
        });
        res.status(200).json({
            msg: `Credential deleted.`,
            deletedCred: deletedCred == 0? `none` : deletedCred
        })
    } catch (err) {
        res.status(500).json({msg: `Oh no, server error: ${err}`})
    }
})

// ! ADMIN edit
router.put('/edit/:credId/admin', validateRole, async (req, res) => {
    const { npi, med_school, licenses, specialty, bio } = req.body;
    const { credId } = req.params

    try {
            const updatedCred = await CredentialModel.update({
                npi,
                med_school,
                licenses,
                specialty,
                bio
            }, { where: { id: credId } });
            res.status(200).json({
                msg: `Credential updated`,
                updatedCred
            })
    } catch (err) {
        res.status(500).json({ msg: `Oh no, server error: ${err}` })
    }
})

// ! ADMIN delete
router.delete('/delete/:credId/admin', validateRole, async(req, res)=>{
    const { credId } = req.params
    try {
        const deletedCred = await CredentialModel.destroy({
            where: { id: credId }
        });
        res.status(200).json({
            msg: `Credential deleted.`,
            deletedCred: deletedCred == 0? `none` : deletedCred
        })
    } catch (err) {
        res.status(500).json({msg: `Oh no, server error: ${err}`})
    }
})


module.exports = router;


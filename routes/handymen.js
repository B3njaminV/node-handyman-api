let HandyMan = require('../model/handyman');

function getAll(req, res) {
    HandyMan.find()
        .then((handymen) => {
            res.json(handymen);
        })
        .catch((err) => {
            res.status(500).json({ error: 'Error fetching handymen', details: err.message });
        });
}

function getOne(req, res) {
    let id = req.params.id;
    HandyMan.findById(id)
        .then((handyman) => {
            if (!handyman) {
                res.status(404).json({ error: 'Handyman not found' });
            } else {
                res.json(handyman);
            }
        })
        .catch((err) => {
            res.status(500).json({ error: 'Error fetching handyman', details: err.message });
        });
}

function create(req, res) {
    if (!req.body._id) {
        return res.status(400).json({ error: 'ID is required' });
    }

    let handyman = new HandyMan({
        _id: req.body._id,
        name: req.body.name,
        avatarUrl: req.body.avatarUrl,
        aboutMe: req.body.aboutMe,
        phone: req.body.phone,
        address: req.body.address,
        isFavorite: req.body.isFavorite,
        webSite: req.body.webSite
    });

    handyman.save()
        .then((savedHandyman) => {
            res.status(201).json({
                message: `${savedHandyman.name} saved successfully`,
                id: savedHandyman._id
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: 'Failed to create handyman',
                details: err.message
            });
        });
}

async function update(req, res) {
    try {
        const handyman = await HandyMan.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!handyman) {
            return res.status(404).json({ error: 'Handyman not found' });
        }

        res.json({
            message: 'Updated successfully',
            handyman: handyman
        });
    } catch (err) {
        res.status(500).json({
            error: 'Failed to update handyman',
            details: err.message
        });
    }
}

async function deleteOne(req, res) {
    try {
        const handyman = await HandyMan.findByIdAndDelete(req.params.id);

        if (!handyman) {
            return res.status(404).json({ error: 'Handyman not found' });
        }

        res.json({
            message: `${handyman.name} deleted successfully`,
            id: handyman._id
        });
    } catch (err) {
        res.status(500).json({
            error: 'Failed to delete handyman',
            details: err.message
        });
    }
}

module.exports = {getAll, create, getOne, update, deleteOne};
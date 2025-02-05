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
    let id = parseInt(req.params.id);
    HandyMan.findOne({ _id: id })
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
    const { id, name, avatarUrl, aboutMe, phone, address, isFavorite, webSite } = req.body;

    if (!id) {
        return res.status(400).json({ error: 'ID is required' });
    }

    let handyman = new HandyMan({
        _id: id,
        name: name,
        avatarUrl: avatarUrl,
        aboutMe: aboutMe,
        phone: phone,
        address: address,
        isFavorite: isFavorite,
        webSite: webSite
    });

    handyman.save()
        .then((savedHandyman) => {
            res.status(201).json({
                message: `${savedHandyman.name} saved successfully`,
                id: savedHandyman._id
            });
        })
        .catch((err) => {
            if (err.code === 11000) {
                return res.status(400).json({
                    error: 'Duplicate ID',
                    details: `The ID ${id} already exists in the database.`
                });
            }

            res.status(500).json({
                error: 'Failed to create handyman',
                details: err.message
            });
        });
}

async function update(req, res) {
    try {
        const handyman = await HandyMan.findOneAndUpdate(
            { _id: parseInt(req.params.id) },
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
        const handyman = await HandyMan.findOneAndDelete({ _id: parseInt(req.params.id) });

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

module.exports = { getAll, create, getOne, update, deleteOne };
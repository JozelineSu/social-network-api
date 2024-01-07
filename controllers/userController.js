const User = require('../models/User');

module.exports = {
    // Get all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(505).json(err);
        }
    },
    // Get a single user
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .populate('friends')
                .populate('thoughts');
            
            if (!user) {
                return res.status(404).json({ message: 'No user with this id' })
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Create user
    async createUser(req, res) {
        try {
            const dbUserData = await User.create(req.body);
            res.json(dbUserData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Update user
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if(!user) {
                return res.stauts(404).json({ message: 'No user with this id' });
            }

            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // Delete user
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndRemove({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'No user with this id'});
            }

            res.json({ message: 'User successfully deleted' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Add friend
    async addFriend(req, res) {
        try {
            const user = await User.findOneandUpdate(
                { _id: req.params.userId},
                { $addToSet: { friends: req.body } },
                { runValidators: true, new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'No user witht that id' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Delete friend
    async deleteFriend(req, res) {
        try {
            const user = await user.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: { friendId: req.params.friendId } } },
                { runValidators: true, new: true }
            )

            if (!user) {
                return res.status(404).json({ message: 'No user with this id' });
            }

            res.json(user);
        } catch(err) {
            res.status(500).json(err);
        }
    }
}
const { Thought, User } = require('../models');

mdouel.exports = {
    // Get all thoughts
    async getThougths(req, res) {
        try {
            const thought = await Thought.find();
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Get single thought by _id
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought found with that id'});
            }

            res.json(comment);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Create a thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId},
                {$addToSet: { thoughts: thought._id }},
                { new: true }
            )

            if (!user) {
                return res.status(404).json({ message: 'Thought created, but found no user with that ID'});
            }

            res.json('Created thought');
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // Update thought
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this id' });
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // Delete thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id'});
            }

            const user = await User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { videos: req.params.thoughtId }},
                { new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'Thought created but no user found with this id'});
            }

            res.json({ message: 'Thought successfully deleted' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Add thought reaction
    async addThoughtReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body }},
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Remove thought reaction
    async removeThoughtReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
            )

            if (!video) {
                return resstatus(404).json({ message: 'No video with this id' });
            }

            res.json(thought);
        } catch(err) {
            res.status(500).json(err);
        }
    },
};
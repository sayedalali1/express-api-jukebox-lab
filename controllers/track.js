const Track = require('../models/track.js');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
      const newTrack = await Track.create(req.body);
      res.status(201).json(newTrack);
    } catch (error) {
      res.status(500).json({ error: 'oops something went wrong' });
    };
});

router.get('/', async (req, res) => {
    try {
      const allTracks = await Track.find();
      res.status(200).json(allTracks);
    } catch (error) {
      res.status(500).json({ error: 'oops something went wrong' });
    };
});

router.get('/:trackId', async (req, res) => {
    try {
      const currentTrack = await Track.findById(req.params.trackId);
      if (!currentTrack) {
        res.status(404);
        throw new Error('Track not found.');
      }
      res.status(200).json(currentTrack);
    } catch (error) {
      if (res.statusCode === 404) {
        res.json({ error: error.message });
      } else {
        res.status(500).json({ error: 'oops something went wrong' });
      };
    };
});

router.put('/:trackId', async (req, res) => {
    try {
      const updatedTrack = await Track.findByIdAndUpdate(req.params.trackId, req.body, {new: true});
      if (!updatedTrack) {
        res.status(404);
        throw new Error('Track not found.');
      };
      res.status(200).json(updatedTrack);
    } catch (error) {
      if (res.statusCode === 404) {
        res.json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      };
    };
});

router.delete('/:trackId', async (req, res) => {
    try {
      const deletedTrack = await Track.findByIdAndDelete(req.params.trackId);
      if (!deletedTrack) {
        res.status(404);
        throw new Error('Track not found!');
      };
      res.status(204).json({});
    } catch (error) {
      if (res.statusCode === 404) {
          res.json({ error: error.message });
      } else {
          res.status(500).json({ error: 'oops something went wrong' });
      };
    };
});

module.exports = router;
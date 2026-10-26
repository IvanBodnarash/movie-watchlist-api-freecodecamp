import express from "express";
import { addMovie, deleteMovie, getWatchlist, updateMovie } from "../utils/db.js";
import { authorizeModification } from "../middleware/authorize.js";

const router = express.Router();

router.get("/:userId", (req, res) => {
    const userId = Number(req.params.userId);

    const userWatchlist = getWatchlist(userId);

    res.status(200).json({ watchlist: userWatchlist });
});

router.post("/:userId/movies", authorizeModification, async (req, res) => {
    const userId = Number(req.params.userId);  
    const data = req.body;

    const newMovie = addMovie(userId, data);

    res.status(201).json(newMovie);
});

router.put("/:userId/movies/:movieId", authorizeModification, (req, res) => {
    const userId = Number(req.params.userId);
    const movieId = Number(req.params.movieId);
    const data = req.body;

    const updatedMovie = updateMovie(userId, movieId, data);

    res.status(200).json(updatedMovie);
});

router.delete("/:userId/movies/:movieId", authorizeModification, (req, res) => {
    const userId = Number(req.params.userId);
    const movieId = Number(req.params.movieId);

    const deletedMovie = deleteMovie(userId, movieId);

    res.status(200).json(deletedMovie);
});

export default router;
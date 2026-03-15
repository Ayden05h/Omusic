const express = require("express");
const { sequelize, Track } = require("./database/setup");

const app = express();
app.use(express.json());

const PORT = 3000;


sequelize
.authenticate()
.then(() => console.log("Database connected"))
.catch((err) => console.error(err));



app.get("/api/tracks", async (req, res) => {
    try {
        const tracks = await Track.findAll();
        res.json(tracks);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch tracks" });
    }
});



app.get("/api/tracks/:id", async (req, res) => {
    try {
        const track = await Track.findByPk(req.params.id);

    if (!track) {
        return res.status(404).json({ error: "Track not found" });
    }

    res.json(track);
} catch (error) {
    res.status(500).json({ error: "Error retrieving track" });
}
});



app.post("/api/tracks", async (req, res) => {
    try {
        const { songTitle, artistName, albumName, genre } = req.body;

    if (!songTitle || !artistName || !albumName || !genre) {
        return res.status(400).json({
            error: "songTitle, artistName, albumName, and genre are required"
        });
    }

    const newTrack = await Track.create(req.body);

    res.status(201).json(newTrack);
} catch (error) {
    res.status(500).json({ error: "Failed to create track" });
}
});


app.put("/api/tracks/:id", async (req, res) => {
    try {
        const [updated] = await Track.update(req.body, {
            where: { trackId: req.params.id }
    });

    if (!updated) {
        return res.status(404).json({ error: "Track not found" });
    }

    const updatedTrack = await Track.findByPk(req.params.id);

    res.json(updatedTrack);
} catch (error) {
    res.status(500).json({ error: "Failed to update track" });
}
});



app.delete("/api/tracks/:id", async (req, res) => {
    try {
        const deleted = await Track.destroy({
            where: { trackId: req.params.id }
    });

    if (!deleted) {
        return res.status(404).json({ error: "Track not found" });
    }

    res.json({ message: "Track deleted successfully" });
} catch (error) {
    res.status(500).json({ error: "Failed to delete track" });
}
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
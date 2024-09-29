const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
app.use(cors());
const port = 5055;

const client = new MongoClient(uri);

app.get("/posts", async (req, res) => {
  try {
    await client.connect();
    const db = client.db("block");
    const collection = db.collection("posts");

    const movies = await collection.find().limit(20).toArray();
    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data");
  } finally {
    await client.close();
  }
});
app.delete("/posts/:id", async (req, res) => {
  const movieId = req.params.id;

  try {
    await client.connect();
    const db = client.db("block");
    const collection = db.collections("posts");

    const deleteMovie = await collection.deleteOne({
      _id: new ObjectId(movieId),
    });
    if (deleteMovie.deletedCount === 1) {
      res.status(200).json({ message: "Movie deleted successfully" });
    } else {
      res.status(404).json({ message: "Movie not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting movie");
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

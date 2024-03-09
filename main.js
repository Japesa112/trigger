const express = require("express");
const app = express();
const mongoose = require("mongoose");

const TatuaSchema = new mongoose.Schema({
    id: {
      type: Number,
      required: true,
    },
    winSequence: {
      type: String,
      required: true,
    },
  });
  
  const Tatua = mongoose.model("Tatua", TatuaSchema);

app.use(express.json());
app.get("/", async (req, res) => {
  return res.json({ message: "Hello, World ✌️" });
});

app.get("/tatuas", async (req, res) => {
  const allTatuas = await Tatua.find();
  return res.status(200).json(allTatuas);
});

app.get("/tatuas/:id", async (req, res) => {
  const { id } = req.params;
  const tatua = await Tatua.findById(id);
  return res.status(200).json(tatua);
});

app.post("/tatuas", async (req, res) => {
  const newTatua = new Tatua({ id:req.body.id, winSequence:req.body.winSequence });
  const insertedTatua = await newTatua.save();
  return res.status(201).json(insertedTatua);
});

app.put("/tatuas/:id", async (req, res) => {
  const { id } = req.params;
  await Tatua.updateOne({ id }, req.body);
  const updatedTatua = await Tatua.findById(id);
  return res.status(200).json(updatedTatua);
});
app.delete("/tatuas/:id", async (req, res) => {
  const { id } = req.params;
  const deletedTatua = await Tatua.findByIdAndDelete(id);
  return res.status(200).json(deletedTatua);
});

const start = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://omulodeveloper:36827225@cluster0.w6qy8r1.mongodb.net/starter?retryWrites=true&w=majority",
    );
    app.listen(3000, () => console.log("Server started on port 3000"));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();

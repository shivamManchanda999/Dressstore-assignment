const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productController = require("./controllers/productController");

const app = express();

app.use(cors());
app.use(express.json());

async function connectToDatabase() {
  const dbUri =
    "mongodb+srv://techcoder:B3GhOcvRqzvyxZl1@cluster0.ilzm4qh.mongodb.net/DressStore?retryWrites=true&w=majority";
  try {
    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to MongoDB: ${mongoose.connection.db.databaseName}`);
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
}

app.get("/", (req, res) =>
  res.json({ message: "Welcome to the DressStore API." })
);

app.get("/api/products", productController.handleProductRequests);
app.get("/api/products/:id", productController.getProductById);
app.post("/api/products", productController.addProduct);
app.put("/api/products/:id", productController.updateProduct);
app.delete("/api/products/:id", productController.removeProduct);
app.delete("/api/products", productController.deleteAllProducts);

const PORT = process.env.PORT || 8080;
connectToDatabase().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const adminOrderRouter = require("./routes/admin/order-routes");

const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const shopSearchRouter = require("./routes/shop/search-routes");
const shopReviewRouter = require("./routes/shop/review-routes");

const commonFeatureRouter = require("./routes/common/feature-routes");

//create a database connection -> u can also
//create a separate file for this and then import/use that file here

mongoose
  .connect("mongodb://localhost:27017/ecommerce")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => console.log(error));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);

app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);

app.use("/api/common/feature", commonFeatureRouter);

// const categories = ["men", "women", "kids", "accessories", "footwear"];
// const brands = ["Nike", "Adidas", "Puma", "Reebok", "Zara", "H&M"];

// const generateProducts = () => {
//   const products = [];
//   for (let i = 1; i <= 30; i++) {
//     const category = categories[i % categories.length];
//     const brand = brands[i % brands.length];
//     const price = parseFloat((Math.random() * 100 + 10).toFixed(2));
//     const salePrice = parseFloat((price - Math.random() * 20).toFixed(2));
//     const stock = Math.floor(Math.random() * 100) + 10;
//     const avgReview = parseFloat((Math.random() * 5).toFixed(1));

//     products.push({
//       image: `https://via.placeholder.com/150?text=Product+${i}`,
//       title: `${brand} ${category} Product ${i}`,
//       description: `High-quality ${category} product by ${brand}.`,
//       category,
//       brand,
//       price,
//       salePrice,
//       totalStock: stock,
//       averageReview: avgReview,
//     });
//   }
//   return products;
// };

// const seedProducts = async () => {
//   try {
//     // await Product.deleteMany();
//     const products = generateProducts();
//     await Product.insertMany(products);
//     console.log("✅ 30 Products inserted successfully!");
//     // mongoose.disconnect();
//   } catch (err) {
//     console.error("Error inserting products:", err);
//   }
// };

app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));

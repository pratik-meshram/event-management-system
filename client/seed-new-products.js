// New seed file with completely original product data
const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("./models/Product.model");

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/eventms")
  .then(() => console.log("✓ MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Completely original product names and categories
const newProducts = [
  // Home & Living
  { name: "Ceramic Planter Set", price: 899, category: "home", status: "active" },
  { name: "Bamboo Storage Basket", price: 649, category: "home", status: "active" },
  { name: "Velvet Cushion Cover", price: 399, category: "home", status: "active" },
  { name: "Wooden Wall Clock", price: 1299, category: "home", status: "active" },
  { name: "Glass Candle Holder", price: 549, category: "home", status: "active" },
  
  // Tech & Gadgets
  { name: "Wireless Charging Pad", price: 1499, category: "tech", status: "active" },
  { name: "Bluetooth Speaker Mini", price: 2199, category: "tech", status: "active" },
  { name: "USB-C Hub Adapter", price: 1899, category: "tech", status: "active" },
  { name: "Phone Stand Holder", price: 599, category: "tech", status: "active" },
  { name: "Cable Organizer Kit", price: 399, category: "tech", status: "active" },
  
  // Fashion & Accessories
  { name: "Leather Card Wallet", price: 799, category: "fashion", status: "active" },
  { name: "Canvas Tote Bag", price: 699, category: "fashion", status: "active" },
  { name: "Stainless Steel Watch", price: 2499, category: "fashion", status: "active" },
  { name: "Silk Scarf", price: 899, category: "fashion", status: "active" },
  { name: "Sunglasses Classic", price: 1299, category: "fashion", status: "active" },
  
  // Kitchen & Dining
  { name: "Ceramic Coffee Mug Set", price: 699, category: "kitchen", status: "active" },
  { name: "Stainless Steel Bottle", price: 899, category: "kitchen", status: "active" },
  { name: "Bamboo Cutting Board", price: 749, category: "kitchen", status: "active" },
  { name: "Glass Food Container", price: 599, category: "kitchen", status: "active" },
  { name: "Silicone Baking Mat", price: 449, category: "kitchen", status: "active" },
  
  // Health & Wellness
  { name: "Yoga Mat Premium", price: 1499, category: "wellness", status: "active" },
  { name: "Resistance Band Set", price: 799, category: "wellness", status: "active" },
  { name: "Water Bottle Infuser", price: 699, category: "wellness", status: "active" },
  { name: "Foam Roller", price: 1199, category: "wellness", status: "active" },
  { name: "Essential Oil Diffuser", price: 1899, category: "wellness", status: "active" },
  
  // Stationery & Office
  { name: "Leather Notebook", price: 899, category: "stationery", status: "active" },
  { name: "Gel Pen Set", price: 399, category: "stationery", status: "active" },
  { name: "Desk Organizer Tray", price: 649, category: "stationery", status: "active" },
  { name: "Sticky Notes Pack", price: 299, category: "stationery", status: "active" },
  { name: "Bookmark Set", price: 249, category: "stationery", status: "active" },
  
  // Beauty & Personal Care
  { name: "Makeup Brush Set", price: 1299, category: "beauty", status: "active" },
  { name: "Hair Styling Comb", price: 399, category: "beauty", status: "active" },
  { name: "Travel Toiletry Bag", price: 799, category: "beauty", status: "active" },
  { name: "Facial Roller", price: 699, category: "beauty", status: "active" },
  { name: "Nail Care Kit", price: 549, category: "beauty", status: "active" },
  
  // Kids & Toys
  { name: "Wooden Building Blocks", price: 1199, category: "kids", status: "active" },
  { name: "Coloring Book Set", price: 499, category: "kids", status: "active" },
  { name: "Puzzle Game", price: 699, category: "kids", status: "active" },
  { name: "Plush Toy Animal", price: 899, category: "kids", status: "active" },
  { name: "Art Supply Kit", price: 1499, category: "kids", status: "active" },
];

async function seedProducts() {
  try {
    // Clear existing products
    await Product.deleteMany({});
    console.log("✓ Cleared existing products");

    // Insert new products
    await Product.insertMany(newProducts);
    console.log(`✓ Inserted ${newProducts.length} new products`);

    console.log("\n✓ Database seeded successfully with original products!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedProducts();

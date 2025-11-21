// queries.js
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function runQueries() {
  try {
    await client.connect();
    const db = client.db("plp_bookstore");
    const books = db.collection("books");

    // 1. Find all books in a specific genre
    console.log(await books.find({ genre: "Fantasy" }).toArray());

    // 2. Find books published after a certain year
    console.log(await books.find({ published_year: { $gt: 2000 } }).toArray());

    // 3. Find books by a specific author
    console.log(await books.find({ author: "George Orwell" }).toArray());

    // 4. Update the price of a specific book
    await books.updateOne({ title: "1984" }, { $set: { price: 15.99 } });

    // 5. Delete a book by its title
    await books.deleteOne({ title: "The Hobbit" });

    // 6. Find books in stock and published after 2010
    console.log(await books.find({ in_stock: true, published_year: { $gt: 2010 } }).toArray());

    // 7. Projection: only title, author, price
    console.log(await books.find({}, { projection: { _id: 0, title: 1, author: 1, price: 1 } }).toArray());

    // 8. Sorting: by price ascending
    console.log(await books.find().sort({ price: 1 }).toArray());

    // 9. Sorting: by price descending
    console.log(await books.find().sort({ price: -1 }).toArray());

    // 10. Pagination: 5 books per page
    console.log(await books.find().skip(0).limit(5).toArray());

    // 11. Aggregation: average price by genre
    console.log(await books.aggregate([
      { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
    ]).toArray());

    // 12. Aggregation: author with most books
    console.log(await books.aggregate([
      { $group: { _id: "$author", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ]).toArray());

    // 13. Aggregation: books by decade
    console.log(await books.aggregate([
      { $project: { decade: { $multiply: [ { $floor: { $divide: ["$published_year", 10] } }, 10 ] } } },
      { $group: { _id: "$decade", count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]).toArray());

    // 14. Indexing
    await books.createIndex({ title: 1 });
    await books.createIndex({ author: 1, published_year: -1 });
    console.log(await books.find({ title: "1984" }).explain("executionStats"));

  } finally {
    await client.close();
  }
}

runQueries().catch(console.dir);

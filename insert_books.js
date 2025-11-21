// insert_books.js
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db("plp_bookstore");
    const books = database.collection("books");

    const sampleBooks = [
      { title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Classic", published_year: 1925, price: 10.99, in_stock: true, pages: 218, publisher: "Scribner" },
      { title: "1984", author: "George Orwell", genre: "Dystopian", published_year: 1949, price: 9.99, in_stock: true, pages: 328, publisher: "Secker & Warburg" },
      { title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Classic", published_year: 1960, price: 12.5, in_stock: true, pages: 281, publisher: "J.B. Lippincott & Co." },
      { title: "The Hobbit", author: "J.R.R. Tolkien", genre: "Fantasy", published_year: 1937, price: 14.99, in_stock: false, pages: 310, publisher: "George Allen & Unwin" },
      { title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", genre: "Fantasy", published_year: 1997, price: 8.99, in_stock: true, pages: 309, publisher: "Bloomsbury" },
      { title: "Pride and Prejudice", author: "Jane Austen", genre: "Romance", published_year: 1813, price: 7.99, in_stock: false, pages: 279, publisher: "T. Egerton" },
      { title: "The Da Vinci Code", author: "Dan Brown", genre: "Thriller", published_year: 2003, price: 11.5, in_stock: true, pages: 489, publisher: "Doubleday" },
      { title: "The Catcher in the Rye", author: "J.D. Salinger", genre: "Classic", published_year: 1951, price: 10.0, in_stock: true, pages: 234, publisher: "Little, Brown and Company" },
      { title: "The Alchemist", author: "Paulo Coelho", genre: "Adventure", published_year: 1988, price: 9.5, in_stock: true, pages: 208, publisher: "HarperTorch" },
      { title: "The Hunger Games", author: "Suzanne Collins", genre: "Dystopian", published_year: 2008, price: 12.99, in_stock: true, pages: 374, publisher: "Scholastic Press" }
    ];

    const result = await books.insertMany(sampleBooks);
    console.log(`${result.insertedCount} books inserted successfully.`);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);

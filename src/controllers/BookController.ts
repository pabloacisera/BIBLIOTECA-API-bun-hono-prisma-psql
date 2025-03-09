import type { Context } from "hono";
import BookService from "../services/BookService";

class BookController {

  async getAllBooks(c: Context)
  {
    try{

      let books = await BookService.getAllBooks()

      return c.json(books, 200)

    }catch(error){

      return c.json({ error: "Internal Server Error" }, 500)

    }
  }

  async getBookById(c:Context){

    let id = parseInt(c.req.param("id"))

    if(isNaN(id))
    {
      return c.json({ error: "Invalid id" }, 400)
    }

    try{

      let book = await BookService.getBookById(id)

      if(!book)
      {
        return c.json({ error: "Book not found" }, 404)
      }

      return c.json(book, 200)

    } catch(error){
    
      return c.json({ error: "Internal Server Error" }, 500)

    }

  }

  async createBook(c: Context)
  {
    const { title, author, year } = await c.req.json()

    if(!title || !author || !year)
    {
      return c.json({ error: "Missing required fields" }, 400)
    }

    try{
      let newBook = await BookService.createBook( title, author, year)

      return c.json(newBook, 201)
    }catch(error){
      
      return c.json({ error: "Internal Server Error" }, 500)

    }

  }

  async updateBook(c: Context){

    let id = parseInt(c.req.param("id"))

    if(isNaN(id))
    {
      return c.json({ error: "Invalid id" }, 400)
    }

    const { title, author, year } = await c.req.json()

    if(!title || !author || !year)
    {
      return c.json({ error: "Missing required fields" }, 400)
    }

    try{
      let updatedBook = await BookService.updateBook(id, title, author, year )

      if(!updatedBook)
      {
        return c.json({ error: "Book not found" }, 404)
      }

      return c.json(updatedBook, 200)
    }catch(error){

      return c.json({ error: "Internal Server Error" }, 500)
    }

  }

  async deleteBook(c: Context)
  {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) {
      return c.json({ error: "Invalid ID" }, 400);
    }

    try {
      const deletedBook = await BookService.deleteBook(id);
      if (!deletedBook) {
        return c.json({ error: "Book not found" }, 404);
      }
      return c.json({ message: "Book deleted successfully" }, 200);
    } catch (error) {
      return c.json({ error: "Internal Server Error" }, 500);
    }
  }

}

export default new BookController()


























import prisma from '../config/db'

class BookService {
  
  async getAllBooks()
  {
    return await prisma.book.findMany()
  }

  async getBookById(id: number)
  {
    return await prisma.book.findUnique({
      where: {
        id
      }
    })
  }

  //new book 
  async createBook(title: string, author: string, year: number)
  {
    return await prisma.book.create({
      data: { title,author,year }
    })
  }

  //update book
  async updateBook(id: number, title: string, author: string, year: number)
  {
    return await prisma.book.update({
      where: {id},
      data: { title, author, year },
    })
  }

  // delete book
  async deleteBook(id: number)
  {
    return await prisma.book.delete({
      where: { id }
    })
  }

}

export default new BookService()

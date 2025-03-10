import prisma from '../config/db'
import { BadRequestError, NotFoundError } from '../utils/errorHandler'

export class LoanService {

  static async createLoan(bookId: number, memberId: number){

    // verificar si el libro existe y esta disponible

    let book = await prisma.book.findUnique({ where: { id: bookId } })

    if(!book){
      throw new NotFoundError('Book not Found')
    }

    if(book.quantity <= 0){
      throw new BadRequestError("Book is not available for loan")
    }

    // verificar si el socio existe

    const member = await prisma.member.findUnique({ where: { id: memberId } })

    if(!member){
      throw new NotFoundError("Member not found")
    }

    // crear el prestamo

    const loan = await prisma.loan.create({

      data: {
        bookId, memberId, loanDate: new Date()
      }
    })

    // actualizar la cantidad disponible
    
    await prisma.book.update({
      where: { id: bookId },
      data: { quantity: book.quantity - 1 }
    })

    return loan;
  }

  static async getAllLoans(){

    return prisma.loan.findMany({
      include: { book: true, member: true}
    })
  }

  static async getLoanById(id: number){

    let loan = await prisma.loan.findUnique({
      where: {id},
      include:{ book:true, member:true }
    })

    if(!loan){
      throw new NotFoundError('Loan not found')
    }

    return loan;
  }

  static async deleteLoanById(id: number){

    let loan = await prisma.loan.findUnique({where: {id}})

    if(!loan){
      throw new NotFoundError('Loan not found')
    }
    
    await prisma.book.update({
      where: {id: loan.bookId},
      data: {quantity: {increment: 1}}
    })

    return prisma.loan.delete({where: {id}})
  }

  // actualizar registro de prestamo:

  static async updateLoan(id: number, bookId?: number, memberId?: number, loanDate?: Date) {
    const loan = await prisma.loan.findUnique({ where: { id } });
  
    if (!loan) {
      throw new NotFoundError('Loan not found');
    }
  
    if (bookId && loan.bookId !== bookId) {
      // Si se está cambiando el libro, ajustar cantidades
      await prisma.book.update({
        where: { id: loan.bookId },
        data: { quantity: { increment: 1 } }
      });
  
      await prisma.book.update({
        where: { id: bookId },
        data: { quantity: { decrement: 1 } }
      });
    }
  
    if (memberId) {
      const member = await prisma.member.findUnique({ where: { id: memberId } });
  
      if (!member) {
        throw new NotFoundError('Member not found');
      }
    }
  
    // Actualizar el préstamo con los nuevos datos
    return prisma.loan.update({
      where: { id },
      data: {
        bookId: bookId ?? loan.bookId,
        memberId: memberId ?? loan.memberId,
        loanDate: loanDate ?? loan.loanDate,
      },
    });
  }
  
}
import prisma from '../config/db'

import { BadRequestError, NotFoundError } from '../utils/errorHandler'


export class ReturnService{
  
  static async createReturn(loanId: number, returnedQuantity: number){
    
    let loan = await prisma.loan.findUnique({
      where: { id: loanId },
      include: { book:true }
    })

    if(!loan){
      throw new NotFoundError('Loan not found')
    }

    if(loan.isReturned){
      throw new Error('Loan has already been returned')
    }

    let returnRecord = await prisma.return.create({
      data: {
        loanId,
        returnDate: new Date(),
      }
    })

    //actualizar el prestamo devuelto.

    await prisma.loan.update({
      where: { id:loanId },
      data: { isReturned: true }
    })

    // incrementar la cantidad de libros disponibles.
    
    await prisma.book.update({
      where: {id: loan.bookId},
      data: {quantity: { increment: returnedQuantity }}
    })

    return returnRecord;
  }

  static async getAllReturns(){

    return prisma.return.findMany({
      include: { loan: { include: { book:true, member: true } } }  
    })
  }

  
  static async deleteReturnById(id: number, returnedQuantity:number){
    
    let returnRecord = await prisma.return.findUnique({ where: { id } })

    if(!returnRecord){
      throw new NotFoundError('Return not found')
    }

    let loan = await prisma.loan.findUnique({ where: { id: returnRecord.loanId } })

    if(loan && loan.isReturned){
      
      await prisma.book.update({
        where: { id: loan.bookId },
        data: { quantity: { decrement: returnedQuantity}}
      })

      await prisma.loan.update({
        where: { id: returnRecord.loanId },
        data: { isReturned: false }
      })
    }

    return prisma.return.delete({ where: { id } })

  }


  static async getReturnById(id: number) {
    const returnRecord = await prisma.return.findUnique({
      where: { id },
      include: { loan: { include: { book: true, member: true } } }
    });

    if (!returnRecord) {
      throw new NotFoundError('Return not found');
    }

    return returnRecord;
  }

  static async updateReturn(id: number, loanId: number, returnedQuantity: number) {
    const returnRecord = await prisma.return.update({
      where: { id },
      data: {
        loanId,
        returnDate: new Date(),
      },
    });

    await prisma.book.update({
      where: { id: loanId },
      data: { quantity: { increment: returnedQuantity } }
    });

    return returnRecord;
  }
}























import prisma from "../config/db"
import { Prisma } from '@prisma/client'
import {
  NotFoundError,
  BadRequestError
} from '../utils/errorHandler'

class MemberService {
  
  async createMember(data: { name: string; email: string; phone?:string }){

    try{

      return await prisma.member.create({ data })
  
    }catch(error){

      if(error instanceof Prisma.PrismaClientKnownRequestError){
        if(error.code === 'P2002'){
          throw new BadRequestError('Email already exists')
        }
      }

      throw error

    }

  }

  async getMemberById(id: number){

    const member = await prisma.member.findUnique({ where: { id } })

    if(!member){
      throw new NotFoundError('Member not found')
    }

    return member

  }

  
  async getAllMembers(){
    return await prisma.member.findMany()
  }

  
  async updateMember(id: number, data: { name?: string; email?: string, phone?: string }){
    
    try{

      return await prisma.member.update({ where: { id }, data })

    }catch(error){

      if(error instanceof Prisma.PrismaClientKnownRequestError){
        
        if(error.code === 'P2025'){
          throw new NotFoundError('Member not found')
        }
      }
      throw error
    }
  }

  async deleteMember(id: number){

    try{
      await prisma.member.delete({ where: { id } })
    }catch(error){
      // Verificamos si el error es una instancia de PrismaClientKnownRequestError
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // P2025 es el código de error para registro no encontrado
        if (error.code === 'P2025') {
          throw new NotFoundError('Member not found');
        }
      }
      throw error;
    }

  }
}

export default new MemberService()

import type { Context } from "hono";
import MService from "../services/MemberService";
import { BadRequestError, NotFoundError } from "../utils/errorHandler";

export class MemberController{

  async createMember(ctx: Context){
    try{
      let data = await ctx.req.json()

      let member = await MService.createMember(data)

      return ctx.json(member, 201)
    }catch(error){

      if(error instanceof BadRequestError){
        return ctx.json({ error: error.message }, 400)
      }
    }
  }

  async getMember(ctx: Context){
     try{
      let id = parseInt(ctx.req.param('id'))

      let member = await MService.getMemberById(id)

      return ctx.json(member)
     }catch(error){

       if(error instanceof NotFoundError){
        return ctx.json({ error: error.message }, 404)
       }

       return ctx.json({ error: 'Internal server error' }, 500)
     }
  }

  async getAllMembers(ctx: Context){
     try{
        let members = await MService.getAllMembers()
        return ctx.json(members)
     }catch(error){
       return ctx.json({error: "Internal server error"}, 500)
     }
  }

  async updateMember(ctx: Context) {
    try {
      const id = parseInt(ctx.req.param('id'));
      const data = await ctx.req.json();
      const member = await MService.updateMember(id, data);
      return ctx.json(member);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return ctx.json({ error: error.message }, 404);
      }
      return ctx.json({ error: 'Internal Server Error' }, 500);
    }
  }

  async deleteMember(ctx: Context) {
    try {
      const id = parseInt(ctx.req.param('id'));
      await MService.deleteMember(id);
      return ctx.json(null);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return ctx.json({ error: error.message }, 404);
      }
      return ctx.json({ error: 'Internal Server Error' }, 500);
    }
  }

}

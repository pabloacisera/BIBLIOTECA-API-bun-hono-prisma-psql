import type { Context } from "hono";
import { ReturnService } from "../services/ReturnService";
import { BadRequestError, NotFoundError } from "../utils/errorHandler";


class ReturnController{

  async createReturn(c: Context){

    let { loanId, returnedQuantity } = await c.req.json()
    
    if(!loanId || !returnedQuantity){
      return c.json({
        error: 'Missing required fields'
      }, 400)
    }

    try{
      
      let returnRecord = await ReturnService.createReturn(parseInt(loanId), parseInt(returnedQuantity))
      return c.json(returnRecord, 201)

    }catch(error){
      return handleErrorResponse(c, error) 
    }
  }

  async getAllReturns(c: Context){
    try{
      let returns = await ReturnService.getAllReturns()

      return c.json(returns,200)
    }catch(error){

      return handleErrorResponse(c, error)
    }
  }


  async getReturnById(c: Context){
    
    let id = parseInt(c.req.param('id'))

    if(isNaN(id)){
      return c.json({ error: 'Invalid Id' }, 400)
    }

    try{
      
      let returnRecord = await ReturnService.getReturnById(id)

      return c.json(returnRecord, 200)
    }catch(error){

      return handleErrorResponse(c, error)
    }
  }

  async deleteReturn(c: Context){
    
    let id = parseInt(c.req.param('id'))
    let { returnedQuantity } = await c.req.json()

    if(isNaN(id) || !returnedQuantity){
      return c.json({ error: 'Invalid Id or missing returned quantity' }, 400)
    }

    try{
      let deleteReturn = await ReturnService.deleteReturnById(id, parseInt(returnedQuantity))

      return c.json(deleteReturn)
    }catch(error){

      return handleErrorResponse(c, error)
    }
  }

  async updateReturn(c: Context){
  
    let id = parseInt(c.req.param('id'))
    let { loanId, returnedQuantity } = await c.req.json();

    if (isNaN(id) || !loanId || !returnedQuantity) {
      return c.json({ error: 'Invalid ID or missing required fields' }, 400);
    }

    try {
      const updatedReturn = await ReturnService.updateReturn(id, parseInt(loanId), parseInt(returnedQuantity));
      return c.json(updatedReturn, 200);
    } catch (error) {
      return handleErrorResponse(c, error);
    }
  
  }
 }


function handleErrorResponse(c: Context, error: any){
    if(error instanceof BadRequestError){
      return c.json({ error: error.message }, 400)
    } else if(error instanceof NotFoundError){
      return c.json({ error: error.message }, 404)
    } else {
      console.error(error)
      return c.json({ error: "Internal server error" }, 500)
    }
  }


export default new ReturnController()

import type { Context } from 'hono';
import { LoanService } from '../services/LoanService'

class LoanController {

  async createLoan(c: Context) {

    const { bookId, memberId } = await c.req.json()

    if (!bookId || !memberId) {
      return c.json({
        error: "Missing required fields"
      }, 400)
    }

    try {

      let loan = await LoanService.createLoan(bookId, memberId)

      return c.json(loan, 201)
    } catch (error) {

      // Verificar si error es del tipo esperado
      if (error instanceof Error) {
        // Si error tiene `statusCode`, úsalo, de lo contrario usa 500
        const statusCode = (error as any).statusCode || 500;
        return c.json({ error: error.message }, statusCode);
      }

      // Manejo genérico en caso de que el error no sea de tipo Error
      return c.json({ error: "Unknown error occurred" }, 500)
    }
  }

  async getAllLoans(c: Context) {
    try {
      const loans = await LoanService.getAllLoans();
      return c.json(loans, 200);
    } catch (error: any) {
      return c.json({ error: error.message }, error.statusCode || 500);
    }
  }

  async getLoanById(c: Context) {
    const id = parseInt(c.req.param("id"));

    if (isNaN(id)) {
      return c.json({ error: "Invalid ID" }, 400);
    }

    try {
      const loan = await LoanService.getLoanById(id);
      return c.json(loan, 200);
    } catch (error: any) {
      return c.json({ error: error.message }, error.statusCode || 500);
    }
  }

  async updateLoan(c: Context) {
    const id = parseInt(c.req.param("id"));

    if (isNaN(id)) {
      return c.json({ error: "Invalid ID" }, 400);
    }

    const { bookId, memberId, loanDate } = await c.req.json();

    try {
      const updatedLoan = await LoanService.updateLoan(id, bookId, memberId, loanDate);
      return c.json(updatedLoan, 200);
    } catch (error: any) {
      return c.json({ error: error.message }, error.statusCode || 500);
    }
  }

  async deleteLoan(c: Context) {
    const id = parseInt(c.req.param("id"));

    if (isNaN(id)) {
      return c.json({ error: "Invalid ID" }, 400);
    }

    try {
      await LoanService.deleteLoanById(id);
      return c.json({ message: "Loan deleted successfully" });
    } catch (error: any) {
      return c.json({ error: error.message }, error.statusCode || 500);
    }
  }
}

export default new LoanController()
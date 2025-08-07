import type { HttpContext } from '@adonisjs/core/http'
import Expense from '#models/expense'
import { ExpesneValidator } from '#validators/expense_validator'

export default class ExpensesController {
  async getallExpense(ctx: HttpContext) {
    const Expenses = await Expense.all()

    return {
      message: 'get all expense',
      //@ts-ignore
      user: Expenses,
    }
  }

  async addExpense(ctx: HttpContext) {
    const data = ctx.request.body()
    //@ts-ignore
    const userId = String(ctx.user.id)
    data.user_id = userId
    const payload = await ExpesneValidator.validate(data)
    const res = await Expense.create(payload as object)
    console.log(res)
    return {
      success: true,
      message: 'Expense added',
    }
  }
}

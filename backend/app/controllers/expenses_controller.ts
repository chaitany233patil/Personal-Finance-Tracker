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
    const userId = ctx.user.id
    data.user_id = userId
    const payload = await ExpesneValidator.validate(data)
    const res = await Expense.create(payload as object)
    console.log(res)
    return {
      success: true,
      message: 'Expense added',
    }
  }

  async updateExpense(ctx: HttpContext) {
    const id = ctx.request.param('id')
    //@ts-ignore
    const userId = ctx.user.id
    const expense = await Expense.find(id)
    if (!expense) {
      return {
        success: false,
        message: 'expense you request does not exist',
      }
    }

    if (expense.user_id !== userId) {
      return {
        success: false,
        message: 'Unauthorized access to this expense',
      }
    }

    const updateData = ctx.request.only(['title', 'amount', 'type', 'date', 'receipt_url'])
    expense.merge(updateData)
    await expense.save()

    return {
      success: true,
      message: 'Expense Updated',
    }
  }

  async deleteExpense(ctx: HttpContext) {
    const id = ctx.request.param('id')
    //@ts-ignore
    const userId = ctx.user.id
    const expense = await Expense.find(id)
    if (!expense) {
      return {
        success: false,
        message: 'Expense does Not Exist',
      }
    }

    if (expense.user_id !== userId) {
      return {
        success: false,
        message: 'Unauthorized access to this expense',
      }
    }
    await expense.delete()
    return {
      success: true,
      message: 'Expense Deleted!',
    }
  }
}

/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const AuthController = () => import('#controllers/auth_controller')
const ExpensesController = () => import('#controllers/expenses_controller')

router.get('/', async () => {
  return {
    heath: 'Good',
  }
})

//auth routes
router.post('/register', [AuthController, 'registerUser'])
router.post('/login', [AuthController, 'login'])
router.get('/me', [AuthController, 'me']).use(middleware.jwtAuth())

//Expense Routes
router
  .group(() => {
    router.get('/', [ExpensesController, 'getallExpense'])
    router.post('/', [ExpensesController, 'addExpense'])
    router.put('/:id', [ExpensesController, 'updateExpense'])
    router.delete('/:id', [ExpensesController, 'deleteExpense'])
  })
  .prefix('/expense')
  .use(middleware.jwtAuth())

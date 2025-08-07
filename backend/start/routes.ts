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
    hello: 'world',
  }
})

//auth routes
router.post('/register', [AuthController, 'registerUser'])
router.post('/login', [AuthController, 'login'])
router.get('/me', [AuthController, 'me']).use(middleware.jwtAuth())

//Expense Routes
router.get('/expense', [ExpensesController, 'getallExpense']).use(middleware.jwtAuth())
router.post('/expense', [ExpensesController, 'addExpense']).use(middleware.jwtAuth())

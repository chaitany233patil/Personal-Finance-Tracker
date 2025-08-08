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
import CloudinaryService from '#services/cloudinary_service'

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
router
  .group(() => {
    router.get('/', [ExpensesController, 'getallExpense'])
    router.post('/', [ExpensesController, 'addExpense'])
    router.put('/:id', [ExpensesController, 'updateExpense'])
    router.delete('/:id', [ExpensesController, 'deleteExpense'])
  })
  .prefix('/expense')
  .use(middleware.jwtAuth())

router.post('/upload', async ({ request, response }) => {
  const receipt = request.file('receipt', {
    size: '2mb',
    extnames: ['jpg', 'png', 'jpeg'],
  })

  if (!receipt?.isValid) {
    return response?.badRequest({
      errors: receipt?.errors,
    })
  }

  const uploadResult = await CloudinaryService.uploadFile(receipt.tmpPath!, 'my_project/posts')
  console.log(uploadResult.url)
  return {
    file: uploadResult.url,
  }
})

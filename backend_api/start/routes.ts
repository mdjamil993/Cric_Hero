import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return 'Welcome to the cric hero app'
})

Route.post('/storeUsers', 'UsersController.store') ;
Route.get('/showUsers', 'UsersController.index') ;
Route.post('/storeOvers', 'OversController.store') ;
Route.post('/storeBalls', 'BallsController.store') ;

Route.get('/showBalls', 'BallsController.show') ;

Route.get('/showSingleBatsman', 'UsersController.show') ;




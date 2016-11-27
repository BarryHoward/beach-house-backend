const Route = use('Route')

Route.on('/').render('welcome')

//----------- Owners -----------------------------------------------------------

Route.post('/login', 'UserController.login');

Route.get('/owners', 'UserController.index');
Route.get('/owners/:owner_id', 'UserController.show');

Route.post('/owners', 'UserController.create').middleware('auth')
Route.patch('/owners/:owner_id', 'UserController.update').middleware('auth');
Route.delete('/owners/:owner_id', 'UserController.delete').middleware('auth');
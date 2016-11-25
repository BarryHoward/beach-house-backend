'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

Route.on('/').render('welcome')

//----------- Owners -----------------------------------------------------------

Route.get('/login', 'UserController.login');

Route.get('/owners', 'UserController.index');
Route.get('/owners/:owner_id', 'UserController.show');

Route.post('/owners', 'UserController.create')
Route.patch('/owners/:owner_id', 'UserController.update').middleware('auth');
Route.delete('/owners/:owner_id', 'UserController.delete').middleware('auth');
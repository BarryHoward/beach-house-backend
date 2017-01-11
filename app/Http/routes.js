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

Route.post('/login', 'UserController.login');

Route.get('/owners', 'UserController.index');
Route.get('/owners/:owner_id', 'UserController.show');

Route.post('/owners', 'UserController.create').middleware('auth')
Route.patch('/owners/:owner_id', 'UserController.update').middleware('auth');
Route.delete('/owners/:owner_id', 'UserController.delete').middleware('auth');
Route.delete('/people/:person_id', 'UserController.deletePerson').middleware('auth');

Route.get('/comments', 'CommentController.index');
Route.get('/comments/:date', 'CommentController.show');
Route.post('/comments', 'CommentController.change').middleware('auth')
// Route.patch('/comments/:comment_id', 'CommentController.update').middleware('auth');
Route.delete('/comments/:comment_id', 'CommentController.delete').middleware('auth')

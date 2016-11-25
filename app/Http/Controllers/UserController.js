'use strict'

const User = use('App/Model/User')
const Hash = use('Hash')

class UserController {

	* login (request, response){
		let data = request.only('username', 'password')
		let user = yield User.findBy('username', data.username)

		try {
			let correct = Hash.verify(data.password, user.password)
			if (!correct) { 
				throw new Error() 
			}
			user.access_token = yield request.auth.generate(user)
      		response.status(201).json(user)

		} catch(error) {
			response.status(401).json({text: "Wrong user name or password!"})
		}
	}


	* create (request, response){
		let admin = request.authUser;
		if (admin.admin){
			let data = request.only('username', 'password', 'email', 'info')
			data.password = yield Hash.make('password')
			data.admin = false;
			let user = yield User.create(data)
			response.status(201).json(user.toJSON())
		} else {
			response.status(401).json({text: "Only admins can create new users"})
		}
	}


	* index (request, response){
		const user_list = yield User.query().table('users')
		.orderBy('username', 'asc')
		response.status(200).json(user_list)
	}

	* show(request, response){
		let user_id = request.param("owner_id")
		let user = yield User.findBy('id', user_id)
		response.status(201).json(user)
	}

	* delete (request, response){
		let user_id = request.param("owner_id")

		let user = yield User.findBy('id', user_id)
		let admin_user = request.authUser

		if (!user){
			response.status(404)
		} else {
		  	if (admin_user.admin){
		  		yield user.delete()
		  		response.status(204)
		  	} else {
		  		response.status(403).json({text: "Only admins can delete users"})
		  	}
		}
	}


}

module.exports = UserController

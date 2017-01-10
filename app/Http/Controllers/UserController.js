'use strict'

const User = use('App/Model/User')
const Person = use('App/Model/Person')
const Hash = use('Hash')

class UserController {

	* login (request, response){
		let data = request.only('username', 'password')
		let user = yield User.findBy('username', data.username)

		try {
			let correct = yield Hash.verify(data.password, user.password)
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
			let data = request.only('username', 'password')
			data.password = yield Hash.make(data.password)
			data.admin = false;
			let user = yield User.create(data)
			response.status(201).json(user)
		} else {
			response.status(403).send()
		}
	}


	* index (request, response){
		const user_list = yield User.query().table('users')
		.orderBy('username', 'asc')
		.where('admin', false)
		response.status(200).json(user_list)
	}

	* show(request, response){
		let user_id = request.param("owner_id")
		let user = yield User.findBy('id', user_id)
		if (user){
			let people = yield Person.query().table('people')
				.where("user_id", user.id)
			user.people = people;
			console.log(user)
			response.status(200).json(user)
		} else {
			response.status(404).send()
		}
	}

	* update(request, response){
		let user = request.authUser;
		let data = request.only('username', 'password', 'interval_1', 'interval_2', 'interval_3')	

		let owner_id = request.param("owner_id") // get id of current owner
		let owner = yield User.findBy('id', owner_id) // get current owner
		data.password = yield Hash.make(data.password)

		// update people
		let people = request.only('people')
		let peopleArray = people.people
		for (var i=0; i<peopleArray.length; i++){
			try {
				let person = yield Person.findBy('id', peopleArray[i].id)
				if (!person) { 
					throw new Error() 
				}
				console.log("exist")
				person.fill(peopleArray[i])
				yield person.save()
			} catch(error) {
				console.log("no exist")
				yield Person.create(peopleArray[i])
			}
		}


		if (!owner){
			response.status(404).json({error: "Owner not found"})
		} else if (owner.id !== user.id && !user.admin ){
			response.status(403).json({error: "Not logged into correct user"})
		} else {
			owner.fill(data)
			yield owner.save()
			response.status(201).json(owner)
		}
	}

	* delete (request, response){
		let user_id = request.param("owner_id")

		let user = yield User.findBy('id', user_id)
		let admin_user = request.authUser

		if (!user){
			response.status(404).send()
		} else {
		  	if (admin_user.admin){
		  		yield user.delete()
		  		response.status(204).send()
		  	} else {
		  		response.status(403).send()
		  	}
		}
	}


}

module.exports = UserController

'use strict'

const Comment = use('App/Model/Comment')

class CommentController {

	* create (request, response){
		let user = request.authUser;
		if (user){
			let data = request.only('week_of', 'clean', 'repair', 'beds', 'towels', 'windows', 'supplies', 'content')
			data.users_id = user.id;
			let comment = yield Comment.create(data)
			response.status(201).json(comment.toJSON())
		} else {
			response.status(401).json({text: "Must be logged in to create comment"})
		}
	}


	* index (request, response){
		const comment_list = yield Comment.query().table('comments')
		.orderBy('week_of', 'desc')
		response.status(200).json(comment_list)
	}

	* show(request, response){
		let comment_id = request.param("comment_id")
		let comment = yield Comment.findBy('id', comment_id)
		if (comment){
			response.status(200).json(comment)
		} else {
			response.status(404).send()
		}
	}

	* delete (request, response){
		let comment_id = request.param("comment_id")

		let comment = yield Comment.findBy('id', comment_id)
		let user = request.authUser

		if (!comment){
			response.status(404).send()
		} else {
		  	if (user.admin || (user.id === comment.users_id)){
		  		yield user.delete()
		  		response.status(204).send()
		  	} else {
		  		response.status(403).send()
		  	}
		}
	}

}

module.exports = CommentController

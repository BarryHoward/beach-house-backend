'use strict'

const Comment = use('App/Model/Comment')

class CommentController {

	* change (request, response){
		let user = request.authUser;
		let data = request.only('day', 'month', 'year', 'clean', 'repair', 'beds', 'towels', 'windows', 'supplies', 'content')
		data.users_id = user.id;
		data.username = user.username;

		let prev_comment = yield Comment.findBy({"day": data.day, "month": data.month, "year": data.year})

		if (!user){
			response.status(401).json({text: "Must be logged in to create comment"})
		} else if(!prev_comment) {
			let comment = yield Comment.create(data)
			response.status(201).json(comment)
		} else {
			prev_comment.fill(data)
			yield prev_comment.save()
			response.status(200).json(prev_comment)
		}
	}


	* index (request, response){
		const comment_list = yield Comment.query().table('comments')
		.orderBy('year', 'desc')
		.orderBy('month', 'desc')
		.orderBy('day', 'desc')
		response.status(200).json(comment_list)
	}

	* show(request, response){
		let date = request.param("date")
		let dateArray = date.split("-")

		let comment = yield Comment.findBy({"day": dateArray[2],
			"month": dateArray[1], "year": dateArray[0]})

		console.log(dateArray, comment)
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
		  	if (user){
		  		yield comment.delete()
		  		response.status(204).send()
		  	} else {
		  		response.status(401).json({text: "Must be logged in to delete comment"})
		  	}
		}
	}

}

module.exports = CommentController

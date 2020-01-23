# task-manager-api
Welcome to the task-manager-api
The task manager api was built using node, express and mongoDB and deployed to heroku
With the task api users can read task's, create task's, delete task's, update task's, upload user profile images.
It also uses JWT(JSON Web Token) to enforce Authentication. Making sure that user's can only access the task's they've created.
Jest was used as a testing framework and expect as an assertion library to test endpoints.
SendGrid was intergrated as an email sending service.
you can test the api's using postman 
use this url http://olaniyi-chat-app.herokuapp.com/users and POST as the HTTP method to access on Postman to create an account
passing user details such as name and email as body of the request like so :
{
	"name": "userfname userlname",
	"email": "useremail@gmail.com",
	"password": "past123456910"
}


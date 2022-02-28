// External modules
const express = require('express')
const StatusCodes = require('http-status-codes').StatusCodes;
const package = require('./package.json');
const uuid = require('uuid'); //for unique id
const argon2 = require("argon2"); // for hashing
const fs = require('fs');
const path = require('path');
const moment = require('moment');

//internal modules
var posts = require('./posts');
var messages = require('./messages')
var users = require('./users')
var db = require('./DB');

const app = express();
let  port = 2718;



app.get('/', function(req, res){res.sendFile(path.join(__dirname + '/site/step1/index.html'));});





// General app settings
const content_type_from_extension = (url) => {
	const reExt=/\.([a-z]+)/i;
	const m=url.match(reExt);
	if (!m) return 'application/json'
	const ext=m[1].toLowerCase();

	switch (ext)
	{
		case 'js': return 'text/javascript';
		case 'css': return 'text/css';
		case 'html': return 'text/html';
	}
	return 'text/plain'
};

const set_content_type = function (req, res, next) 
{
	const content_type=req.baseUrl=='/api' ?
	"application/json; charset=utf-8" : content_type_from_extension(req.url)
	res.setHeader("Content-Type", content_type);
	next();
}

app.use( set_content_type );
app.use(express.static(path.join(__dirname,'site/step1'))); 
app.use(express.json());
app.use(express.urlencoded({extended: true}));



// Version 	
function get_version( req, res) 
{
	const version_obj = { version: package.version, description: package.description };
	res.status( StatusCodes.OK );
	res.send(  JSON.stringify( version_obj) );
}

// Routing
const router = express.Router();


//user routs
//router.get('/', () => { response.sendFile('./site/step1/index.html'); })
router.get('/version', (req, res) => { get_version(req, res )  } )
router.post('/users', users.create_user )
router.put('/user/(:id)',  users.update_user)
router.get('/user/(:id)',  users.get_user)
router.post('/user/login',  users.login_user)
router.get('/useremail/(:email)', users.get_user_id)
router.post('/user/logout',  users.logout_user)
//only admin
router.get('/users', users.list_users )
router.delete('/user/(:id)',  users.delete_user)
router.put('/user/state/(:id)', users.update_user_state )

//posts routs
router.post('/posts', posts.create_post )
router.get('/posts', posts.get_posts )
router.delete('/post/(:id)', posts.delete_post )

//messagesRouts
router.post('/message/(:id)', messages.send_message)
router.post('/messages',  messages.send_messages)
router.post('/messages/active/(:id)',  messages.send_activation_msg)
router.get('/messages/(:id)', messages.get_messages )


app.use('/api',router)

// Init Serverr
let msg = `${package.description} listening at port ${port}`
app.listen(port, () => { console.log( msg ) ; })

users.logout_all_users();


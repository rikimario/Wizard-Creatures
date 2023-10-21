# Cheat-sheet 

1. Initialize project
  - npm init -y
  - npm i nodemon -D (change test to start and add 'nodemon src/index.js')
  - create index.js
  - create constants.js

2. npm i express
  - add path
  - add static middlewares (app.use(express.static(path.resolve(__dirname, './public')));)
  - add body parser (app.use(express.urlencoded({ extended: false }));)
  - add router.js

3. Create public folder and add static resources
4. Add views folder with ready html

5. Add express-handlebars view engine
  - npm i express-handlebars
  - add to express (const handlebars = require('express-handlebars'))
  - setup engine handlebars
  - config views folder
  - add layout folder
  - fix static paths
6. Add controllers folder with home controller

7. Add database
 - npm i mongoose
 - connect database

8. Prepare user functionality
  - add user controller
  - add controller to routs
  - fix header navigation to login, register and logout in main layout
  - render login page
  - render register page
  - create post router for login and register
  - redirect register to login and login to '/'

9. Create model folder and add User.js
  - simple validation in Schema

10. Create service folder and add userService.js
  - require User from model folder
  - exports register (exports.register = (userData) => User.create(userData);)
  - import userService to userController
  - create user in post register (await userService.register({ firstName, lastName, email, password, repeatPassword });)
  - validate password mismatch
  - validate username already exist

11. Hash password
  - npm i bcrypt
  - hash password

12. Login
  - add async to post.login
  - add bcrypt to userService
  - find user by email
  - validate password with hash

13. Generate jwt
  - npm i jsonwebtoken
  - create lib folder with jwt.js
  - promisify jwt
  - generate secret (uuid generate)
  - generate token in service login controller

14. Return token in cookie
  - nmp i cookie-parser
  - configure cookie- parser (in index.js)
  - set cookie with the token

15. Implement Logout 

16. Authentication middleware
  - create middleware folder
  - import auth to index.js
  - decode the token
  - handle invalid token
  - provide authorization

17. Dynamic navigation
  - conditionals options in nav
  - add data to res.locals for hbs template

18. Error handling
  - change path to img src in 404
  - add '*' to router.js
  - add 404 page to homeController
  - add error message util

19. Show error notification
  - create utils folder
  - show in the main layout
  - pass error to render  in login and register pages

  ## TODO's


1. Create postController.js
  - create router to posts
  - create router to create
  - create router to profile
2. Create creature model in model folder
  - create creatureSchema
  - create creatureService.js
  - change method to POST in the hbs and delete action
  - add the name for all the inputs
  - import creatureService
  - create post router for create and add payload data from creatureService

3. Edit all-post to be one and map it
  - exports getAll Creatures from creatureService
  - router all async and get all creatures and add lean()

4. Create get router for /:creatureId/details
  - const { creatureId } = req.params;
  - create creature and export single creature from creatureService
  - map throe all-posts.hbs and details
  - add creature. to the details.hbs
  - check for isOwner

5. Create router for edit and delete
  - exports update and delete from creatureService

6. Render Profile

7. Create vote router
  - check if user that voted exists

8. Min length for registering a user in User.js

9. Add Rout guards
  - get isAuth and import it to postController

<!-- 1. Map pages to navigation in both LoggedIn and loggedOut state

2. Add Creature model

3. Implement - All Posts page
  - show each creature with image, name species, description
  - add details btn to every creature

4. Add details page (for Creatures)
  - if no creatures "There are no posts yet.."
  - if the user is the owner of the post should gave  'Edit' and 'Delete' btn -->
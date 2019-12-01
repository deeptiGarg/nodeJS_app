## MIDDLEWARE -

All the functions which have acces to the (req, res) objects and interact to actually manage
the application authentication, error handling, DB connections, logging etc.

Logging - middelware/logger.js => custom simple logging example.
In this project,we use third party logging package called 'morgan'

All middelware functions take in (req, res, next)
next -> to tell the server to run the next middleware function as mentioned

### dotenv - Sets an environment eg. prod, dev, test.

The variables u set in the config.env are loaded into the process.env object and can be accessed in the code through process.env

### CONTROLLERS - (middleware)

Contain the functions which have the actual logic of the apis. get data from DB, create response object.

## MONGOOSE AND FRONT-END functions -

Functions like select some fields, Sorting, pagination, limiting the records- All these are in the GET
method. These are handled using 'req.query' object.

Parameters like id (for updating a resource with id; or get a resource with id) is handled using 'req.params.id'.

## JWT - JSON Web Token JWT.io

Server creates a JWT based on username and password at register and login. Server then sends this JWT token
back to the client (browser) as raw JWT and encapsulated in a cookie. Client side coding can handle and store
the JWT as they want. (either in localStorage or browser cookie) .
Server specifies an expiry date to the JWT when it creates this JWT.

## To RUN -

# In dev mode

npm run dev

# In prod mode

npm start

# Node REST Template
This template provides a starter project for developing RESTful APIs using Node.js, [Bookshelf.js](http://bookshelfjs.org/) and SQL. It encourages best practices in coding and testing, resulting in an accelerated development cycle.

## Requirements

- Install Node
    - on OSX, install [home brew](http://brew.sh/) and type `brew install node`
    - on Windows, use the installer available at [nodejs.org](http://nodejs.org/)

- Install Postgres and postgresql93-devel (development header files and libraries)

- Create a database called `demo` and create the tables needed by the app

        $ cd sql
        $ psql demo
        demo=# \i create-schema.sql
        demo=# \i load-data.sql

- Open a terminal (command line) window

- Type `npm install -g node-inspector node-gyp gulp`
    - node-gyp is required for `npm install` to succeed

- Clone this repo

- Make sure that `server/common/orm.js` has the correct database parameters

## Quick Start
Run the application locally:
```bash
$ npm install
$ gulp serve
```
- `npm install` will install the required node libraries under `node_modules`.
- `gulp serve` will start the application. It is designed for an efficient development process. As you make changes to the code, the application will restart to reflect the changes immediately.

To verify that the application is working correctly, point your browser to [http://localhost:8080/account](http://localhost:8080/account) - you should see a response with account information in JSON format.

When you deploy the application to a production environment, run the following command to start it without using gulp:

    $ npm start

A better way to run the application in production is to start it using forever. This will automatically restart the application in case of a failure:

    $ forever start server/server.js

- To debug the application use node-debug (start node-debug on port 9090 because the application itself uses the default port 8080)

    $ node-debug --web-port 9090 server/server.js

## Folder Structure

### Highest Level Structure

```
/node_modules
/server
/sql
/test
```

- `node_modules:` Node.js modules downloaded by `npm install` (do not check in)
- `server:` contains all the source files for the RESTful server
- `sql`: scripts for creating the database schema and loading data
- `test:` server tests

### Serve Folder Structure

```
/server
    /api
    /app
    /common
    /domain
    /public
    /server.js
```

The `server` folder contains the source for the RESTful server. `server.js` is the startup script. Below this you will find various folders that arrange the application into logical layers as suggested by [Domain-Driven Design](http://www.amazon.com/exec/obidos/ASIN/0321125215/domainlanguag-20) and [The Onion Architecture](http://jeffreypalermo.com/blog/the-onion-architecture-part-1/):

- `api:` This layer exposes the RESTful API. It is essentially the User Interface layer of the Onion Architecture (the "user" for this application is any HTTP client).

- `app:` This is the Application Services layer. It coordinates application activities such as creation and management of the domain objects.

- `common:` This is the infrastructure layer that's supports all other layers.

- `domain:` The domain layer encapsulate the state and behavior of the application's business domain. It consists of entities and value objects. See [this article](http://archfirst.org/books/domain-layer) for a detailed description of the domain layer. We use an Object-Relational Mapping (ORM) tool called [Bookshelf.js](http://bookshelfjs.org/) to persist our entities to a SQL database.

- `public:`: Contains a simple web page to display the name of the application. Since the primary purpose of this server is to expose a RESTful API, we do not expect to add any more functionality to this folder.

## Tasks

### Task Listing

- `gulp help`

    Displays all of the available gulp tasks.

### Code Analysis

- `gulp vet`

    Performs static code analysis on all javascript files. Runs jshint and jscs.

- `gulp vet --verbose`

    Displays all files affected and extended information about the code analysis.

### Testing

- `gulp test`

    Runs all acceptance tests using cucumber. Depends on vet task, for code analysis. Note that this task will alter the database. To resume normal operation of the application, you must reload the data.

### Run application for development

- `gulp serve`

    Runs the application using gulp. As you make changes to the code, the application will restart to reflect the changes immediately.

- `node-debug --web-port 9090 server/server.js`

   Launch the application in debug mode.

- `gulp serve --debug` (TODO: fix this - it is not working)

    Launch debugger with node-inspector.

- `gulp serve --debug-brk` (TODO: fix this - it is not working)

    Launch debugger and break on 1st line with node-inspector.

### Run application in production mode

- `npm start`

or Use `forever` to automatically restart the application in case of a failure:

- `forever start server/server.js`
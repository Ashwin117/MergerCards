# MergerCards

This is a pure back-end only API that allows getting json documents from the database and combining it to show off results.

###Getting Started###

Here are the commands to start this app after cloning this project. Please use node 4 as the project is littered with ES6.

First, run a local instance of MongoDB in another terminal

```
	> mongod
```

In the project terminal, then run the following:

```
	> npm install
	> npm start
```

This project seeds data into the database when the user visits `localhost:8080` after `npm start`. The seeded data contains a randomly generated set of cards to a given deck and a randomly generated set of decks for a given user.

This app uses MongoDB. Mongo automatically labels its data (depending on the schema used) with an `_id` property. However, I've instead made use of our own `id` property to better manage this app. This app supports the following APIs

* GET /
To view seeded json data into database

* GET /users/{username}/decks
To view all the decks associated with this username under one document
```json
{
	"_id": "57b98a919295d0f77b93ecfc",
	"userName": "test@example",
    "decks": [
        {
            "desc": "deck1",
            "id": "1"
        },
        {
            "desc": "deck2",
            "id": "5"
        }
    ],
    "nextPageToken": 2,
    "resultSizeEstimate": 2
}
```

* GET /decks/{id}
To view all cards of a deck given the id
```json
{
    "cards": [
        {
        	"title": "card1",
        	"_id": "57b98a919295d0f77b93ecfb",
            "payload": {
                "data": "data1"
            }
        },
        {
	        "title": "card2",
	        "_id": "57b98a919295d0f77b93ecfb",
            "payload": {
                "data": "data2"
            }
        }
    ],
    "desc": "deck1",
    "id": "1",
    "_id": "57b98a919295d0f77b93ecf3"
}
```

* GET /users/{username}/combinedecks
To view all the decks and the corresponding cards associated with this username. This is a merge of the former 2 APIs.
```json
{
	"_id": "57b98a919295d0f77b93ecfc",
	"userName": "test@example",
    "decks": [
        {
            "desc": "deck1",
            "id": "1",
            "_id": "57b98a919295d0f77b93ecf3",
            "cards": [
                {
                	"title": "card1",
                	"_id": "57b98a919295d0f77b93ecfb",
                    "payload": {
                        "data": "data1"
                    }
                },
                {
        	        "title": "card2",
        	        "_id": "57b98a919295d0f77b93ecfb",
                    "payload": {
                        "data": "data2"
                    }
                }
            ]
        },
        {
            "desc": "deck2",
            "id": "5"
        }
    ],
    "nextPageToken": 2,
    "resultSizeEstimate": 2
}
```
The `nextPageToken` is critical in solving many potential timeout, large response timing, and performance related problems. 

* GET /users/{username}/decks?nextpagetoken=7:
For any given query, at the most, the number of pages (as specified by the constant `PAGE_LIMIT`)
is 5. So, we are viewing [7-5, 5] decks (skipping 2 elements and getting the next 5) at a given moment.

* GET /users/{username}/combinedecks?nextpagetoken=7:
For any given query, at the most, the number of pages (as specified by the constant `PAGE_LIMIT`) is 5. So, these 5 decks are queried to see if they have any cards associated with them. If yes, then they are combined into the result and displayed. 5 queries is not heavy for the server.

###Tests###
This project has some unit tests. The files that have been tested has 100% code coverage. You can run these commands to check it out:
```
    > npm test
    > npm run coverage
```
However, ideally, every dev file should have a corresponding unit test file. Unfortunately, time does not permit this.

###Cool features of this app###
1. Uses `mongodb` as the database for storage and `mongoose` to communicate with it.
1. Uses ES6 for writing code as smoothly as possible.
1. Uses Promises everywhere! The controllers file is so beautiful and easy to understand
1. Uses `sinon`, `rewire`, and `mocha` for unit testing along with `istanbul` for looking at code coverage.
# semester_project
Welcome to Roti Valay. please read details carefully before running project
IMAGES OF INTERFACE ARE ALSO ATTACHED
======================
commands for server side:
npm install i
node app.js
======================
npm install i
npm start
======================


====================================================================================================================================
it is important to create user in mongo db compass with following attributes to login menu. otherwise user cannot login in to the menu

{
    "_id": {
        "$oid": "5fe4caa05cbeb79b3c1465f1"
    },
    "role": "admin",
    "username": "admin",
    "password": "$2a$10$rh2ohoGZtDQ/KF8oA0JzvehsF1Z8aF34l5zot1pFAaibd7HRcIwdm",
    "__v": 0
}
(An image is attached for better understanding)
=====================================================================================================
It is important to add hardcode details of one item in the mongo db compass with following attributes

{
    "_id": {
        "$oid": "60031ef19bb7535e389f1663"
    },
    "name": "burger",
    "image": "/assets/images/burger.jpg",
    "catagory": "main",
    "label": "Hot",
    "price": "2000",
    "featured": true,
    "description": "Toasted Bun with atomic sauce, cheese and deep fried chicken patty"
}
(An image is also attached for better understanding)


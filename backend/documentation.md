# USER
## POST /api/users (Public) - Register user
body properties
{
  firstName: String (required)
  lastName: String (required)
  login: String (required)
  email: String (required)
  password: String (required)
  isAdmin: Boolean (required, default - false)
  enabled: Boolean (required, default - false)
  birthdate: String (optional)
  gender: String (optional)
  avatarUrl: String (optional)
}

response example
{
    "isAdmin": false,
    "enabled": true,
    "awards": [],
    "_id": "669f97135255256f440c795f",
    "firstName": "User",
    "lastName": "Newone",
    "login": "User",
    "email": "user@gmail.com",
    "password": "$2a$10$9bS4SRkh5NHgClX.2eCoo.iHHY7dO0w639i9S0eDt3Lxim7WiKPi2",
    "gender": "male",
    "avatarUrl": "img/user/023648.png",
    "date": "2024-07-23T11:42:11.309Z",
}

## POST /api/users/login (Public) - Login user
body properties
{
  loginOrEmail: String (required)
  password: String (required)
}

response example
{
    "success": true,
    "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OWQ0NDFmNTZlOTcxMjk2NDVmYjBhYyIsImZpcnN0TmFtZSI6IlVzZXIiLCJsYXN0TmFtZSI6Ik5ld29uZSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3MjE3MzUyMjIsImV4cCI6MTcyMTc3MTIyMn0.hEr0DyuHOkEZsgoutEzUCJ5S5gk2Ltol3rJrl9FFFjs"
}

## PUT /api/users (Private) - Update user
body properties
{
  firstName: String (optional)
  lastName: String (optional)
  login: String (optional)
  email: String (optional)
  isAdmin: Boolean (optional)
  enabled: Boolean (optional)
  birthdate: String (optional)
  gender: String (optional)
  avatarUrl: String (optional)
}

response example
{
    "isAdmin": false,
    "enabled": true,
    "awards": [],
    "_id": "669f97135255256f440c795f",
    "firstName": "User",
    "lastName": "Newone",
    "login": "User",
    "email": "user@gmail.com",
    "password": "$2a$10$9bS4SRkh5NHgClX.2eCoo.iHHY7dO0w639i9S0eDt3Lxim7WiKPi2",
    "gender": "male",
    "avatarUrl": "img/user/023648.png",
    "date": "2024-07-23T11:42:11.309Z",
}

## POST /api/users/update-password (Private) - Update user password
body properties
{
  password: String (required)
  newPassword: String (required)
}

response example
{
    "message": "Password successfully changed",
    "user": {
        "isAdmin": false,
        "enabled": true,
        "awards": [
            "669d410380ffef5b48a19cb2"
        ],
        "_id": "669d441f56e97129645fb0ac",
        "firstName": "Admin",
        "lastName": "Newone",
        "login": "User2",
        "email": "user2@gmail.com",
        "password": "$2a$10$m.CiTfj7.VLOJWKudf86z.OYaCg.P7pS56kUCLBeDNZB2RldlV6iK",
        "gender": "male",
        "avatarUrl": "img/user/023648.png",
        "date": "2024-07-21T17:23:43.027Z",
    }
}

## GET /api/users/:id (Public) - Get existing user with awards
response example
{
    "isAdmin": false,
    "enabled": true,
    "awards": [
        {
            "_id": "669d410380ffef5b48a19cb2",
            "content": "super award 1",
            "imageUrls": "img/test/001.png",
            "date": "2024-07-21T17:10:27.924Z",
        }
    ],
    "_id": "669d441f56e97129645fb0ac",
    "firstName": "Admin",
    "lastName": "Newone",
    "email": "user2@gmail.com",
    "gender": "male",
    "avatarUrl": "img/user/023648.png",
    "date": "2024-07-21T17:23:43.027Z",
}

## PUT /api/users/awards/:awardId (Private) - Add award to user
response example
{
    "isAdmin": false,
    "enabled": true,
    "awards": [
        {
            "_id": "669d410380ffef5b48a19cb2",
            "content": "super award 1",
            "imageUrls": "img/test/001.png",
            "date": "2024-07-21T17:10:27.924Z",
        },
        {
            "_id": "669d411480ffef5b48a19cb5",
            "content": "super award 2",
            "imageUrls": "img/test/002.png",
            "date": "2024-07-21T17:10:44.376Z",
        }
    ],
    "_id": "669d441f56e97129645fb0ac",
    "firstName": "Admin",
    "lastName": "Newone",
    "login": "User2",
    "email": "user2@gmail.com",
    "password": "$2a$10$m.CiTfj7.VLOJWKudf86z.OYaCg.P7pS56kUCLBeDNZB2RldlV6iK",
    "gender": "male",
    "avatarUrl": "img/user/023648.png",
    "date": "2024-07-21T17:23:43.027Z",
}

## DELETE /api/users/awards/:awardId (Private) - Delete award from user
response example
{
    "isAdmin": false,
    "enabled": true,
    "awards": [
        {
            "_id": "669d410380ffef5b48a19cb2",
            "content": "super award 1",
            "imageUrls": "img/test/001.png",
            "date": "2024-07-21T17:10:27.924Z",
        },
    ],
    "_id": "669d441f56e97129645fb0ac",
    "firstName": "Admin",
    "lastName": "Newone",
    "login": "User2",
    "email": "user2@gmail.com",
    "password": "$2a$10$m.CiTfj7.VLOJWKudf86z.OYaCg.P7pS56kUCLBeDNZB2RldlV6iK",
    "gender": "male",
    "avatarUrl": "img/user/023648.png",
    "date": "2024-07-21T17:23:43.027Z",
}

# AWARD
## POST /api/awards (Private, admin) - Create new award
body properties
{
  content: String (required)
  imageUrl: String (optional)
}

response example
{
    "_id": "66a1027b13638154607891eb",
    "content": "super award 3",
    "imageUrls": "img/test/003.png",
    "date": "2024-07-24T13:32:43.808Z",
}

## PUT /api/awards/:id (Private, admin) - Update existing award
body properties
{
  content: String (optional)
  imageUrl: String (optional)
}

response example
{
    "_id": "66a1027b13638154607891eb",
    "content": "super award 3",
    "imageUrls": "img/test/003.png",
    "date": "2024-07-24T13:32:43.808Z",
}

## DELETE /api/awards/:id (Private, admin) - Delete existing award
response example
{
    "message": "Award is successfully deleted from DB."
}

## GET /api/awards (Public) - GET existing awards
response example
[
    {
        "_id": "669d410380ffef5b48a19cb2",
        "content": "super award 10",
        "imageUrls": "img/test/001.png",
        "date": "2024-07-21T17:10:27.924Z",
    },
    {
        "_id": "669d411480ffef5b48a19cb5",
        "content": "super award 2",
        "imageUrls": "img/test/002.png",
        "date": "2024-07-21T17:10:44.376Z",
    }
]

## GET /api/awards/:id (Public) - GET existing award by id
response example
{
    "_id": "66a1027b13638154607891eb",
    "content": "super award 3",
    "imageUrls": "img/test/003.png",
    "date": "2024-07-24T13:32:43.808Z",
}

# POST
## POST api/posts (Private) - Create new post
body properties
{
  content: String (required)
  imageUrls: Array(String) (optional)
  enabled: Boolean (required, default - true)
  likes: Number (optional)
}

response example
{
    "imageUrls": [
        "img/test/001.png"
    ],
    "enabled": true,
    "_id": "66a106cd13638154607891fb",
    "content": "test content",
    "user": {
        "_id": "66904bae6f02332558695ccc",
        "firstName": "Noadmin",
        "lastName": "Newone",
        "email": "user@gmail.com",
        "avatarUrl": "img/user/023648.png"
    },
    "date": "2024-07-24T13:51:09.919Z",
}

## PUT api/posts/:id (Private) - Update existing post
body properties
{
  content: String (optional)
  imageUrls: Array(String) (optional)
  enabled: Boolean (optional, default - true)
  likes: Number (optional)

}

response example
{
    "imageUrls": [
        "img/test/001.png"
    ],
    "enabled": true,
    "_id": "66a106cd13638154607891fb",
    "content": "test content",
    "user": {
        "_id": "66904bae6f02332558695ccc",
        "firstName": "Noadmin",
        "lastName": "Newone",
        "email": "user@gmail.com",
        "avatarUrl": "img/user/023648.png"
    },
    "date": "2024-07-24T13:51:09.919Z",
}

## DELETE api/posts/:id (Private) - Delete existing post
response example
{
    "message": "Post is successfully deleted from DB."
}

## GET /api/posts (Public) - GET appropriate filtered posts
response example
{
    "posts": [
        {
            "imageUrls": [
                "img/test/001.png"
            ],
            "enabled": true,
            "_id": "6692ab3118d947308871deef",
            "content": "dfkjviwevpui oeihrg uherghqg hrghqerghpqripg hqgkjqrgkqhpkgrhq qirgiqugp",
            "user": "66904bae6f02332558695ccc",
            "date": "2024-07-13T16:28:33.761Z",
            "likes": 12,
        },
        {
            "imageUrls": [
                "img/test/001.png"
            ],
            "enabled": true,
            "_id": "669d4bbc4442fb2e545088d1",
            "content": "test content",
            "user": "669d441f56e97129645fb0ac",
            "date": "2024-07-21T17:56:12.354Z",
         },
    ],
    "postsQuantity": 2
}


## GET /api/posts/:id (Public) - GET existing post by id
response example
{
    "imageUrls": [
        "img/test/001.png"
    ],
    "enabled": true,
    "_id": "669d4bbc4442fb2e545088d1",
    "content": "test content",
    "user": {
        "_id": "669d441f56e97129645fb0ac",
        "firstName": "Admin",
        "lastName": "Newone",
        "email": "user2@gmail.com",
        "avatarUrl": "img/user/023648.png"
    },
    "date": "2024-07-21T17:56:12.354Z",
}

# COMMENT
## POST api/comments (Private) - Create new comment
body properties
{
  post: ObjectId (required)
  content: String (required)
  likes: Number (optional)
}

response example
{
    "_id": "66a4f530a936b20ef44ea369",
    "post": "6692ab3118d947308871deef",
    "content": "test content",
    "user": {
        "_id": "66904bae6f02332558695ccc",
        "firstName": "Noadmin",
        "lastName": "Newone",
        "email": "user@gmail.com",
        "avatarUrl": "img/user/023648.png"
    },
    "date": "2024-07-27T13:25:04.198Z",
}


## PUT api/comments/:id (Private) - Update existing comment
body properties
{
  content: String (optional)
  likes: Number (optional)
}

response example
{
    "_id": "66a4f530a936b20ef44ea369",
    "post": "6692ab3118d947308871deef",
    "content": "test content",
    "user": {
        "_id": "66904bae6f02332558695ccc",
        "firstName": "Noadmin",
        "lastName": "Newone",
        "email": "user@gmail.com",
        "avatarUrl": "img/user/023648.png"
    },
    "date": "2024-07-27T13:25:04.198Z",
}

## DELETE api/comments/:id (Private) - Delete existing comment
response example
{
    "message": "Comment is successfully deleted from DB."
}

## GET api/comments (Public) - GET all existing comments
response example
[
    {
        "_id": "6692b695f58ea62f007fbe13",
        "post": "6692ab3118d947308871deef",
        "content": "test content",
        "user": {
            "_id": "66904bae6f02332558695ccc",
            "firstName": "Noadmin",
            "lastName": "Newone",
            "email": "user@gmail.com",
            "avatarUrl": "img/user/023648.png"
        },
        "date": "2024-07-13T17:17:09.223Z",
    },
    {
        "_id": "6692b90d7eb28e1e509d75b5",
        "post": "6692ab3118d947308871deef",
        "content": "test content",
        "user": {
            "_id": "66904bae6f02332558695ccc",
            "firstName": "Noadmin",
            "lastName": "Newone",
            "email": "user@gmail.com",
            "avatarUrl": "img/user/023648.png"
        },
        "date": "2024-07-13T17:27:41.142Z",
    },
]

## GET api/comments/user/:userId (Public) - GET existing comments of particular user
response example
[
    {
        "_id": "6692b695f58ea62f007fbe13",
        "post": "6692ab3118d947308871deef",
        "content": "test content",
        "user": {
            "_id": "66904bae6f02332558695ccc",
            "firstName": "Noadmin",
            "lastName": "Newone",
            "email": "user@gmail.com",
            "avatarUrl": "img/user/023648.png"
        },
        "date": "2024-07-13T17:17:09.223Z",
    },
    {
        "_id": "6692b90d7eb28e1e509d75b5",
        "post": "6692ab3118d947308871deef",
        "content": "test content",
        "user": {
            "_id": "66904bae6f02332558695ccc",
            "firstName": "Noadmin",
            "lastName": "Newone",
            "email": "user@gmail.com",
            "avatarUrl": "img/user/023648.png"
        },
        "date": "2024-07-13T17:27:41.142Z",
    },
]

## GET api/comments/post/:postId (Public) - GET existing comments of particular post
response example
[
    {
        "_id": "6692b695f58ea62f007fbe13",
        "post": "6692ab3118d947308871deef",
        "content": "test content",
        "user": {
            "_id": "66904bae6f02332558695ccc",
            "firstName": "Noadmin",
            "lastName": "Newone",
            "email": "user@gmail.com",
            "avatarUrl": "img/user/023648.png"
        },
        "date": "2024-07-13T17:17:09.223Z",
    },
    {
        "_id": "6692b90d7eb28e1e509d75b5",
        "post": "6692ab3118d947308871deef",
        "content": "test content",
        "user": {
            "_id": "66904bae6f02332558695ccc",
            "firstName": "Noadmin",
            "lastName": "Newone",
            "email": "user@gmail.com",
            "avatarUrl": "img/user/023648.png"
        },
        "date": "2024-07-13T17:27:41.142Z",
    },
]

Instructions: 

# Clone this repository
Git clone https://github.com/xenogenesis20/cautious-spoon.git
CD into the directory and use $ code .  to open VScode or open it in your preferred editor. 

This is how I clone the repos to my system using Git Bash. 
$ pwd    // shows your current directory. 
Example output: /c/Users/xenog

$ cd Desktop/     //switch directory to where you want to clone the repo
```
$ Git clone https://github.com/xenogenesis20/cautious-spoon.git 
```
Example Output: 
Cloning into 'cautious-spoon'...
remote: Enumerating objects: 10, done.
remote: Counting objects: 100% (10/10), done.
remote: Compressing objects: 100% (8/8), done.
remote: Total 10 (delta 0), reused 10 (delta 0), pack-reused 0
Receiving objects: 100% (10/10), 31.08 KiB | 1.24 MiB/s, done.


$ cd cautious-spoon/    // switch to the newly cloned repo directory

$ code .    // opens the folder in VScode. 


# You need to make a `.env` file in the root directory with the following variables:
```
Api
PORT=8080

Database
DB_USER=
DB_USER_PASSWORD=
DB_CONN_STRING=
DB_NAME=
```


# Install dependencies using
```
$ npm install
```
# Start the server using 
```
$ npm start
```
# Endpoints: 
PostMan collection schema can be imported using this file:
https://drive.google.com/file/d/1Fk1-JQPOGBEKncUZx_0VpUBLGrLYycMi/view?usp=sharing

# GET all users
```
http://localhost:8080/users
```
Returns:
```json
[
    {
        "_id": "617f5d236eb5d3394ae3838b",
        "first_name": "Maikel",
        "last_name": "Martinez",
        "dob": "02/22/1903",
        "points": 0,
        "email": "Ireallylikepizza@test.com",
        "registered": "2021-11-01T03:21:07.863Z"
    },
    {
        "_id": "6180250242f9a9e440d54fca",
        "first_name": "Chester",
        "last_name": "Tester",
        "dob": "01/01/1903",
        "points": 5631,
        "email": "chestertesting@test.com",
        "registered": "2021-11-01T17:33:54.522Z"
    }
]
```
# GET one user by _id
```
http://localhost:8080/users/<_id>
```
Returns:
```json
{
    "_id": "617f5d236eb5d3394ae3838b",
    "first_name": "Maikel",
    "last_name": "Martinez",
    "dob": "02/22/1903",
    "points": 0,
    "email": "Ireallylikepizza@test.com",
    "registered": "2021-11-01T03:21:07.863Z"
}
```

# POST a new user
```
http://localhost:8080/users
```
expected Body:
```json
{
    "first_name": "Maikel",
    "last_name": "Martinez",
    "dob": "02/22/1903",
    "email": "Ireallylikepizza@test.com"
}
```
Returns:
```json
{
    "_id": "617f5d236eb5d3394ae3838b",
    "first_name": "Maikel",
    "last_name": "Martinez",
    "dob": "02/22/1903",
    "points": 0,
    "email": "Ireallylikepizza@test.com",
    "registered": "2021-11-01T03:21:07.863Z"
}
```
# POST transaction record and add points to a user
The payer is generated randomly for this project.
```
http://localhost:8080/transactions/<_id>
```
```json
{
    "payer": "Amazon",
    "points": 82,
    "timeStamp": "2021-11-02T00:08:39.165Z",
    "userId": "617f5d236eb5d3394ae3838b",
    "_id": "618081872e6f0e3cf6018eaf"
}
```
# GET all transactions for a user
```
http://localhost:8080/transactions/<_id>
```
Returns:
```json
[
    {
        "_id": "618094df93bf2a64178a21cc",
        "payer": "Apple",
        "points": 3387,
        "timeStamp": "2021-11-02T01:31:10.971Z",
        "userId": "617f5d236eb5d3394ae3838b"
    },
    {
        "_id": "618094e093bf2a64178a21cd",
        "payer": "Sony",
        "points": 9679,
        "timeStamp": "2021-11-02T01:31:12.005Z",
        "userId": "617f5d236eb5d3394ae3838b"
    }
]
```

# GET points balance for user payers
```
http://localhost:8080/transactions/<_id>/balance
```
Returns:
```json
{
    "Apple": 3387,
    "Sony": 9679
}
```

# PUT spend points
```
http://localhost:8080/transactions/spend/<_id>
```
Expected body(points to spend): 
```json
{
    "points": 2500
}
```
Returns:
```json
[
    {
        "payer": "Apple",
        "points": "-806"
    },
    {
        "payer": "Sony",
        "points": "-1694"
    }
]
```

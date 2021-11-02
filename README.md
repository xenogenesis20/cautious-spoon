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


# You need to make a `.env` file in the root directory with the following information:
```
Api
PORT=8080

Database
DB_USER=test
DB_USER_PASSWORD=root
DB_CONN_STRING=mongodb+srv://test:root@cluster0.zcgbm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
DB_NAME=fetchtest
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
# GET one user by _id
```
http://localhost:8080/users/<_id>
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
returns:
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
```
http://localhost:8080/transactions/<_id>
```
The payer is generated randomly for this project.

# GET all transactions for a user
```
http://localhost:8080/transactions/<_id>
```
Returns an array of all transactions.

# GET points balance for user payers
```
http://localhost:8080/transactions/<_id>/balance
```
Returns the points balance of each payer for the user.

# PUT spend points
```
http://localhost:8080/transactions/spend/<_id>
```
Expected body: 
```json
{
    "points": integer
}
```

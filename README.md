Instructions: 

# Clone this repository
Git clone https://github.com/xenogenesis20/cautious-spoon.git
CD into the directory and use $ code .  to open VScode or open it in your preferred editor. 

This is how I cloned the repo to my system using Git Bash. 
$ pwd    // shows your current directory. 
Example output: /c/Users/xenog

$ cd Desktop/     //switch directory to where you want to clone the repo

$ Git clone https://github.com/xenogenesis20/cautious-spoon.git  //clone the repo

Example Output: 
Cloning into 'cautious-spoon'...
remote: Enumerating objects: 10, done.
remote: Counting objects: 100% (10/10), done.
remote: Compressing objects: 100% (8/8), done.
remote: Total 10 (delta 0), reused 10 (delta 0), pack-reused 0
Receiving objects: 100% (10/10), 31.08 KiB | 1.24 MiB/s, done.


$ cd cautious-spoon/    // switch to the newly cloned repo directory

$ code .    // opens the folder in VScode. 


# You need to make a .env file with the following information:

Api
PORT=8080

Database
DB_USER=test
DB_USER_PASSWORD=root
DB_CONN_STRING=mongodb+srv://test:root@cluster0.zcgbm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
DB_NAME=fetchtest
------------------------


# Install dependencies using $ npm install

# Start the server using $ npm start

You can use these to make requests:

# Get all users
http://localhost:8080/users

# Get one user by _id
http://localhost:8080/users/<_id>









# AulaCube_Technologies_Pvt._Ltd

## To run the program you need to download or clone the git repository to your system
After downloading open the main folder which contains backend folder, frontend folder and other images in VS Code and then open terminal and split the terminal in two parts and then run the command to change the directories

### cd frontend
##### -> npm install
##### -> npm start


### cd backend
##### -> npm install
##### -> node index.js or nodemon


## Functionalities 
##### 1. Add new Task
##### 2. Read the task
##### 3. Edit the task
##### 4. Delete the task
##### 5. Mark task as completed
##### 6. Ranking of tasks According to priority
##### 7. Pagination
##### 8. Also added the functionality to crop the text in the homepage so that the table doesn't distorted

## Modal
Used only single model to store the tasks having the fields id, title, description, priority, completed. In whole project all the operations are done on this model directly. As the data base is directly created in the backend folder hence, their is no need to use useContext because all the data is saved directly to the database and directly fetchs from it

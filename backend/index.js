const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();
const PORT = 5001;
const db = new sqlite3.Database('database.sqlite');

app.use(bodyParser.json());
app.use(cors())

db.run(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    priority INTEGER,
    completed BOOLEAN DEFAULT 0
  )
`);

// Define API endpoints

app.get('/api/tasks', (req, res) => {
    db.all('SELECT * FROM tasks ORDER BY priority ASC', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});


// API to add a new task
app.post('/api/tasks', (req, res) => {
    const { title, description, priority } = req.body;
    const completed = false; // Default to incomplete
    // console.log(title, description, priority, completed)
    if (!priority) {
        return res.json({ msg: "Please enter Priority first", msg_type: "error" })
    }
    else if (!description) {
        return res.json({ msg: 'Please enter Description first', msg_type: "error" })
    }
    else if (!title) {
        return res.json({ msg: 'Please enter Title first', msg_type: "error" })
    }
    else {
        db.run('INSERT INTO tasks (title, description, priority, completed) VALUES (?, ?, ?, ?)', [title, description, priority, completed], function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ id: this.lastID, title, description, priority, completed });
        });
    }
});

// API to Read a task
app.get('/api/read-task/:taskid', (req, res) => {
    const taskId = req.params.taskid;
    // console.log(taskId)
    db.all('SELECT * FROM tasks WHERE id = ?', [taskId], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(result);
    });
});
// API to edit a task
app.put('/api/tasks/:taskid', (req, res) => {
    const { title, description, priority } = req.body.values;
    const taskId = req.params.taskid; // Use req.params.taskid to match the route parameter
    const completed = req.body.completed;
    // console.log(title, description, priority, completed, taskId);

    if (!priority) {
        return res.json({ msg: "Please select the task Priority...", msg_type: "error" });
    }

    db.run('UPDATE tasks SET title = ?, description = ?, priority = ?, completed = ? WHERE id = ?', [title, description, priority, completed, taskId], (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        } else {
            // console.log("Call reached");
            res.json({ message: 'Task updated successfully' });
        }
    });
});


// API to delete a task
app.delete('/api/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    db.run('DELETE FROM tasks WHERE id = ?', [taskId], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Task deleted successfully' });
    });
});

// API to mark a task as completed updating the completion of task on click
app.patch('/api/tasks/:id/complete', (req, res) => {
    const taskId = req.params.id;
    // console.log(taskId)
    db.run('UPDATE tasks SET completed = true WHERE id = ?', [taskId], (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Task marked as completed' });
    });
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

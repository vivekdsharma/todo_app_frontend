const API_BASE_URL = "https://todo-app-backend-rcu5.onrender.com"; // Backend API URL

// ✅ Check if user is logged in
document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "index.html"; // Redirect to login page
    } else {
        fetchTasks(); // Fetch tasks when logged in
    }
});

// ✅ Fetch tasks from backend
async function fetchTasks() {
    const token = localStorage.getItem("token");

    try {
        const res = await fetch(`${API_BASE_URL}/tasks`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        const tasks = await res.json();
        console.log("Fetched Tasks:", tasks);
        displayTasks(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
    }
}

// ✅ Display tasks in HTML
function displayTasks(tasks) {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">${task.title}</span>
            <button onclick="toggleTask('${task._id}')">${task.completed ? 'Undo' : 'Complete'}</button>
            <button onclick="deleteTask('${task._id}')">Delete</button>
        `;
        taskList.appendChild(taskItem);
    });
}

// ✅ Add new task
async function addTask() {
    const title = document.getElementById("task-input").value;
    const token = localStorage.getItem("token");

    if (!title) {
        alert("Task title is required!");
        return;
    }

    try {
        const res = await fetch(`${API_BASE_URL}/tasks`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title })
        });

        const newTask = await res.json();
        console.log("New Task Added:", newTask);
        fetchTasks(); // Refresh task list
        document.getElementById("task-input").value = ""; // Clear input
    } catch (error) {
        console.error("Error adding task:", error);
    }
}

// ✅ Toggle task completion
async function toggleTask(taskId) {
    const token = localStorage.getItem("token");

    try {
        const res = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        const updatedTask = await res.json();
        console.log("Task Updated:", updatedTask);
        fetchTasks(); // Refresh task list
    } catch (error) {
        console.error("Error updating task:", error);
    }
}

// ✅ Delete task
async function deleteTask(taskId) {
    const token = localStorage.getItem("token");

    try {
        const res = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log("Task Deleted:", data);
        fetchTasks(); // Refresh task list
    } catch (error) {
        console.error("Error deleting task:", error);
    }
}

// ✅ Logout user
function logout() {
    localStorage.removeItem("token");
    window.location.href = "index.html"; // Redirect to login page
}

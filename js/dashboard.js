const API_BASE_URL = "https://todo-app-backend-rcu5.onrender.com"; // Backend API URL

// ✅ Fetch tasks from backend (Updated API path)
async function fetchTasks() {
    const token = localStorage.getItem("token");

    try {
        const res = await fetch(`${API_BASE_URL}/api/tasks`, { // 🔹 Updated path
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

// ✅ Add new task (Updated API path)
async function addTask() {
    const title = document.getElementById("task-input").value;
    const token = localStorage.getItem("token");

    if (!title) {
        alert("Task title is required!");
        return;
    }

    try {
        const res = await fetch(`${API_BASE_URL}/api/tasks`, { // 🔹 Updated path
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

// ✅ Toggle task completion (Updated API path)
async function toggleTask(taskId) {
    const token = localStorage.getItem("token");

    try {
        const res = await fetch(`${API_BASE_URL}/api/tasks/${taskId}`, { // 🔹 Updated path
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

// ✅ Delete task (Updated API path)
async function deleteTask(taskId) {
    const token = localStorage.getItem("token");

    try {
        const res = await fetch(`${API_BASE_URL}/api/tasks/${taskId}`, { // 🔹 Updated path
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

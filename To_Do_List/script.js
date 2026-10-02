const taskInput = document.getElementById("textInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

addBtn.addEventListener("click", function() {
    const task = taskInput.value;
    if (task === "") return;
    tasks.push({ id: Date.now(),
        task: task
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskInput.value = "";
    renderTasks();
});

function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach(function(task) {
        const taskElement = document.createElement("div");

        taskElement.innerHTML = `
            <div class="flex justify-between items-center border p-3 rounded-lg">
                <span>${task.task}</span>
                <div>
                    <button onclick="deleteTask(${task.id})" class="bg-red-500 text-white px-3 py-1 rounded-lg">
                        Delete
                    </button>
                </div>
            </div>
        `;
        taskList.appendChild(taskElement);
    });
}

function deleteTask(id) {
    tasks = tasks.filter(function(task) {
        return task.id !== id;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

renderTasks();
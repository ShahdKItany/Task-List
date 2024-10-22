// تعريف متغير عالمي لاحتفاظ النص
let taskTextNode;

// احضار العناصر من HTML
const taskInput = document.getElementById("taskInput");
const taskList = document.querySelector(".taskList");
const addTaskButton = document.getElementById("addTaskButton");

// استرجاع المهام من localStorage
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// تحميل المهام المخزنة عند تحميل الصفحة
tasks.forEach(task => {
    addTaskToDOM(task.text, task.completed);
});

// إضافة وظيفة لزر الإضافة
addTaskButton.addEventListener('click', addTask);

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    addTaskToDOM(taskText, false);
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));

    taskInput.value = ""; // مسح حقل الإدخال
}

function addTaskToDOM(taskText, completed) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const checkbox = document.createElement("input");

    checkbox.type = "checkbox";
    checkbox.checked = completed;
    taskTextNode = document.createTextNode(taskText);
    span.appendChild(taskTextNode);
    span.appendChild(checkbox);
    li.appendChild(span);
    taskList.appendChild(li);

    if (completed) {
        span.classList.add("strikethrough");
    }

    // إضافة مستمع حدث لعلامة الصح
    checkbox.addEventListener('change', function() {
        if (checkbox.checked) {
            span.classList.add("strikethrough");
            updateTaskStatus(taskText, true);
        } else {
            span.classList.remove("strikethrough");
            updateTaskStatus(taskText, false);
        }
    });
}

function updateTaskStatus(taskText, completed) {
    const task = tasks.find(t => t.text === taskText);
    if (task) {
        task.completed = completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

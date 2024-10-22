// تعريف taskTextNode كمتغير عالمي
let taskTextNode;

// احضار العناصر من HTML
const taskInput = document.getElementById("taskInput");
const taskList = document.querySelector(".taskList");
const addTaskButton = document.getElementById("addTaskButton");

// استرجاع المهام من localStorage عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', loadTasks);

// إضافة وظيفة لزر الإضافة
addTaskButton.addEventListener('click', addTask);

function addTask() {
    // جلب قيمة النص المدخل
    const taskText = taskInput.value.trim();

    // التحقق من أن النص ليس فارغًا
    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    // إنشاء عنصر جديد للقائمة
    const li = document.createElement("li");

    // إنشاء عنصر span للنص وعلامة الصح
    const span = document.createElement("span");

    // إنشاء علامة صح
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    // إنشاء عنصر نص مع النص المدخل وإضافته إلى ال span
    taskTextNode = document.createTextNode(taskText); // تعيين taskTextNode هنا
    span.appendChild(taskTextNode);

    // إضافة علامة الصح إلى ال span
    span.appendChild(checkbox);

    // إضافة ال span إلى عنصر القائمة
    li.appendChild(span);

    // إضافة عنصر القائمة إلى قائمة المهام
    taskList.appendChild(li);

    // مسح حقل الإدخال
    taskInput.value = "";

    // حفظ المهام في localStorage
    saveTasks();

    // إضافة مستمع حدث لعلامة الصح
    checkbox.addEventListener('change', function() {
        if (checkbox.checked) {
            // إذا تم تحديد علامة الصح، قم بإضافة الفئة .strikethrough لتطبيق خط الشطب على النص
            if (taskTextNode) {
                taskTextNode.parentElement.classList.add("strikethrough");
            }
        } else {
            // إزالة الفئة .strikethrough إذا تم إلغاء تحديد علامة الصح
            if (taskTextNode) {
                taskTextNode.parentElement.classList.remove("strikethrough");
            }
        }

        // حفظ المهام في localStorage بعد كل تغيير
        saveTasks();
    });
}

// حفظ المهام في localStorage
function saveTasks() {
    const tasks = [];
    const taskItems = document.querySelectorAll('.taskList li');
    
    taskItems.forEach(item => {
        const text = item.querySelector('span').childNodes[0].nodeValue;
        const isChecked = item.querySelector('input[type="checkbox"]').checked;
        tasks.push({ text, isChecked });
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// تحميل المهام من localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    tasks.forEach(task => {
        // إنشاء عنصر جديد للقائمة
        const li = document.createElement("li");

        // إنشاء عنصر span للنص وعلامة الصح
        const span = document.createElement("span");

        // إنشاء علامة صح
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.isChecked; // تعيين حالة علامة الصح

        // إنشاء عنصر نص مع النص المدخل وإضافته إلى ال span
        taskTextNode = document.createTextNode(task.text);
        span.appendChild(taskTextNode);
        span.appendChild(checkbox);
        li.appendChild(span);
        taskList.appendChild(li);

        // إضافة فئة .strikethrough إذا كانت المهمة مكتملة
        if (task.isChecked) {
            span.classList.add("strikethrough");
        }

        // إضافة مستمع حدث لعلامة الصح
        checkbox.addEventListener('change', function() {
            if (checkbox.checked) {
                span.classList.add("strikethrough");
            } else {
                span.classList.remove("strikethrough");
            }

            // حفظ المهام في localStorage بعد كل تغيير
            saveTasks();
        });
    });
}

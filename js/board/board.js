let tasks = [
    {
        categoryBoard: 'toDo',
        assignedTo: [
            'Florian',
            'Roman'
        ],
        category: "User Story",
        description: 'Die Milch nicht vergessen!',
        dueDate: '2024-02-08',
        prio: 'medium',
        subtasks: [
            {
                title: 'Brot kaufen',
                check: false
            },
            {
                title: 'Tanken fahren',
                check: false
            }
        ],
        title: 'Einkaufen gehen',
        id: null
    },
    {
        categoryBoard: 'toDo',
        assignedTo: [
            'Kevin',
            'Roman'
        ],
        category: "User Story",
        description: 'Vorher aufwärmen',
        dueDate: '2024-02-10',
        prio: 'medium',
        subtasks: [
            {
                title: 'Creativ vorher nehmen',
                check: false
            },
            {
                title: 'Aufwärmen',
                check: false
            },
            {
              title: 'Protein Shake nachdem training',
              check: false
          }
        ],
        title: 'Pumpen gehen',
        id: null
    }
];

let currentDraggedId;
let currentIndex;

function initBoard() {
    setId();
    renderTasks();
    renderAddTask();
}

function renderTasks() {
    renderCategory();
    filterTasks('toDo');
    filterTasks('inProgress');
    filterTasks('awaitFeedback');
    filterTasks('done');
}

function setId() {
  tasks.forEach((task, index) => {
    task.id = index;
  });
}

function renderCategory() {
    document.getElementById('category_section').innerHTML = generateCategorys();
}

function filterTasks(id) {
    const taskList = tasks.filter(todo => todo.categoryBoard == `${id}`);
    if(taskList.length != 0) {
        renderList(taskList, id);
    }
}

function renderList(list, id) {
    list.forEach((task) => {
        document.getElementById(`${id}`).innerHTML += generateCard(task);
    });
}

function startDragging(id, element) {
    currentDraggedId = id;
    element.classList.add('drag_transform');
}

function allowDrop(ev) {
    ev.preventDefault();
}

function highlight(id) {
    document.getElementById(id).classList.add('drag_hover');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag_hover');
}

function moveTo(category) {
    tasks.forEach((task, index) => {
        if(task.id == currentDraggedId) {
            currentIndex = index;
        }
    });
    tasks[currentIndex].categoryBoard = category;
    renderTasks();
}

function showAddTask() {
    document.getElementById('add_task_popup').style.display = 'flex';
}

function closeAddTask() {
    document.getElementById('add_task_popup').style.display = 'none';
}

function renderAddTask() {
  document.getElementById('add_task_popup_content').innerHTML = generateAddTask();
}

function setAddTasksInTasks() {
    setTimeout(() => {
        tasks.push(tasksInAddTask[0]);
        tasksInAddTask = [];
        initBoard();
        initAddTask();
        closeAddTask();
    }, 1250);
}

function renderPopUpCard(taskId) {
    const currentTask = tasks.filter(todo => todo.id == `${taskId}`);
    const currentFormatDate = formatDate(currentTask[0].dueDate);
    const prio = currentTask[0].prio.charAt(0).toUpperCase() + currentTask[0].prio.slice(1);
    document.getElementById('card_popup').style.display = 'flex';
    document.getElementById('card_popup_content').innerHTML = generatePopUpCard(currentTask[0], currentFormatDate, prio);
    renderPrio(currentTask[0].prio);
}

function closePopUpCard() {
    document.getElementById('card_popup').style.display = 'none';
}

function formatDate(date) {
    const dateData = date.split("-");
    return `${dateData[2]}/${dateData[1]}/${dateData[0]}`;
}

function renderPrio(prio) {
  const prioImg = document.getElementById('popup_prio_img');
  const prioContainer = document.getElementById('popup_prio_container');
  if(prio == 'urgent') {
    prioImg.src = "./assets/img/add_task/urgent_white.png";
    prioContainer.classList.add('urgent');
  } else if(prio == 'medium') {
    prioImg.src = "./assets/img/add_task/medium_white.png";
    prioContainer.classList.add('medium');
  } else if(prio == 'low') {
    prioImg.src = "./assets/img/add_task/low_white.png";
    prioContainer.classList.add('low');
  }
}
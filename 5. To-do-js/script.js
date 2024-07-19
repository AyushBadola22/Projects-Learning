const errorMessage = document.getElementById('error-message');
const formContainer = document.getElementById('todo-form');
const showFormButton = document.getElementById('show-task-form');
const cancelButton = document.querySelector('.cancel-btn-form');
const taskTitle = document.querySelector('.todo-input');
const taskDueDate = document.querySelector('.date-input')
const taskDescription = document.querySelector('.task-description')
const addTaskButton = document.querySelector('.add-btn-form');
const taskContainer = document.querySelector('.task-container')
const clearTasksBtn = document.getElementById('clear-all-tasks');


// ! The complete tab has the issue . After toggling the complete in the complete tab it removes all other elements.
/////////////////////////////////////////////////////////

const paginationBtns = document.querySelector('.pagination');
const dropDown = document.querySelector('#dropdown');

let taskPerPage = Number(dropDown.value);
let pageNumber = 1;
let totalTasks = 5;
let totalPage = Math.ceil(totalTasks / taskPerPage)
let activePage = 1;

function updateTaskPerPage() {
    taskPerPage = Number(dropDown.value);
    showElements();
}

const addPaginationEventListeners = () => {
    const pageButtons = document.querySelectorAll('.pg-num');
    console.log(pageButtons);

    pageButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            pageButtons.forEach(btn => btn.classList.remove('active-pg'));
            e.target.classList.add('active-pg');
            pageNumber = parseInt(e.target.textContent);
            showElements();
        });
    });


    const prevButton = document.querySelector('.previous-btn');
    const nextButton = document.querySelector('.next-btn');

    prevButton.addEventListener('click', (e) => {
        if (pageNumber > 1) {
            pageNumber--;
            if (pageNumber <= 1) {
                prevButton.classList.add('disable');
            }
            else {
                prevButton.classList.remove('disable');
            }
        }
        showElements();
    })

    nextButton.addEventListener('click', (e) => {
        if (pageNumber < totalPage) {
            pageNumber++;
            if (pageNumber >= 1) {
                nextButton.classList.add('disable');
            }
            else {
                nextButton.classList.remove('disable');
            }
        }
        showElements();
    })


}


const setPages = (pages, startIndex, endIndex, length) => {
    if (pages == 1) {
        paginationBtns.innerHTML = '';
        return;
    }

    let previousButton = `<li> <a class="page-btns previous-btn ${pageNumber == 1 ? 'disable' : ''}">Previous</a></li>`;


    let buttons = '';
    for (let i = 1; i <= pages; i++) {
        buttons += `<li> <a class="page-btns pg-num ${i == 1 ? "active-pg" : ""}">${i}</a></li>`
    }

    let nextButton = `<li> <a class="page-btns next-btn ${pageNumber == totalPage ? 'disable' : ''}">Next</a></li>`

    paginationBtns.innerHTML = previousButton + buttons + nextButton;
    addPaginationEventListeners();
}


const displayPagination = (tasks) => {
    if (tasks.length == 0) {
        return;
    }
    activePage = 1;
    totalTasks = tasks.length;
    startIndex = (pageNumber - 1) * taskPerPage;
    endIndex = Math.min(startIndex + taskPerPage, tasks.length);
    totalPage = Math.ceil(totalTasks / taskPerPage);
    setPages(totalPage, startIndex, endIndex, tasks.length);
    setTasks(tasks.slice(startIndex, endIndex));
}






/////////////////////////////////////////////////////////




const displayErrorMessage = (message) => {
    errorMessage.innerHTML = message;
    errorMessage.classList.remove('hide');
};

const hideErrorMessage = () => {
    errorMessage.classList.add('hide');
};

// When someone clicks add a task , show a form
showFormButton.addEventListener('click', (event) => {
    formContainer.classList.toggle('hide');
    showFormButton.classList.toggle('hide');
    taskContainer.classList.toggle('hide');
})

// On click cancel , hide the form
cancelButton.addEventListener('click', (event) => {
    formContainer.classList.toggle('hide');
    showFormButton.classList.toggle('hide');
    taskContainer.classList.toggle('hide');
})

// Validate the input and add it in the list
addTaskButton.addEventListener('click', (event) => {
    event.preventDefault();

    const title = taskTitle.value.trim();
    const description = taskDescription.value.trim();
    const dueDate = new Date(taskDueDate.value);

    if (!title || !description || !dueDate) {
        errorMessage.innerHTML = "Fill out all the fields";
        errorMessage.classList.remove('hide');
        return;
    }

    if (dueDate.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)) {
        errorMessage.innerHTML = "You cannot enter the past date as due date";
        errorMessage.classList.remove('hide');
        return;
    }


    const task = {
        title: title,
        description: description,
        createdAt: new Date(),
        dueDate: dueDate,
        completed: false
    }


    let tasks = JSON.parse(localStorage.getItem("tasks"));
    console.log(tasks);
    let taskExists = false;

    for (let task of tasks) {
        if (task.title === title) {
            taskExists = true;
            break;
        }
    }

    if (taskExists) {
        errorMessage.innerHTML = "Task with the same title exists";
        errorMessage.classList.remove('hide');
        return;
    }

    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log(task);
    taskTitle.value = '';
    taskDescription.value = '';
    taskDueDate.value = '';

    taskContainer.classList.toggle('hide');
    errorMessage.classList.add('hide');
    formContainer.classList.toggle('hide');
    showFormButton.classList.toggle('hide');
    showElements();
});

// Clear all the tasks 
clearTasksBtn.addEventListener('click', (event) => {
    event.preventDefault();
    localStorage.setItem('tasks', JSON.stringify([]));
    document.querySelector('.task-list').innerHTML = "";
    showElements();
})



// on completed.

const getTasks = (currentTab) => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    if (tasks.length === 0) {
        displayErrorMessage("There are no tasks");
        return [];
    }

    hideErrorMessage();
    const currentDate = new Date();

    switch (currentTab) {
        case 'All tasks':
            return tasks;
        case 'Ongoing':
            return tasks.filter(task => new Date(task.dueDate) > currentDate && !task.completed);
        case 'Due':
            return tasks.filter(task => new Date(task.dueDate) <= currentDate && !task.completed);
        case 'Completed':
            return tasks.filter(task => task.completed);
        default:
            return tasks;
    }
}

const makeTaskCard = (title, description, createdAt, dueDate, completed, index) => {
    let listElement = document.createElement('li');
    listElement.innerHTML = `<a data-index="${index + 1}"><h3 class='tsk'>${title} </h3>  
                        <div>
                            <button class="completed-btn">${completed ? "Complete" : "Incomplete"}</button>
                            <button class="edit-btn">Edit</button>
                            <button class="delete-btn">delete</button>
                        </div> </a>
                    <section class="description">
                        <h5 class="tsk">Description : </h5>
                        <p class = "tsk">${description}</p>
                        </br>
                        <h6 id="created-date"> Created Date : ${new Date(createdAt).toLocaleDateString()} <h6>
                        <h6 id="due-date"> Due Date : ${new Date(dueDate).toLocaleDateString()} <h6>
                        <h6 id = "status"> Status : ${completed ? "Completed" : "Not Completed"} <h6>
                        </section>
        `
    if (completed) {
        listElement.querySelector(".description").classList.add('line-through');
        listElement.querySelector(".completed-btn").classList.add('green-btn');
        listElement.querySelector("a").classList.add('green-bg');
    }
    else {
        listElement.querySelector(".description").classList.remove('line-through');
        listElement.querySelector(".completed-btn").classList.remove('green-bg');
        listElement.querySelector("a").classList.remove('green-bg');

    }
    return listElement;
}

const completeBtnLogic = ({ listElement }) => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const title = ''+listElement.querySelector('a h3').innerHTML.trim(); 
    let i = 0; 
    tasks.forEach((element , index)=> {
        if((element.title) == title){
            i = index; 
        }
    });
    tasks[i].completed = !tasks[i].completed; 

    const msg = tasks[i].completed ? "Completed" : "Incomplete"
    listElement.querySelector(".completed-btn").innerHTML = msg;

    const statusMsg = tasks[i].completed ? "Completed" : "Not complete";
    listElement.querySelector('#status').innerHTML = "Status : " + statusMsg;

    const list = listElement.querySelectorAll('.tsk');
    if (tasks[i].completed) {
        for (let ele of list) {
            ele.classList.add('line-through');
        }
    }
    else {
        for (let ele of list) {
            ele.classList.remove('line-through');
        }
    }   
    localStorage.setItem('tasks', JSON.stringify(tasks));
    showElements(activeButton.innerHTML);
}

const deleteBtnLogin = ({ tasks, i }) => {
    tasks.splice(i, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    showElements();
}

const setTasks = (tasks) => {
    if (!tasks || !tasks.length) {
        displayErrorMessage("No tasks yet");
        return;
    }
    hideErrorMessage();
    const taskList = document.querySelector(".task-list");
    taskList.innerHTML = "";

    for (let i = 0; i < tasks.length; i++) {
        const { title, description, createdAt, dueDate, completed } = tasks[i];
        const listElement = makeTaskCard(title, description, createdAt, dueDate, completed, i);

        listElement.querySelector(".completed-btn").addEventListener('click', (event) => {
            event.preventDefault();
            // completeBtnLogic({ tasks, i, listElement });
            completeBtnLogic({  listElement });
        })
        listElement.querySelector(".edit-btn").addEventListener('click', (event) => {
            event.preventDefault();
            console.log("Edited clicked -< " + JSON.stringify(i));
        })

        // delete button logic
        listElement.querySelector(".delete-btn").addEventListener('click', (event) => {
            event.preventDefault();
            deleteBtnLogin({ tasks, i });
        })
        taskList.appendChild(listElement);
    }
}

const showElements = (tab) => {
    const tasks = getTasks(tab);
    if (tasks.length === 0) {
        displayErrorMessage(`There are no ${tab.toLowerCase()} tasks`);
        const taskList = document.querySelector(".task-list");
        taskList.innerHTML = "";
    } else {
        hideErrorMessage();
        displayPagination(tasks);
        // setTasks(tasks);

    }
}

const tabButtons = document.querySelectorAll('.tab-btn');
let activeButton = document.querySelector('.active');


const setActiveTab = (element) => {
    activeButton.classList.remove('active');
    element.classList.add('active');
    activeButton = element;
    const tab = element.innerHTML.trim();
    console.log(tab);
    showElements(tab);
}

tabButtons.forEach(element => {
    element.addEventListener('click', (event) => {
        setActiveTab(element);
    });
});

showElements('All tasks');



function getPageList(totalPages, page, maxLength) {
    function range(start, end) {
        return Array.from(Array(end - start + 1), (_, i) => i + start);
    }
}


// const completeBtnLogic = ({ tasks, i, listElement }) => {


  // const ele = listElement.querySelector('.completed-btn');
    // tasks[i].completed = !tasks[i].completed;


    // const msg = tasks[i].completed ? "Completed" : "Incomplete"
    // listElement.querySelector(".completed-btn").innerHTML = msg;

    // const statusMsg = tasks[i].completed ? "Completed" : "Not complete";
    // listElement.querySelector('#status').innerHTML = "Status : " + statusMsg;

    // const list = listElement.querySelectorAll('.tsk');
    // if (tasks[i].completed) {
    //     for (let ele of list) {
    //         ele.classList.add('line-through');
    //     }
    // }
    // else {
    //     for (let ele of list) {
    //         ele.classList.remove('line-through');
    //     }
    // }
    // localStorage.setItem('tasks', JSON.stringify(tasks));   
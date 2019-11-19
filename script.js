const storageKey = "tutorial_todos";

const convertStringToObj = (str) => JSON.parse(str) || [];

const convertObjToString = (obj) => JSON.stringify(obj) || '';

const getTodos = () => convertStringToObj(localStorage.getItem(storageKey));

const filterTodos = (searchStr) => getTodos().filter(todo => todo.toLowerCase().includes(searchStr.toLowerCase()));

const addTodo = (todo) => localStorage.setItem(storageKey, convertObjToString([...getTodos(), todo]));

const deleteTodo = (todo) => localStorage.setItem(storageKey, convertObjToString(getTodos().filter(_todo => _todo !== todo)));

const buildTodoEl = (todo) => {
    const el = document.createElement("li");
    el.classList.add("list-group-item");
    el.innerText = todo;
    return el;
}

const appendLiToDom = (el) => document.getElementById("todo-list-container").appendChild(el);

const clearTodoListDisplay = () => document.getElementById("todo-list-container").innerHTML = "";

const clearInput = () => document.getElementById("new-todo-input").value = "";

const displayTodos = () => {
    clearInput();
    clearTodoListDisplay();
    getTodos().forEach(_todo => appendLiToDom(buildTodoEl(_todo)));
    initSearchListener();
    initClickListeners();
}
const initSearchListener = () => {
  document.getElementById('search-input').addEventListener('keyup', ($event) => {
    const filtered = filterTodos($event.target.value);
    clearTodoListDisplay();
    filtered.forEach(_todo => appendLiToDom(buildTodoEl(_todo)));
    initClickListeners();
  });
}
const initClickListeners = () => {
    Array.from(document.getElementsByClassName("list-group-item")).forEach(_item => {
        _item.addEventListener("click", ($event) => {
            const todo = $event.target.innerText;
            if(window.confirm("Have you completed this task: " + todo)) {
                deleteTodo(todo);
                displayTodos();
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", () => displayTodos());

document.getElementById("submit-new-todo-btn").addEventListener("click", ($event) => {
    const newTodoInput = document.getElementById("new-todo-input");
    if(newTodoInput.value) {
        addTodo(newTodoInput.value.trim());
        displayTodos();
    }
});

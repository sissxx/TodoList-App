// SELECT ELEMENTS
const form = document.getElementById("todoform");
const todoInput = document.getElementById("newtodo");
const todosListEl = document.getElementById("todos-list");


let todos = JSON.parse(localStorage.getItem("todos")) || [];

renderTodos();

// FORM SUBMIT
form.addEventListener("submit", function (e) {
  e.preventDefault();

  saveTodo();
  renderTodos();
  localStorage.setItem("todos", JSON.stringify(todos));
});

// SAVE TODO
function saveTodo() {
  const todoValue = todoInput.value;

  // check if the todo is empty
  const isEmpty = todoValue === "";


  if (!isEmpty) {
    todos.push({
      value: todoValue,
    });
    todoInput.value = "";
  }
}

// RENDER TODOS
function renderTodos() {
  if (todos.length === 0) {
    todosListEl.innerHTML = "<center>Nothing to do!</center>";
    return;
  }

  // CLEAR ELEMENT BEFORE A RE-RENDER
  todosListEl.innerHTML = "";

  // RENDER TODOS
  todos.forEach((todo, index) => {
    todosListEl.innerHTML += `
    <div class="todo" id=${index}>
      <p>${todo.value}</p>
      <button class="deleteBtn"data-action="delete">Delete</button>
    </div>
    `;
  });
}

// CLICK e LISTENER FOR ALL THE TODOS
todosListEl.addEventListener("click", (e) => {
  const target = e.target;
  const parentElement = target.parentNode;

  if (parentElement.className !== "todo") return;

  const todo = parentElement;
  const todoId = Number(todo.id);

  const action = target.dataset.action;

  action === "delete" && deleteTodo(todoId);
});

// DELETE ITEM
function deleteTodo(todoId) {
  todos = todos.filter((todo, index) => index !== todoId);

  // re-render
  renderTodos();
  localStorage.setItem("todos", JSON.stringify(todos));
}

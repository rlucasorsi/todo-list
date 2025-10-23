// Seleção de elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

//Funções
const saveTodo = (text) => {
  const todo = document.createElement("div");
  todo.classList.add("todo");

  const todoTitle = document.createElement("h3");
  todoTitle.innerText = text;

  todo.appendChild(todoTitle);

  const todoButtons = document.createElement("div");
  todoButtons.classList.add("todo-buttons");

  const finishButton = document.createElement("button");
  finishButton.classList.add("finish-todo");

  const finishIcon = document.createElement("i");
  finishIcon.classList.add("fa-solid", "fa-check");

  finishButton.appendChild(finishIcon);

  const editButton = document.createElement("button");
  editButton.classList.add("edit-todo");

  const editIcon = document.createElement("i");
  editIcon.classList.add("fa-solid", "fa-pen");

  editButton.appendChild(editIcon);

  const removeButton = document.createElement("button");
  removeButton.classList.add("remove-todo");

  const removeIcon = document.createElement("i");
  removeIcon.classList.add("fa-solid", "fa-xmark");

  removeButton.appendChild(removeIcon);

  todoButtons.appendChild(finishButton);
  todoButtons.appendChild(editButton);
  todoButtons.appendChild(removeButton);

  todo.appendChild(todoButtons);

  todoList.appendChild(todo);
  console.log(todo); //div criada -> parei aqui
};

// Eventos
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = todoInput.value;

  if (inputValue) {
    saveTodo(inputValue);
  }
});

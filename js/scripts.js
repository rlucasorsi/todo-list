// Seleção de elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editContainer = document.querySelector("#edit-container");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const searchInput = document.querySelector("#search-input");
const eraseBtn = document.querySelector("#erase-button");
const filterBtn = document.querySelector("#filter-select");

let oldInputValue;

//Funções
const saveTodo = (text, done = 0, save = 1) => {
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

  //Utilizando dados do localstorage
  if (done) {
    todo.classList.add("done");
  }

  if (save) {
    saveTodoLocalStorage({ text, done });
  }
  todoList.appendChild(todo);

  todoInput.value = "";
  todoInput.focus();
};

const toggleForms = () => {
  editContainer.classList.toggle("hide");
  todoForm.classList.toggle("hide");
  todoList.classList.toggle("hide");
};

const updateTodo = (text) => {
  const todos = document.querySelectorAll(".todo");

  todos.forEach((todo) => {
    todoTitle = todo.querySelector("h3");

    if (todoTitle.innerText === oldInputValue) {
      todoTitle.innerText = text;

      updateTodoLocalStorage(oldInputValue, text);

      return; 
    }
  });
};

const getSearchTodos = (search) => {
  const todos = document.querySelectorAll(".todo");
  const normalizedSearch = search.toLowerCase();

  todos.forEach((todo) => {
    todoTitle = todo.querySelector("h3").innerText.toLowerCase();

    todo.style.display = "flex";

    if (!todoTitle.includes(normalizedSearch)) {
      todo.style.display = "none";
    }
  });
};

const filterTodos = (filterValue) => {
  const todos = document.querySelectorAll(".todo");

  switch (filterValue) {
    case "all":
      todos.forEach((todo) => (todo.style.display = "flex"));
      break;
    case "done":
      todos.forEach((todo) =>
        todo.classList.contains("done")
          ? (todo.style.display = "flex")
          : (todo.style.display = "none")
      );
      break;
    case "todo":
      todos.forEach((todo) =>
        !todo.classList.contains("done")
          ? (todo.style.display = "flex")
          : (todo.style.display = "none")
      );

    default:
      break;
  }
};

// Eventos
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = todoInput.value;

  if (inputValue) {
    saveTodo(inputValue);
  }
});

document.addEventListener("click", (e) => {
  const finishBtn = e.target.closest(".finish-todo");
  const editBtn = e.target.closest(".edit-todo");
  const removeBtn = e.target.closest(".remove-todo");

  let todoTitle;

  if (!finishBtn && !editBtn && !removeBtn) return;

  const parentEl = e.target.closest(".todo");

  todoTitle = parentEl.querySelector("h3").innerText;

  if (finishBtn) {
    parentEl.classList.toggle("done");
    updateStatusLocalStorage(todoTitle);
  }

  if (removeBtn) {
    parentEl.remove();
    console.log(todoTitle);

    removeTodoLocalStorge(todoTitle);
  }

  if (editBtn) {
    toggleForms();
    editInput.value = todoTitle;
    oldInputValue = todoTitle;
  }
});

cancelEditBtn.addEventListener("click", (e) => {
  e.preventDefault();
  editInput.value = "";
  toggleForms();
});

editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const editInputValue = editInput.value;

  if (!editInputValue) return;

  updateTodo(editInputValue);
  toggleForms();
});

searchInput.addEventListener("keyup", (e) => {
  const search = e.target.value;

  getSearchTodos(search);
});

eraseBtn.addEventListener("click", (e) => {
  e.preventDefault();

  searchInput.value = "";

  searchInput.dispatchEvent(new Event("keyup"));
});

filterBtn.addEventListener("change", (e) => {
  filterValue = e.target.value;

  console.log("chegou aqui");

  filterTodos(filterValue);
});

// Local Storge
const getTodosLocalStorage = () => {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];

  return todos;
};

const loadTodos = () => {
  const todos = getTodosLocalStorage();

  todos.forEach((todo) => {
    saveTodo(todo.text, todo.done, 0);
  });
};

const saveTodoLocalStorage = (todo) => {
  const todos = getTodosLocalStorage();

  todos.push(todo);

  localStorage.setItem("todos", JSON.stringify(todos));
};

const removeTodoLocalStorge = (todoText) => {
  const todos = getTodosLocalStorage();

  const filteredTodos = todos.filter((todo) => todo.text !== todoText);

  localStorage.setItem("todos", JSON.stringify(filteredTodos));
};

const updateStatusLocalStorage = (todoText) => {
  const todos = getTodosLocalStorage();

  todos.map((todo) =>
    todo.text === todoText ? (todo.done = !todo.done) : null
  );

  localStorage.setItem("todos", JSON.stringify(todos));
};

const updateTodoLocalStorage = (todoOldText, todoNewText) => {
  const todos = getTodosLocalStorage();

  todos.map((todo) =>
    todo.text === todoOldText ? (todo.text = todoNewText) : null
  );

  localStorage.setItem("todos", JSON.stringify(todos));
};

loadTodos();

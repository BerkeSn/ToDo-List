// Select main elements
const todoInput = document.getElementById("todoInput");
const todoList = document.querySelector("#todoList");
const savedTodos = JSON.parse(localStorage.getItem("todos") || "[]" );

// Load saved todos on page load
for(const todo of savedTodos){
    addTodoToList(todo);
}

// Add event listener for Enter key
todoInput.addEventListener("keydown",function(event){
    if(event.key === "Enter"){
        addTodo();
    };
});

// Function to add a new todo
function addTodo(){
    const todoText = todoInput.value.trim();
    if (todoText === "") return;

    const todo = {
        id: Date.now(),
        text: todoText,
        completed: false,
    };

    savedTodos.push(todo);
    localStorage.setItem("todos", JSON.stringify(savedTodos));
    addTodoToList(todo);
    todoInput.value = "";
}

// Function to display todo in the list
function addTodoToList(todo){
    const li = document.createElement("li");
    li.setAttribute("id",todo.id);
    li.innerHTML = `
        <span title="${todo.text}">${todo.text}</span>
        <button onclick="toggleCompleted(${todo.id})"><i class="fa-solid fa-check"></i></button>
        <button onclick="editTodo(${todo.id})"><i class="fa-solid fa-pen-to-square"></i></button>
        <button onclick="removetodo(${todo.id})"><i class="fa-solid fa-trash"></i></button>
        <button onclick="addsubtodo(${todo.id})"><i class="fa-solid fa-arrow-right"></i></button>
    `;
    
    li.classList.toggle('completed',todo.completed);
    todoList.appendChild(li);
}

// Function to toggle completion status
function toggleCompleted(id){
    const todo = savedTodos.find(todo => todo.id === id);
    todo.completed = !todo.completed;
    localStorage.setItem("todos",JSON.stringify(savedTodos));

    const todoElement = document.getElementById(id);
    todoElement.classList.toggle("completed",todo.completed);
}

// Function to edit a todo
function editTodo(id){
    const todo = savedTodos.find(todo => todo.id === id);
    const newText = prompt("Edit Task: ",todo.text); 

    if(newText !== null){
        todo.text = newText.trim();
        localStorage.setItem("todos",JSON.stringify(savedTodos));
        const todoElement = document.getElementById(id);
        todoElement.querySelector("span").textContent = newText;
    }
}

// Function to remove a todo
function removetodo(id){
    const todoElement = document.getElementById(id);
    todoElement.style.animation = "fadeOut 0.3s ease";
    setTimeout(()=>{
        savedTodos.splice(savedTodos.findIndex((todo)=> todo.id === id),1);
        localStorage.setItem("todos",JSON.stringify(savedTodos));
        todoElement.remove();
    },300);
    subContainer.style.visibility = "hidden";
}

// Sub To-Do section
const back = document.querySelector("#back");
const subContainer = document.querySelector(".sub-container");
const subTitle = document.querySelector("#sub-title");
const savedTodos2 = JSON.parse(localStorage.getItem("todos2") || "[]");

// Back button event listener
back.addEventListener("click",()=>{
    subContainer.style.left = "900px";
    subContainer.style.visibility = "hidden";
});

// Load saved subtodos on page load
for(const subtodo of savedTodos2){
    addSubTodoToList(subtodo);
}

// Function to open sub-todo panel
function addsubtodo(id){
    const todo = savedTodos.find(todo => todo.id === id);
    subContainer.style.visibility = "visible";
    subContainer.style.left = "1000px";
    subTitle.textContent = `${todo.text}`;
}

const subInput = document.querySelector("#subInput");
const subBtn = document.querySelector("#subtodosubmit");

// Event listener for adding a sub-todo
subBtn.addEventListener("click",()=>{
    const subText = subInput.value.trim();
    if(subText ==="") return;

    const subdoto = {
        id:Date.now(),
        sub_text: subText,
        subcompleted: false,
    }

    savedTodos2.push(subdoto);
    localStorage.setItem("todos2", JSON.stringify(savedTodos2));
    addSubTodoToList(subdoto);
    subInput.value = "";
});

// Function to display sub-todo in the list
function addSubTodoToList(subdoto){
    const li = document.createElement("li");
    li.setAttribute("id",subdoto.id);

    li.innerHTML = `
        <span title="${subdoto.sub_text}">${subdoto.sub_text}</span>
        <button onclick="subtoggle(${subdoto.id})"><i class="fa-solid fa-check"></i></button>
        <button onclick="subedit(${subdoto.id})"><i class="fa-solid fa-pen-to-square"></i></button>
        <button onclick="subremove(${subdoto.id})"><i class="fa-solid fa-trash"></i></button>
    `;
    li.classList.toggle('completed',subdoto.subcompleted);
    const subList = document.querySelector("#subtodoList");
    subList.appendChild(li);
}

// Function to toggle sub-todo completion
function subtoggle(id){
    const boto = savedTodos2.find(boto => boto.id===id);
    boto.completed = !boto.completed;
    localStorage.setItem("todos2",JSON.stringify(savedTodos2));

    const subtodoElement = document.getElementById(id);
    subtodoElement.classList.toggle("completed",boto.completed);
}

// Function to edit a sub-todo
function subedit(id){
    const boto = savedTodos2.find(boto => boto.id===id);
    const newText = prompt("Edit Task: ", boto.sub_text);

    if(newText !== null){
        boto.sub_text = newText.trim();
        localStorage.setItem("todos2",JSON.stringify(savedTodos2));
        const botoElement = document.getElementById(id);
        botoElement.querySelector("span").textContent=newText;
    }
}

// Function to remove a sub-todo
function subremove(id){
    const botoElement = document.getElementById(id);
    botoElement.style.animation = "fadeOut 0.3s ease";
    setTimeout(()=>{
        savedTodos2.splice(savedTodos2.findIndex((boto)=> boto.id ===id),1);
        localStorage.setItem("todos2",JSON.stringify(savedTodos2));
        botoElement.remove();
    },300);
}

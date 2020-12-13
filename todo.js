const toDoForm = document.querySelector(".js-toDoForm"),
toDoInput = toDoForm.querySelector("input"),
toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';
let toDos = []; //해야 할 일이 생길때마다 추가되도록

function paintToDo(text){
    const li = document.createElement("li"); 
    
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;

    delBtn.innerText = "❌";
    delBtn.addEventListener("click",deleteToDo);
    span.innerText = text; 
    
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);

    const toDoObj = {
        text: text,
        id : newId
    }
    toDos.push(toDoObj);
    saveToDos();
}
function saveToDos(){
    //객체는 stringify 로다가 추가해준다.
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
   // console.log(event.target.parentNode);
   const cleanToDos = toDos.filter(function(toDo){
       return toDo.id !==parseInt(li.id);
   });
   toDos = cleanToDos;
   saveToDos();
   //console.log(cleanToDos);
}

function handleToDoSubmit(){
    console.log("todo");
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = ""; //지우기
}

function loadToDos(){
    const loadedtoDos = localStorage.getItem(TODOS_LS);
    //string으로 얻어온다는 것!
    if(loadedtoDos !== null){
        const parsedtoDos = JSON.parse(loadedtoDos);
       parsedtoDos.forEach(function(toDo){
           paintToDo(toDo.text);
       });
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleToDoSubmit);
}
init();
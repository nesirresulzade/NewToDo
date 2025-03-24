// elementleri secirik ilk once 
let form = document.querySelector("#todoAddForm");
let addInput = document.querySelector("#todoName");
let FirstcardBody = document.querySelectorAll(".card-body")[0];
let SecondcardBody = document.querySelectorAll(".card-body")[1];
let ulListgroup = document.querySelector(".list-group");
let AllclearButton = document.querySelector("#clearButton");
let SilmeIconu = document.querySelector("#icon");
let FilterInput = document.querySelector("#todoSearch");


let todos = [];

runEvent()
//! event leri isleden funksiya 
function runEvent() {
    form.addEventListener("submit", addTodo);
    AllclearButton.addEventListener("click", AllClear);
    document.addEventListener("DOMContentLoaded",pageLoaded);
    SecondcardBody.addEventListener("click",removeToDo);
    FilterInput.addEventListener("keyup",Filter);
};


//! filterleme prosesi
function Filter(){
    let FilterValue = FilterInput.value.toLowerCase().trim();
    let ToDoListleri = document.querySelectorAll(".list-group-item");
    if(ToDoListleri.length>0){
        ToDoListleri.forEach(function(todo){
            if(todo.textContent.toLowerCase().trim().includes(FilterValue)){
                todo.setAttribute("style","display: block");
            }else{
                todo.setAttribute("style","display: none !important");
            }
        });
    }else{
        showAlert("danger","Filter etmek ucun en az bir dene melumat olmalidi...")
    }
};

//! silme prosesi heem ekrandan hem storage den
function removeToDo(e){
    if(e.target.className === "fa fa-remove"){
        // ekrandan silme
        const liRemove = e.target.parentElement.parentElement
        liRemove.remove();
        
        //storage den silme 
        removeToDoToStorage(liRemove.textContent);
        showAlert("success","Melumat Silinmisdir...");
    }
    
};

//! storage den silmesi ucun funksiya
function removeToDoToStorage(remove){
    checkToDoStorage();
    todos.forEach(function(todo,index){
        if(remove=== todo){
            todos.splice(index,1);
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));
};

//! sehife yenilendiyinde storage de olan melumatlari otomatik yazmasi
function pageLoaded(){
    checkToDoStorage();
    todos.forEach(function (todo){
        addTodoToUI(todo);
    });
};

//! butun yaradilan li leri silmek ucun funksiya 
function AllClear() {
    ulListgroup.innerHTML = "";
    localStorage.clear();
    showAlert("success","Butun melumatlar silinmisdir...")
};


//! data ni elave etmek ucun funksiya 
function addTodo(e) {
    e.preventDefault();
    let InputText = addInput.value.trim();
    if (InputText == "") {
        showAlert("danger","Zehmet Olmasa deyer daxil edin...")
    } else {
        //! on uz prosesi 
        addTodoToUI(InputText);
        
        addInput.value = "";
        //! storich hissesine elave etme
        addTodoToStorage(InputText);
        //! alert funksiyasi
        showAlert("success", "Proses Ugurla neticelenmisdir...")
    }
};


//! daxil edilen melumatlari li lere yazma funksiyasi
function addTodoToUI(newTodo) {
    /*
    <li class="list-group-item d-flex justify-content-between">Todo 1
        <a href="#" class="delete-item">
            <i class="fa fa-remove"></i>
        </a>
    </li>
    */
    //! li yeqi yaradilir ve data liye elave edilir
    let li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between";
    li.textContent = newTodo;

    //! a teqini elave edirik
    let a = document.createElement("a");
    a.className = "delete-item";
    a.href = "#";

    //! iconu elave edirik
    let i = document.createElement("i");
    i.className = "fa fa-remove";
    i.id = "icon"
    //! kimin ana kimin child oldugunu teyin edirik
    a.appendChild(i);
    li.appendChild(a);
    ulListgroup.appendChild(li);
};

//! storage e yazma prosesi
function addTodoToStorage(data) {
    checkToDoStorage();
    todos.push(data);
    localStorage.setItem("todos", JSON.stringify(todos));
};

//! storage de ki acarimizin ici bos ve ya dolu oldugunu yoxlayir
function checkToDoStorage() {
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
};


//! her proses bas verdikde bilgilendirici yazi cixmasi ucun funksiya
function showAlert(type, massage) {
   /* <div class="alert alert-success" role="alert">
        A simple success alert—check it out!
    </div>
    */
   let div = document.createElement("div");
   div.className = `alert alert-${type}`
   div.textContent = massage;
   FirstcardBody.appendChild(div);
   setTimeout(() => {
        div.remove();
   }, 2000);
};
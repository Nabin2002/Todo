//Accessing the HTML element
let inpt = document.getElementById('value');
let btn = document.getElementById('btn');
let list = document.getElementById('work-list');

//Fetch the tasks stored in local storage
const getTodoListFromLocal = () => {
    return JSON.parse(localStorage.getItem("todoElement"))
}

//Stored the fetched array data ,if not available initilaize it to empty array
let localTodo = getTodoListFromLocal() || [];//whenever you are using fat arrow funtion the defination of the funtion must be declare before 

//create the element that needs to be added dynamically
const addTodoDynamicElement = (curEle) => {
    let ele = document.createElement('div');
    ele.classList.add('tododiv');
    ele.innerHTML = `<span>${curEle}</span> <button class="delete-btn">Delete</button>`;
    list.appendChild(ele);
}

//Check for the list if already not present then update the local storage and the forntend list 
const addTodo = (e) => {
    e.preventDefault();
    let value = inpt.value.trim();

    if (value == "") {
        alert("Please enter a task.");
    }
    else if (localTodo.includes(value)) {
        alert("Value alreary exist");
    }
    else {
        localTodo.push(value);
        localTodo = [...new Set(localTodo)];
        console.log(localTodo);
        localStorage.setItem("todoElement", JSON.stringify(localTodo));
        addTodoDynamicElement(value);
        inpt.value = "";
    }
}

//Update the local Storage
const addTodoListLocalStorage = (localTodo) => {
    return localStorage.setItem("todoElement", JSON.stringify(localTodo))
}

//Operation tyo perform when "Add" button is clicked
btn.addEventListener('click', (e) => {
    addTodo(e);
});

inpt.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        btn.click();
    }
});


//Show when the list is empty
const updateEmptyMessage = () => {
    if (localTodo.length === 0) {
        list.innerHTML = `<p style="text-align:center;color:gray;">No tasks yet</p>`;
    }
};

//Initially fill the list with the element
const showTodoList = () => {
    if (localTodo.length === 0) {
        updateEmptyMessage();
    } else {
        localTodo.forEach((curEle) => addTodoDynamicElement(curEle));
    }
};

showTodoList();

//Remove the Element that need to be deleted
const removeTodoElement = (e) => {
    let todoEle = e.target;
    let todoElementValue = todoEle.previousElementSibling.textContent;//This line gets the text content of the element that appears just before todoEle in the DOM.
    let parentEle = e.target.parentElement;
    //Filter the elements which need to be kept in the list
    localTodo = localTodo.filter((curEle) => {
        return curEle != todoElementValue;
    })
    //Update the Local Storge
    addTodoListLocalStorage(localTodo);
    console.log(localTodo);
    parentEle.remove();
    updateEmptyMessage();

}

//Accessing the list for deletion of the element
list.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.classList.contains("delete-btn")) {
        removeTodoElement(e);
    }
})

// Delete on click
// list.addEventListener('click', (event) => {
//   const target = event.target;
//   if (target.tagName === 'P') {
//     target.remove();
//   }
// });
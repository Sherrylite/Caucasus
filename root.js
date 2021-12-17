


let todoItems = [
    {
        title: "write a paper",
        isFinished: false,
        isImportance: false,


        title: "prepare a work",
        isFinished: false,
        isImportance: false,


    }
];


function renderTodoItemList(todoItems) {

    let secEl = document.querySelector("#todolist > .section")

    console.log(secEl);

    for (let item of todoItems) {
        let itemDiv = document.createElement("div");

        let inputEl = document.createElement("input")
        inputEl.type = "checkbox"
        let titleEl = document.createElement("div")
        let importanceEl = document.createElement("div")

        titleEl.innerText = item.title;

        itemDiv.append(inputEl);
        itemDiv.append(titleEl);
        itemDiv.append(importanceEl);


        secEl.append(itemDiv);


    }
}

renderTodoItemList(todoItems);
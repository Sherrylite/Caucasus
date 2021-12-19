

let todoItems = [];//待办事项

let finishedItems = [];//已完成事项



function renderTodoItemList(todoItems,finishedItems) {

//把listpane放进这个函数
    let paneEl = document.querySelector("#todolist > .list-pane");
    paneEl.innerHTML = "";
    
//添加待办事项
    for (let i=0; i < todoItems.length; i++ ) {
        let item = todoItems[i];
        let itemDiv = document.createElement("div");
        itemDiv.className = "todoitem";
        itemDiv.id = i+1;
        
//用checkbox打勾，标记是否完成，完成会加入finishedItems
        let inputEl = document.createElement("input");
        inputEl.type = "checkbox";

        inputEl.addEventListener("change", (e) => {
            console.log("finished:",item); 
            
            finishedItems.push(item);
            todoItems.splice(i,1);

            console.log("finished:",i,todoItems,finishedItems);
            renderTodoItemList(todoItems,finishedItems);

        })

//对待办事项文本进行规定
        let titleEl = document.createElement("div");
        titleEl.className = "title";


//修改事项，用prompt函数弹窗进行修改
        titleEl.addEventListener("click", (e)=>{
            let changeEl = prompt("修改","");
            titleEl.innerText = changeEl;
            todoItems[i].title = changeEl;
            console.log(todoItems)
        })


//标记是否重要，重要的话感叹号变红
        let importanceEl = document.createElement("div");
        importanceEl.className = "important-flag";
        importanceEl.innerText = "!";

        if (item.isImportance) {
            importanceEl.classList.add("open");
        }

        importanceEl.addEventListener("click", (e) => {
            console.log("emphasized: ", item);
            if (item.isImportance) {
                item.isImportance = false;
            } else {
                item.isImportance = true;
            }

            renderTodoItemList(todoItems, finishedItems);
        });

        
//规定删除键
        let deletedBtn = document.createElement("button");
        deletedBtn.className = "deleted-flag";
        deletedBtn.innerText = "x";
        
//删除事项
       deletedBtn.addEventListener("click", (e)=>{
           console.log("deleted:",item);
           del = document.getElementById(i+1);
           del.remove();
           todoItems.splice(i,1)
       })  
       
       
    
        titleEl.innerText = item.title;

//向itemDiv中加入节点
        itemDiv.append(inputEl);
        itemDiv.append(titleEl);
        itemDiv.append(importanceEl);
        itemDiv.append(deletedBtn);


        paneEl.append(itemDiv);

    }
}



//规定finishedItems
function renderFinishedItemList(todoItems, finishedItems) {

    let paneEl = document.querySelector("#todolist > .list-pane");
    paneEl.innerHTML = "";

    for (let i=0; i < finishedItems.length; i++ ) {
        let item = finishedItems[i];
        let itemDiv = document.createElement("div");
        itemDiv.className = "todoitem";


        let titleEl = document.createElement("div");
        titleEl.className = "title";

        let importanceEl = document.createElement("div");
        importanceEl.className = "important-flag"
        importanceEl.innerText = "!";
        if (item.isImportance) {
            importanceEl.classList.add("open");
        }
        

        titleEl.innerText = item.title;

        itemDiv.append(titleEl);
        itemDiv.append(importanceEl);
        
        paneEl.append(itemDiv);
    }

}




//对navs和inputpane进行规定
function renderInputPane(todoItems) {
    let inputPaneEl = document.querySelector("#todolist > .input-pane");
    
    let addBtnEl = inputPaneEl.querySelector("#add-btn");
    let hisBtnEl = inputPaneEl.querySelector("#his-btn");

//添加键
    addBtnEl.addEventListener("click", (e)=>{
        let inputEl = inputPaneEl.querySelector("input");

        todoItems.push({
            title: inputEl.value,
            isFinished: false,
            isImportance: false, 
        })
        
        console.log("add a item: ", inputEl.value);
        renderTodoItemList(todoItems, finishedItems);
    });

//历史键
    hisBtnEl.addEventListener("click", (e)=>{
        if (hisBtnEl.classList.contains("open")) {
            hisBtnEl.classList.remove("open");
            renderTodoItemList(todoItems, finishedItems)
        } else {
            hisBtnEl.classList.add("open");
            renderFinishedItemList(todoItems, finishedItems)
        }
    });

//navs中的button显示根据history历史键进行相应改变
    let navsPaneEl = document.querySelector("#todolist > .navs");

    let ndBtnEl = navsPaneEl.querySelector("#NO-DATE");
    let comBtnEl = navsPaneEl.querySelector("#COMPLETED");

    hisBtnEl.addEventListener("click", (e)=>{
        if (hisBtnEl.classList.contains("open")) {
            ndBtnEl.classList.remove("open");
            comBtnEl.classList.add("open");
        } 
        else {
            comBtnEl.classList.remove("open");
            ndBtnEl.classList.add("open");
        }
    });

}





renderInputPane(todoItems,finishedItems);
renderTodoItemList(todoItems,finishedItems);
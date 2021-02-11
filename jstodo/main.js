const addButton = document.querySelector('#addButton');
addButton.addEventListener('click', () => {
  showAlert('タスク追加', '', 'やらなきゃいけないことは何？');
})

function addToDo (todo) {
  const todoList = document.querySelector("#todos");
  const doneList = document.querySelector("#done");

  const todoItem = document.createElement("ion-item-sliding");
  todoItem.id = todo.id;
  todoItem.innerHTML = `
    <ion-item onclick="updateToDo('${todo.id}')">
      <ion-label>
        <h2>${todo.title}</h2>
        <h3>${todo.due.toDateString()}まで</h3>
      </ion-label>
        <ion-checkbox ${(todo.done) ? 'checked' : ''} color="primary" slot="start"></ion-checkbox>
    </ion-item>
    <ion-item-options side="end">
    <ion-item-option color="danger" expandable onClick="deleteToDo('${todo.id}')">
        Delete
      </ion-item-option>
    </ion-item-options>
  `;
  if (todo.done) {
    doneList.appendChild(todoItem);
  } else {
    todoList.appendChild(todoItem);
  }
}

function deleteToDo(todoId) {
  todos.splice(todos.findIndex(el => el.id === todoId), 1);
  document.querySelector(`#${todoId}`).remove();
}

function updateToDo(todoId) {
  const todo = todos.find(el => el.id === todoId);
  todo.done = !todo.done;
  document.querySelector(`#${todoId}`).remove();
  addToDo(todo);
}

function showAlert(header, subheader, message) {
  const alert = document.createElement('ion-alert');
  alert.header = header;
  alert.subHeader = subheader;
  alert.message = message;
  alert.inputs = [
    {
      id: "new-todo",
      name: "todo",
      type: "text",
      placeholder: "Write your todo here.",
    },
    {
      id: "new-due",
      name: "due",
      type: "date",
    },
  ];
  alert.buttons = [
    {
      text: 'Cancel',
      role: 'cancel',
    },
    {
      text: 'OK',
      handler: () => {
        const todo = {};
        todo.title = document.querySelector('#new-todo').value;
        todo.due = new Date(document.querySelector("#new-due").value);
        todo.id = 'todo' + (new Date).getSeconds().toString();
        todo.done = false;
        todos.push(todo);
        addToDo(todo);
      }
    }
  ];

  document.body.appendChild(alert);
  return alert.present();
}

const todos = [
  {
    id: "todo1",
    title: "部屋の掃除",
    due: new Date(2021, 9, 31),
    done: false,
  },
  {
    id: "todo2",
    title: "ゴミ捨て",
    due: new Date(2021, 9, 31),
    done: false,
  },
  {
    id: "todo3",
    title: "風呂の掃除",
    due: new Date(2021, 9, 31),
    done: false,
  },
  {
    id: "todo4",
    title: "屋根の掃除",
    due: new Date(2021, 9, 31),
    done: false,
  },
  {
    id: "todo5",
    title: "窓の掃除",
    due: new Date(2021, 9, 31),
    done: false,
  },
  {
    id: "todo6",
    title: "犬小屋の掃除",
    due: new Date(2021, 9, 31),
    done: false,
  },
  {
    id: "todo7",
    title: "朝飯を食う",
    due: new Date(2021, 9, 31),
    done: true,
  },
  {
    id: "todo8",
    title: "昼飯を食う",
    due: new Date(2021, 9, 31),
    done: true,
  },
  {
    id: "todo9",
    title: "晩飯を食う",
    due: new Date(2021, 9, 31),
    done: true,
  },
];


function writeToDo(todos) {
  const todoList = document.querySelector("#todos");
  const doneList = document.querySelector("#done");

  for (let todo of todos) {
    const todoItem = document.createElement("ion-item-sliding");
    todoItem.id = todo.id;
    todoItem.innerHTML = `
    <ion-item onclick="updateToDo('${todo.id}')">
        <ion-label>
          <h2>${todo.title}</h2>
          <h3>${todo.due.toDateString()}まで</h3>
        </ion-label>
        <ion-checkbox ${
          todo.done ? "checked" : ""
        } color="primary" slot="start"></ion-checkbox>
      </ion-item>
      <ion-item-options side="end">
    <ion-item-option color="danger" expandable onClick="deleteToDo('${todo.id}')">
          Delete
        </ion-item-option>
      </ion-item-options>
    `;
    if (todo.done) {
      doneList.appendChild(todoItem);
    } else {
      todoList.appendChild(todoItem);
    }
  }
}

writeToDo(todos);
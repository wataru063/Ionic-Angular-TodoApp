const addButton = document.querySelector('#addButton');
addButton.addEventListener('click', () => {
  showAlert('追加ボタンクリック', 'これで確認できました。', 'もう閉じて良いですよ');
})

function addToDo (todo) {
  const todoList = document.querySelector("#todos");
  const todoItem = document.createElement("ion-item-sliding");
  todoItem.id = todo.id;
  todoItem.innerHTML = `
    <ion-item>
      <ion-label>
        <h2>${todo.title}</h2>
        <h3>${todo.due.toDateString()}まで</h3>
      </ion-label>
        <ion-checkbox ${(todo.done) ? 'checked' : ''} color="primary" slot="start"></ion-checkbox>
    </ion-item>
    <ion-item-options side="end">
      <ion-item-option onClick="unread(item)" color="danger" expandable>
        Delete
      </ion-item-option>
    </ion-item-options>
  `;
  todoList.appendChild(todoItem);
}

function writeToDo (todos) {
  const todoList = document.querySelector("#todos");
  const doneList = document.querySelector("#done");

  for (let todo of todos) {
    const todoItem = document.createElement("ion-item-sliding");
    todoItem.id = todo.id;
    todoItem.innerHTML = `
      <ion-item>
        <ion-label>
          <h2>${todo.title}</h2>
          <h3>${todo.due.toDateString()}まで</h3>
        </ion-label>
        <ion-checkbox ${(todo.done) ? 'checked' : ''} color="primary" slot="start"></ion-checkbox>
      </ion-item>
      <ion-item-options side="end">
        <ion-item-option onClick="unread(item)" color="danger" expandable>
          Delete
        </ion-item-option>
      </ion-item-options>
    `;
    if(todo.done) {
      doneList.appendChild(todoItem);
    } else {
      todoList.appendChild(todoItem)
    }
  }
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
      text: 'Add',
      handler: () => {
        const todo = {};
        todo.title = document.querySelector('#new-todo').value;
        todo.due = new Date(document.querySelector("#new-due").value);
        todo.id = 'todo' + (new Date).getSeconds().toString();
        todo.done = false;
        addToDo(todo);
      }
    }
  ];

  document.body.appendChild(alert);
  return alert.present();
}

const todos = [
  {
    title: "部屋の掃除",
    due: new Date(2021, 9, 31),
    done: false,
  },
  {
    title: "ゴミ捨て",
    due: new Date(2021, 9, 31),
    done: false,
  },
  {
    title: "風呂の掃除",
    due: new Date(2021, 9, 31),
    done: false,
  },
  {
    title: "屋根の掃除",
    due: new Date(2021, 9, 31),
    done: false,
  },
  {
    title: "窓の掃除",
    due: new Date(2021, 9, 31),
    done: false,
  },
  {
    title: "犬小屋の掃除",
    due: new Date(2021, 9, 31),
    done: false,
  },
  {
    title: "朝飯を食う",
    due: new Date(2021, 9, 31),
    done: true,
  },
  {
    title: "昼飯を食う",
    due: new Date(2021, 9, 31),
    done: true,
  },
  {
    title: "晩飯を食う",
    due: new Date(2021, 9, 31),
    done: true,
  },
];

writeToDo(todos);
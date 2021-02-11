function addToDo (todo) {
  const todoList = document.querySelector("#todos");
  const doneList = document.querySelector("#done");

  const todoItem = document.createElement("ion-item-sliding");
  todoItem.id = todo.id;
  todoItem.innerHTML = `
    <ion-item onclick="onItemClicked('${todo.id}')">
      <ion-label>
        <h2>${todo.title}</h2>
        <h3>${todo.due.toDateString()}まで</h3>
      </ion-label>
        <ion-checkbox ${(todo.done) ? 'checked' : ''} color="primary" slot="start"></ion-checkbox>
    </ion-item>
    <ion-item-options side="end">
    <ion-item-option color="danger" expandable onClick="onDeleteToDo('${todo.id}')">
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

const subject = new rxjs.Subject();
const observable = rxjs.from([1,2,3,4,5]);
const { filter, map, mergeMap, tap } = rxjs.operators;

const WRITE_TODOS = "[ToDo Page] Load ToDos";
const DELETE_TODOS = "[ToDo Page] Delete ToDo";
const TOGGLE_STATUS = "[ToDo Page] Toggle ToDo Status";

subject.pipe(
  filter(action => action.type === WRITE_TODOS),
  mergeMap(action => rxjs.from(action.payload)),
  tap(todo => addToDo(todo))
).subscribe();

subject.pipe(
  filter(action => action.type === DELETE_TODOS),
  map(action => action.payload),
  tap(todo => document.querySelector(`#${todo.id}`).remove())
).subscribe();

subject.pipe(
  filter(action => action.type === TOGGLE_STATUS),
  map(action => action.payload),
  tap(todo => subject.next({
    type: DELETE_TODOS,
    payload: todo
  })),
  tap(todo => subject.next({
    type: WRITE_TODOS,
    payload: [todo]
  }))
).subscribe();

subject.pipe(

)

const action = {
  type: WRITE_TODOS,
  payload: todos
};
subject.next(action);

const addButton = document.querySelector('#addButton');
rxjs.fromEvent(addButton, 'click').pipe(
  tap(el => showAlert('タスク追加', '', 'やらなきゃいけないことは何？'))
).subscribe();

function onDeleteToDo(todoId) {
  const todo = todos.find((el) => el.id === todoId);
  todos.splice(todos.findIndex(el => el.id === todoId), 1);
  const action = {
    type: DELETE_TODOS,
    payload: todo,
  };
  subject.next(action)
}

function onItemClicked(todoId) {
  const todo = todos.find((el) => el.id === todoId);
  todo.done = !todo.done;
  const action = {
    type: TOGGLE_STATUS,
    payload: todo,
  };
  subject.next(action);
}

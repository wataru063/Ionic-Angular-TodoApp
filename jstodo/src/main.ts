import { from, fromEvent, Subject } from "rxjs";
import { filter, tap, mergeMap, map } from "rxjs/operators";

type ToDo = {
  id: string;
  title: string;
  due: Date;
  done: boolean;
};

interface IonicAlert extends HTMLElement {
  header: string;
  subHeader: string;
  message: string;
  buttons: { [key: string]: string | Function }[];
  inputs: { [key: string]: string | Function }[];
  present(): void;
}

function addToDo(todo: ToDo): void {
  const todoList = document.querySelector("#todos") as HTMLElement;
  const doneList = document.querySelector("#done") as HTMLElement;

  const todoItem = document.createElement("ion-item-sliding");
  todoItem.id = todo.id;
  todoItem.innerHTML = `
    <ion-item onclick="onItemClicked('${todo.id}')">
      <ion-label>
        <h2>${todo.title}</h2>
        <h3>${todo.due.toDateString()}まで</h3>
      </ion-label>
        <ion-checkbox ${
          todo.done ? "checked" : ""
        } color="primary" slot="start"></ion-checkbox>
    </ion-item>
    <ion-item-options side="end">
    <ion-item-option color="danger" expandable onClick="onDeleteToDo('${
      todo.id
    }')">
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

function showAlert(header: string, subheader: string, message: string): void {
  const alert = document.createElement("ion-alert") as IonicAlert;
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
      text: "Cancel",
      role: "cancel",
    },
    {
      text: "OK",
      handler: () => {
        const newTodo = document.querySelector("#new-todo") as HTMLInputElement;
        const newDue = document.querySelector("#new-due") as HTMLInputElement;
        const todo: ToDo = {
          title: newTodo.value,
          due: new Date(newDue.value),
          id: "todo" + new Date().getSeconds().toString(),
          done: false,
        };
        todos.push(todo);
        addToDo(todo);
      },
    },
  ];

  document.body.appendChild(alert);
  return alert.present();
}

const todos: ToDo[] = [
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

type Action = {
  type: string;
  payload: ToDo[] | ToDo;
};

const subject: Subject<Action> = new Subject();
const WRITE_TODOS = "[ToDo Page] Load ToDos";
const DELETE_TODOS = "[ToDo Page] Delete ToDo";
const TOGGLE_STATUS = "[ToDo Page] Toggle ToDo Status";

subject.pipe(
    filter((action) => action.type === WRITE_TODOS),
    mergeMap((action) => from(action.payload as ToDo[])),
    tap((todo) => addToDo(todo))
  )
  .subscribe();

subject.pipe(
    filter((action) => action.type === DELETE_TODOS),
    map((action) => action.payload as ToDo),
    tap((todo) => document.querySelector(`#${todo.id}`)?.remove())
  )
  .subscribe();

subject.pipe(
    filter((action) => action.type === TOGGLE_STATUS),
    map((action) => action.payload as ToDo),
    tap((todo) =>
      subject.next({
        type: DELETE_TODOS,
        payload: todo,
      })
    ),
    tap((todo) =>
      subject.next({
        type: WRITE_TODOS,
        payload: [todo],
      })
    )
  )
  .subscribe();

const action: Action = {
  type: WRITE_TODOS,
  payload: todos as ToDo[],
};
subject.next(action);

const addButton = document.querySelector("#addButton") as HTMLElement;
fromEvent(addButton, "click")
  .pipe(
    tap((el) => showAlert("タスク追加", "", "やらなきゃいけないことは何？"))
  )
  .subscribe();

function onDeleteToDo(todoId: string): void {
  const todo = todos.find((el) => el.id === todoId) as ToDo;
  todos.splice(todos.findIndex((el) => el.id === todoId), 1);
  const action: Action = {
    type: DELETE_TODOS,
    payload: todo,
  };
  subject.next(action);
}

function onItemClicked(todoId: string): void {
  const todo = todos.find((el) => el.id === todoId) as ToDo;
  todo.done = !todo.done;
  const action: Action = {
    type: TOGGLE_STATUS,
    payload: todo as ToDo,
  };
  subject.next(action);
}

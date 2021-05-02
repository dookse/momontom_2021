const toDoForm = document.querySelector('.js-toDoForm');
const toDoInput = toDoForm.querySelector('input');
const toDoList = document.querySelector('.js-toDoList');

const TODOS_LS = 'toDos';
let toDos = [];

const deleteTodo = ({target: {parentNode}}) => {
  toDoList.removeChild(parentNode);
  toDos = toDos.filter(toDos => toDos.id !== parentNode.id);
  saveTodo();
}

const makeNewTodo = text => {
  const delBtn = document.createElement('button');
  delBtn.innerText = '❌';
  delBtn.addEventListener('click', deleteTodo);

  const span = document.createElement('span');
  const newId = (toDos.length + 1).toString();
  span.innerText = text;

  const li = document.createElement('li');
  li.id = newId;
  li.append(span, delBtn);
  return {newId, li};
};

const paintToDo = text => {
  const {newId, li} = makeNewTodo(text);

  toDoList.appendChild(li);
  toDos.push({
    text: text,
    id: newId,
  });
  saveTodo();
};

const saveTodo = () => localStorage.setItem(TODOS_LS, JSON.stringify(toDos));

const handleSubmit = event => {
  event.preventDefault();
  const currentValue = toDoInput.value;
  if (!currentValue) {
    return;
  }
  paintToDo(currentValue);
  toDoInput.value = '';
};

const loadToDos = () => {
  const loaded = localStorage.getItem(TODOS_LS);
  if (loaded !== null) {
    const parsed = JSON.parse(loaded);
    parsed.forEach(toDo => paintToDo(toDo.text));
  }
};

const init = () => {
  loadToDos();
  toDoForm.addEventListener('submit', handleSubmit);
};

init();

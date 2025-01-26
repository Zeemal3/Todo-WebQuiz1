const todosContainer = document.getElementById('todosContainer');
const todoIdInput = document.getElementById('todoId');
const showAllTodosBtn = document.getElementById('showAllTodos');
const submitTodoBtn = document.getElementById('submitTodo');


const fetchTodos = (id = null) => {
  let url = 'https://jsonplaceholder.typicode.com/todos';
  if (id) url += `/${id}`;


  fetch(url)
    .then(response => response.json())
    .then(data => {
      todosContainer.innerHTML = '';

      const todos = Array.isArray(data) ? data : [data];

      todos.forEach(todo => {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        todoDiv.classList.add(todo.completed ? 'completed' : 'not-completed');


        todoDiv.innerHTML = `
          <h4>ID: ${todo.id}</h4>
          <p>Title: ${todo.title}</p>
          <p>Status: ${todo.completed ? 'Completed' : 'Not Completed'}</p>
        `;

        todosContainer.appendChild(todoDiv);
      });
    })
    .catch(error => {
      console.error('Error fetching todos:', error);
    });
};


showAllTodosBtn.addEventListener('click', () => fetchTodos());
submitTodoBtn.addEventListener('click', () => {
  const todoId = todoIdInput.value;
  if (todoId) {
    fetchTodos(todoId);
  } else {
    alert('Please enter a valid ToDo ID between 1 and 10.');
  }
});

import { useState, useEffect } from 'react';

export default function Home({ params }) {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [isAdding, setIsAdding] = useState(true);
  const [datetime, setDatetime] = useState('');

  const email = params.name;

  useEffect(() => {
    const postData = async () => {
      try {
        const response = await fetch('/api/saveTodos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, todos, datetime }),
        });
        const data = await response.json();
        console.log(data.message);
      } catch (error) {
        console.error(error);
        console.log(JSON.stringify({ email, todos, datetime }));
      }
    };

    // Call postData when the component mounts
    postData();
  }, []);

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, newTodo]);
      setNewTodo('');
    }
  };

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleDatetimeChange = (event) => {
    setDatetime(event.target.value);
  };

  const finishAdding = () => {
    setIsAdding(false);
    postData(); // Call the postData function here
  };

  const removeTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  const removeAllTodos = () => {
    setTodos([]);
  };

  return (
    <div>
      <h1>Todo App</h1>
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={handleInputChange}
          placeholder="Enter a new todo"
          disabled={!isAdding}
        />
        <button onClick={addTodo} disabled={!isAdding}>
          Add Todo
        </button>
      </div>

      <div>
        <input
          type="text"
          value={datetime}
          onChange={handleDatetimeChange}
          placeholder="Enter a datetime (yyyy/mm/dd)"
          disabled={!isAdding}
        />
      </div>

      {isAdding ? (
        <button onClick={finishAdding}>Finish Adding Todos</button>
      ) : (
        <div>
          <button onClick={removeAllTodos}>Remove All Todos</button>
          <ul>
            {todos.map((todo, index) => (
              <li key={index}>
                {todo}{' '}
                <button onClick={() => removeTodo(index)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

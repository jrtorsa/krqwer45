import React, { Component } from "react";

/// Modifica el componente para que se puedan agregar tareas, tachar y destacharlas y error de validacion en el input
const initialState = [
  { id: 1, name: "Sacar la ropa", done: false },
  { id: 2, name: "Hacer la cama", done: true },
  { id: 3, name: "Leer un rato", done: false },
];
class App extends Component {
  constructor(){
    super()
    this.state = {
      initialState,
      newTask: "",
      id: 4,
      done: false,
    };
  }

  handleChange = (e) => {
    this.setState({
      newTask: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { newTask, id, done } = this.state;
    this.setState((prevState) => ({
      initialState: [
        ...this.state.initialState,
        { name: newTask, id: id, done },
      ],
      newTask: "",
      id: prevState.id + 1,
    }));
  };

  handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      this.handleSubmit();
    }
  };

  handleClick = (taskId) => {
    const newTask = this.state.initialState.map( task => {
      if(taskId === task.id){
        task.done = !task.done
      } 
      return task
    })
    this.setState({
      initialState: [...newTask]
    })
  };

  render() {
    return (
      <div className="wrapper">
        <div className="list">
          <h3>Por hacer:</h3>
          <ul className="todo">
            {this.state.initialState.map((task, index) => (
              <li key={task.id} onClick={() => this.handleClick(task.id)} className={task.done ? 'done' : ''}>
                {task.name}
              </li>
            ))}
          </ul>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              id="new-task"
              placeholder="Ingresa una tarea y oprime Enter"
              onChange={this.handleChange}
              onKeyPress={this.handleKeyPress}
              value={this.state.newTask}
              className={this.newTask ? "" : "error"}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default App;

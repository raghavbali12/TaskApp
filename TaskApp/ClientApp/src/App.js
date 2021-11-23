import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { About } from './components/About';
import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    constructor() {
        super();

        this.state = {
            tasks: [],
            showAddTask: false,
            setLoading:true
        };
    }


    //Fetch tasks
    fetchTasks = async () => {
        const res = await fetch('http://localhost:5000/api/Tasks')
        const data = await res.json()

        return data
    }

    //Fetch single task
    fetchTask = async (id) => {
        const res = await fetch(`http://localhost:5000/api/Tasks/${id}`)
        const data = await res.json()

        return data
    }


    componentDidMount = async () => {
        const tasksFromServer = await this.fetchTasks()
        tasksFromServer.sort((a, b) => { 
            return a.id - b.id //Make sure tasks are always returned in the same order
        })
        this.setState({ tasks: tasksFromServer })
        this.setState({ setLoading: false })
    }

    addTask = async (text, day, reminder) => {

        const task = { Task_text: text, Task_due_date: day, Reminder: reminder }
        const res = await fetch('http://localhost:5000/api/Tasks',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(task)
            })
        const data = await res.json()

        this.setState({tasks: [...this.state.tasks, data]})
    }

    editTask = async (id, text, day, reminder) => {
        const taskToUpdate = { id: id, task_text: text, task_due_date: day, reminder: reminder }
        const { tasks } = this.state
        const updatedTasks = tasks.map((task) => task.id === id ? taskToUpdate : task)
        this.setState({ tasks: updatedTasks })

        await fetch(`http://localhost:5000/api/Tasks/${id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(taskToUpdate)
            })
    }

    deleteTask = async (id) => {
        const { tasks } = this.state
        const updatedTasks = tasks.filter((task) => task.id !== id)
        this.setState({ tasks: updatedTasks })

        await fetch(`http://localhost:5000/api/Tasks/${id}`, { method: 'DELETE' })
    }

    toggleReminder = async (id) => {
        const { tasks } = this.state
        const updatedTasks = tasks.map((task) => task.id === id ? { ...task, reminder: !task.reminder } : task)
        this.setState({ tasks: updatedTasks })

        const taskToToggle = await this.fetchTask(id)
        const updateTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

        await fetch(`http://localhost:5000/api/Tasks/${id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(updateTask)
            })
    }


    toggleShowAddTask = () => {
        this.setState({showAddTask: !this.state.showAddTask})
    }

  render () {
    return (
        <Layout>
            <Route exact path='/' render={(props) => <Home {... this.state} toggleReminder={this.toggleReminder} deleteTask={this.deleteTask} toggleShowAdd={this.toggleShowAddTask} addTask={this.addTask} editTask={this.editTask} />} />
            <Route path='/about' component={About} />
        </Layout>
    );
  }
}

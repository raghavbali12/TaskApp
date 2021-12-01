import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { About } from './components/About';
import './custom.css'
import audio from './media/music/complete_sound.mp3';

export default class App extends Component {
    static displayName = App.name;

    constructor() {
        super();

        this.state = {
            tasks: [],
            showAddTask: false,
            setLoading:true,
            tasksToShow: 0,
            showCompletedTasks: false
        };
    }


    //Fetch tasks
    fetchTasks = async () => {
        const res = await fetch('http://192.168.1.58:5000/api/Tasks')
        const data = await res.json()

        return data
    }

    //Fetch single task
    fetchTask = async (id) => {
        const res = await fetch(`http://192.168.1.58:5000/api/Tasks/${id}`)
        const data = await res.json()

        return data
    }

    setTasksToShow = (showCompleted=false) => {
        let count = 0
        if (!showCompleted) {
            this.state.tasks.map((task) => {!task.completed && count++})
        }
        else {
            count = this.state.tasks.length
        }
        return count
    }

    componentDidMount = async () => {
        const tasksFromServer = await this.fetchTasks()
        tasksFromServer.sort((a, b) => { 
            return a.id - b.id //Make sure tasks are always returned in the same order
        })
        this.setState({ tasks: tasksFromServer })
        this.setState({ setLoading: false })
        let count = this.setTasksToShow()
        this.setState({tasksToShow: count})
    }

    addTask = async (text, day, reminder, completed) => {

        const task = { Task_text: text, Task_due_date: day, Reminder: reminder, Completed: completed }
        const res = await fetch('http://192.168.1.58:5000/api/Tasks',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(task)
            })
        const data = await res.json()

        this.setState({tasks: [...this.state.tasks, data]})
        const count = this.state.tasksToShow
        this.setState({tasksToShow: count + 1})
    }

    editTask = async (id, text, day, reminder, completed) => {
        const taskToUpdate = { id: id, task_text: text, task_due_date: day, reminder: reminder, completed: true }
        const { tasks } = this.state
        const updatedTasks = tasks.map((task) => task.id === id ? taskToUpdate : task)
        this.setState({ tasks: updatedTasks })

        await fetch(`http://192.168.1.58:5000/api/Tasks/${id}`,
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
        const count = this.state.tasksToShow
        this.setState({tasksToShow: count - 1})

        await fetch(`http://192.168.1.58:5000/api/Tasks/${id}`, { method: 'DELETE' })
    }

    playAudio = () => {
        new Audio(audio).play();
    }

    completeTask = async (id, text, day, reminder) => {
        const taskToUpdate = { id: id, task_text: text, task_due_date: day, reminder: reminder, completed: true}
        const { tasks } = this.state
        const updatedTasks = tasks.map((task) => task.id === id ? {...task, completed: true} : task)
        this.setState({ tasks: updatedTasks })
        const count = this.state.tasksToShow
        this.setState({tasksToShow: count - 1})
        this.playAudio()

        await fetch(`http://192.168.1.58:5000/api/Tasks/${id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(taskToUpdate)
            })
    }

    toggleReminder = async (id) => {
        const { tasks } = this.state
        const updatedTasks = tasks.map((task) => task.id === id ? { ...task, reminder: !task.reminder } : task)
        this.setState({ tasks: updatedTasks })

        const taskToToggle = await this.fetchTask(id)
        const updateTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

        await fetch(`http://192.168.1.58:5000/api/Tasks/${id}`,
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

    toggleShowCompleted = (showCompleted) => {
        this.setState({showCompletedTasks: showCompleted})
        if (showCompleted) {
            const count = this.setTasksToShow(true)
            this.setState({tasksToShow: count})
        }
        else {
            const count = this.setTasksToShow(false)
            this.setState({tasksToShow: count})
        }
        
    }

  render () {
    return (
        <Layout>
            <Route 
            exact path='/' 
            render={(props) => <Home {... this.state} 
            toggleReminder={this.toggleReminder} 
            deleteTask={this.deleteTask} 
            toggleShowAdd={this.toggleShowAddTask} 
            toggleShowCompleted={this.toggleShowCompleted}
            addTask={this.addTask} 
            editTask={this.editTask}
            completeTask={this.completeTask} />} />
            <Route path='/about' component={About} />
        </Layout>
    );
  }
}

import React, { Component } from 'react';

export class AddTask extends Component {
    static displayName = AddTask.name;

    constructor(props) {
        super()
        this.state = {
            text: props.text,
            day: props.day,
            reminder: props.reminder
        }

    }

    setText = (text) => {
        this.setState({text: text})
    }

    setDay = (day) => {
        this.setState({ day: day })
    }

    setReminder = (value) => {
        this.setState({ reminder: value })
    }

    //Validates that the input string is a valid date formatted as "mm/dd/yyyy" from https://stackoverflow.com/questions/6177975/how-to-validate-date-with-format-mm-dd-yyyy-in-javascript
isValidDate = (dateString) => {

    //First check for the pattern
    if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
        return false;

    //Parse the date parts to integers
    const parts = dateString.split("/");
    const day = parseInt(parts[1], 10);
    const month = parseInt(parts[0], 10);
    const year = parseInt(parts[2], 10);

    //Check the ranges of month and year
    if (year < 1000 || year > 3000 || month < 1 || month > 12)
        return false;

    const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    //Adjust for leap years
    if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0))
        monthLength[1] = 29;

    //Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
};

    onSubmit = (e) => {
        e.preventDefault()

        if (!this.state.text) {
            alert("Please add a task")
            return
        }

        if (!this.isValidDate(this.state.day)) {
            alert("Please enter valid due date")
            return
        }

        if (this.props.formType === 'addTask') {

            this.props.onSubmit(this.state.text, this.state.day, this.state.reminder)

            this.setText('')
            this.setDay('')
            this.setReminder(false)
        }

        if (this.props.formType === 'editTask') {

            this.props.onSubmit(this.props.id, this.state.text, this.state.day, this.state.reminder)
            this.props.toggleForm()

        }


    }

    render() {
        return (
            <form className='add-form-custom' onSubmit={this.onSubmit}>
                <div className='form-control-custom'>
                    <label>Task</label>
                    <input type='text' placeholder='Enter a task' value={this.state.text} onChange={(e) => this.setText(e.target.value)}/>
                </div>
                <div className='form-control-custom'>
                    <label>Due date</label>
                    <input type='text' placeholder='Enter a due date (mm/dd/yyyy)' value={this.state.day} onChange={(e) => this.setDay(e.target.value)}/>
                </div>
                <div className='form-control-custom'>
                    <label>Set reminder</label>
                    <input type='checkbox' checked={this.state.reminder} value={this.state.reminder} onChange={(e) => this.setReminder(e.currentTarget.checked)} />
                </div>
                <input type='submit' value='Save task' className='btn btn-block' />
            </form>
        );
    }
}

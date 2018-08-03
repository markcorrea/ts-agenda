import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import moment from 'moment'

interface Schedule {
    _id?: string,
    name: string,
    description?: string,
    date: string,
}

interface EventObject {
    [key: string]: any
}

interface ModalScheduleProps extends React.Props<any> {
    closeModal: any
    saveClick: any,
    removeClick: any,
    editCompromise: any,
    calendarDate: any
}

@observer
export default class ModalSchedule extends React.Component<ModalScheduleProps, {}> {
    @observable schedule: Schedule
    @observable time: string
    date: string

    constructor(props: any) {
        super(props)
        this.schedule = { name: '', description: '', date: '' }
    }

    componentDidMount() {
        if (this.props.editCompromise) {
            this.schedule._id = this.props.editCompromise._id,
                this.schedule.name = this.props.editCompromise.name,
                this.schedule.description = this.props.editCompromise.description || '',
                this.time = moment(this.props.editCompromise.date).format('HH:mm')
            this.date = moment(this.props.editCompromise.date).format('YYYY-MM-DD')
        } else {
            this.date = moment(this.props.calendarDate).format('YYYY-MM-DD')
        }
    }

    timeChange = (event: EventObject) => {
        this.time = event.target.value
    }

    closeModal = () => {
        this.props.closeModal()
    }

    handleInputChange = (event: EventObject) => {
        let key = event.target.name
        let value = event.target.value

        switch (key) {
            case 'name':
                this.schedule.name = value
                break
            case 'description':
                this.schedule.description = value
                break
            case 'time':
                this.time = value
                break
            default:
                break
        }
        return
    }

    saveClick = () => {
        if (!this.schedule.name) {
            console.log('you have to insert a name')
            return
        }

        if (!this.time) {
            console.log('you have to select a time')
            return
        }

        this.schedule.date = moment(this.date).format('YYYY-MM-DD') + 'T' + this.time
        this.props.saveClick(this.schedule)
    }

    removeClick = () => {
        this.props.removeClick(this.props.editCompromise._id)
    }

    render() {
        return (
            <div className='modal-schedule-container'>
                <h1>Register new schedule</h1>
                <Grid container spacing={16}>
                    <Grid item xs={12}>
                        <div className='input-container'>
                            <div className='input-label'>Time</div>
                            <TextField
                                name='time'
                                type='time'
                                value={this.time || ''}
                                onChange={this.timeChange}
                                className='datepicker'
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div className='input-container'>
                            <div className='input-label'>Name</div>
                            <input type='text' name='name' value={this.schedule.name || ''} onChange={this.handleInputChange} />
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div className='input-container'>
                            <div className='input-label'>Description</div>
                            <textarea name='description' value={this.schedule.description || ''} onChange={this.handleInputChange}></textarea>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div className='input-container'>
                            <Button onClick={this.saveClick} className='btn btn-confirm' variant='contained'>Save</Button>
                            <Button onClick={this.closeModal} className='btn btn-cancel' variant='contained'>Cancel</Button>
                            {this.props.editCompromise && <Button onClick={this.removeClick} className='btn btn-delete' variant='contained'>Remove</Button>}
                        </div>
                    </Grid>
                </Grid>
            </div>
        )
    }
}
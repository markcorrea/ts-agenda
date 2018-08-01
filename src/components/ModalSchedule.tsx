import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import moment from 'moment'

interface Schedule {
    [key: string]: string
}

interface EventObject {
    [key: string]: any
}

@observer
export default class ModalSchedule extends React.Component<{}, {}> {
    defaultValue: string = '2017-05-24T10:30'
    @observable schedule: Schedule = { name: '', description: '', date: '' }

    constructor(props: any) {
        super(props)
        this.closeModal = props.closeModal
    }

    dateChange = (event: EventObject) => {
        this.schedule.date = event.target.value
        console.log('schedule', this.schedule)
    }

    closeModal = () => {

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
            case 'date':
                this.schedule.date = value
                break
            default:
                break
        }
        return
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
                                name='date'
                                type='datetime-local'
                                value={this.schedule.date || this.defaultValue}
                                onChange={this.dateChange}
                                defaultValue={this.defaultValue}
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
                            <input type='text' name='name' value={this.schedule.name} onChange={this.handleInputChange} />
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div className='input-container'>
                            <div className='input-label'>Description</div>
                            <textarea name='description' value={this.schedule.description} onChange={this.handleInputChange}></textarea>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div className='input-container'>
                            <Button className='btn btn-confirm' variant='contained'>Confirm</Button>
                            <Button className='btn btn-cancel' variant='contained'>Cancel</Button>
                        </div>
                    </Grid>
                </Grid>
            </div>
        )
    }
}
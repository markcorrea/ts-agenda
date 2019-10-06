import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import moment from 'moment'

interface Schedule {
  _id?: string
  name: string
  description?: string
  date: string
}

interface EventObject {
  [key: string]: any
}

interface ModalScheduleProps extends React.Props<any> {
  closeModal: any
  saveClick: any
  removeClick: any
  editCompromise: any
  calendarDate: any
}

@observer
export default class ModalSchedule extends React.Component<
  ModalScheduleProps,
  {}
> {
  @observable schedule: Schedule
  @observable time: string
  date: string

  constructor(props: any) {
    super(props)
    this.schedule = { name: '', description: '', date: '' }
  }

  componentDidMount() {
    let { schedule, time, date, props } = this

    if (this.props.editCompromise) {
      schedule._id = props.editCompromise._id
      schedule.name = props.editCompromise.name
      schedule.description = props.editCompromise.description || ''
      time = moment(props.editCompromise.date).format('HH:mm')
      date = moment(props.editCompromise.date).format('YYYY-MM-DD')
    } else {
      date = moment(props.calendarDate).format('YYYY-MM-DD')
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
    const { schedule, time, date, props } = this

    if (!schedule.name) {
      console.log('you have to insert a name')
      return
    }

    if (!time) {
      console.log('you have to select a time')
      return
    }

    schedule.date = moment(date).format('YYYY-MM-DD') + 'T' + time
    props.saveClick(schedule)
  }

  removeClick = () => {
    const { props } = this
    props.removeClick(props.editCompromise._id)
  }

  render() {
    const {
      time,
      timeChange,
      schedule,
      handleInputChange,
      saveClick,
      closeModal,
      removeClick,
      props,
    } = this

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
                value={time || ''}
                onChange={timeChange}
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
              <input
                type='text'
                name='name'
                value={schedule.name || ''}
                onChange={handleInputChange}
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className='input-container'>
              <div className='input-label'>Description</div>
              <textarea
                name='description'
                value={schedule.description || ''}
                onChange={handleInputChange}
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className='input-container'>
              <Button
                onClick={saveClick}
                className='btn btn-confirm'
                variant='contained'
              >
                Save
              </Button>
              <Button
                onClick={closeModal}
                className='btn btn-cancel'
                variant='contained'
              >
                Cancel
              </Button>
              {props.editCompromise && (
                <Button
                  onClick={removeClick}
                  className='btn btn-delete'
                  variant='contained'
                >
                  Remove
                </Button>
              )}
            </div>
          </Grid>
        </Grid>
      </div>
    )
  }
}

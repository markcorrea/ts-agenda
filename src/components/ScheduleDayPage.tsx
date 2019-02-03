import * as React from 'react'
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'
import Calendar from 'rc-calendar'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { Moment } from 'moment'
import moment from 'moment'
import Modal from 'react-responsive-modal'
import ModalSchedule from './ModalSchedule'
import { ScheduleController } from '../app/Schedule/ScheduleController'

@observer
export default class ScheduleDayPage extends React.Component<any, {}> {
  ScheduleController: ScheduleController
  dayDifference: number
  @observable calendarDate: Moment
  @observable mymodal: boolean = false
  @observable editCompromise: any

  constructor(props: any) {
    super(props)
    this.ScheduleController = props.ScheduleController
    this.dayDifference = props.dayDifference || 0
    this.calendarDate = moment(this.ScheduleController.currentDate).add(
      this.dayDifference,
      'days'
    )
  }

  @computed get todaySchedule() {
    let dayCompromises = this.ScheduleController.compromises.filter(
      (compromise: any) =>
        moment(compromise.date).format('DDMM') ===
        moment(this.ScheduleController.currentDate)
          .add(this.dayDifference, 'days')
          .format('DDMM')
    )
    return dayCompromises.sort(
      (a: any, b: any): number => {
        if (moment(a.date) > moment(b.date)) return 1
        if (moment(a.date) < moment(b.date)) return -1
      }
    )
  }

  @computed get updateCalendarDate() {
    return moment(this.ScheduleController.currentDate).add(
      this.dayDifference,
      'days'
    )
  }

  calendarClick = (date: Moment): void => {
    this.calendarDate = date
    this.ScheduleController.currentDate = moment(this.calendarDate).subtract(
      this.dayDifference,
      'days'
    )
  }

  handleCompromiseClick = (compromise: any = null) => {
    this.editCompromise = compromise
    this.mymodal = true
  }

  onCloseModal = () => {
    this.mymodal = false
  }

  prevMonth = () => {
    this.calendarDate = moment(this.calendarDate).subtract(1, 'months')
    this.ScheduleController.currentDate = moment(this.calendarDate).subtract(
      this.dayDifference,
      'days'
    )
  }

  nextMonth = () => {
    this.calendarDate = moment(this.calendarDate).add(1, 'months')
    this.ScheduleController.currentDate = moment(this.calendarDate).subtract(
      this.dayDifference,
      'days'
    )
  }

  onSaveClick = (clicked: any) => {
    this.mymodal = false
    if (clicked._id) {
      let index = this.ScheduleController.compromises.findIndex(
        (compromise: any) => compromise._id === clicked._id
      )
      this.ScheduleController.compromises[index] = clicked
    } else {
      this.ScheduleController.compromises.push(
        Object.assign({}, clicked, { _id: new Date().getTime().toString() })
      )
    }
  }

  onRemoveClick = (_id: string) => {
    let index = this.ScheduleController.compromises.findIndex(
      (compromise: any) => compromise._id === _id
    )
    this.ScheduleController.compromises.splice(index, 1)
    this.mymodal = false
  }

  render() {
    return (
      <div className='schedule-day-page'>
        <Grid container spacing={16}>
          <Grid className='daily-tile-left' item md={6}>
            <Grid container spacing={16}>
              <Grid className='schedule-day-container' item md={6}>
                <span className='schedule-current-day'>
                  {moment(this.ScheduleController.currentDate)
                    .add(this.dayDifference, 'days')
                    .format('DD')}
                </span>
              </Grid>
              <Grid className='schedule-day-container' item md={6}>
                <div className='schedule-month-container'>
                  <span className='schedule-current-month'>
                    {moment(this.ScheduleController.currentDate).format('MMMM')}
                  </span>
                  <br />
                  <span className='schedule-current-year'>
                    {moment(this.ScheduleController.currentDate).format('YYYY')}
                  </span>
                  <br />
                  <span className='schedule-current-year'>
                    {moment(this.ScheduleController.currentDate).format('dddd')}
                  </span>
                  <br />
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid className='daily-tile-right' item md={6}>
            <div className='month-navigator'>
              <div onClick={this.prevMonth} className='arrow left' />
              <div onClick={this.nextMonth} className='arrow right' />
            </div>
            <Calendar
              className='calendar'
              showDateInput={false}
              showToday={false}
              onSelect={this.calendarClick}
              value={this.updateCalendarDate}
            />
          </Grid>
        </Grid>
        <Grid container spacing={16}>
          <Grid className='appointments-container' item md={12}>
            <div className='appointments-content'>
              <ul>
                {this.todaySchedule.length < 1 && (
                  <li className='no-appointment-line'>
                    Não há compromissos registrados para hoje
                  </li>
                )}
                {this.todaySchedule.length > 0 &&
                  this.todaySchedule.map((compromise: any, index: number) => {
                    let btnColor
                    let newDate = new Date()
                    if (moment(compromise.date) < moment(newDate)) {
                      btnColor = 'past'
                    }

                    if (moment(compromise.date) > moment(newDate)) {
                      btnColor = 'future'
                    }
                    return (
                      <li
                        onClick={this.handleCompromiseClick.bind(
                          this,
                          compromise
                        )}
                        value={compromise}
                        key={'compromise.' + index}
                      >
                        <Button
                          className={
                            'appointment-status-button btn-' + btnColor
                          }
                          variant='contained'
                        >
                          {moment(compromise.date).format('HH:mm')}
                        </Button>
                        <div className='appointment-info'>
                          <span className='appointment a-title'>
                            {compromise.name}
                          </span>
                          <br />
                          <span className='appointment a-description'>
                            {compromise.description}
                          </span>
                        </div>
                      </li>
                    )
                  })}
                <li>
                  <div
                    onClick={this.handleCompromiseClick.bind(this, null)}
                    className='add-button'
                  >
                    +
                  </div>
                  <Modal
                    classNames={{ modal: 'modal' }}
                    showCloseIcon={false}
                    open={this.mymodal}
                    onClose={this.onCloseModal}
                    center
                  >
                    <ModalSchedule
                      saveClick={this.onSaveClick}
                      removeClick={this.onRemoveClick}
                      closeModal={this.onCloseModal}
                      editCompromise={this.editCompromise}
                      calendarDate={this.calendarDate}
                    />
                  </Modal>
                </li>
              </ul>
            </div>
          </Grid>
        </Grid>
      </div>
    )
  }
}

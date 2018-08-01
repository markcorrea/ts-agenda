import * as React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import Calendar from 'rc-calendar';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import { Moment } from 'moment';
import moment from 'moment'
import Modal from 'react-responsive-modal'
import ModalSchedule from './ModalSchedule'

@observer
export default class ScheduleDayPage extends React.Component<{}, {}> {
    @observable currentDate: Moment;
    @observable mymodal: boolean = false;

    componentDidMount() {
        let today: any = new Date()
        this.currentDate = moment(today)
    }

    selectClick = (date: Moment): void => {
        this.currentDate = date;
    }

    handleAddButtonClick = () => {
        this.mymodal = true;
    }

    onCloseModal = () => {
        this.mymodal = false;
    }

    render() {
        return (
            <div className='schedule-day-page'>
                <Grid container spacing={16}>
                    <Grid className='daily-tile-left' item md={6}>
                        <Grid container spacing={16}>
                            <Grid className='schedule-day-container' item md={6}>
                                <span className='schedule-current-day'>
                                    {moment(this.currentDate).format('DD')}
                                </span>
                            </Grid>
                            <Grid className='schedule-day-container' item md={6}>
                                <div className='schedule-month-container'>
                                    <span className='schedule-current-month'>
                                        {moment(this.currentDate).format('MMMM')}
                                    </span>
                                    <br />
                                    <span className='schedule-current-year'>
                                        {moment(this.currentDate).format('YYYY')}
                                    </span><br />
                                    <span className='schedule-current-year'>
                                        {moment(this.currentDate).format('dddd')}
                                    </span><br />
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid className='daily-tile-right' item md={6}>
                        <Calendar
                            className='calendar'
                            showDateInput={false}
                            showToday={false}
                            onSelect={this.selectClick}
                            value={this.currentDate}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={16}>
                    <Grid className='appointments-container' item md={12}>
                        <div className='appointments-content'>
                            <ul>
                                <li className='no-appointment-line'>Não há compromissos registrados para hoje</li>
                                <li>
                                    <Button className='appointment-status-button btn-past' variant='contained'>10:00</Button>
                                    <div className='appointment-info'>
                                        <span className='appointment a-title'>MARCIO DE MENDONÇA MANCINE DANTAS</span><br />
                                        <span className='appointment a-description'>Checkup | AMIL - Linha Dix / Lincx / Medial / Blue [Amil Básico]</span>
                                    </div>
                                </li>
                                {/* <li>
                                    <Button className='appointment-status-button btn-current' variant='contained'>10:00</Button>
                                    <div className='appointment-info'>
                                        <span className='appointment a-title'>MARCIO DE MENDONÇA MANCINE DANTAS</span><br />
                                        <span className='appointment a-description'>Checkup | AMIL - Linha Dix / Lincx / Medial / Blue [Amil Básico]</span>
                                    </div>
                                </li>
                                <li>
                                    <Button className='appointment-status-button btn-future' variant='contained'>10:00</Button>
                                    <div className='appointment-info'>
                                        <span className='appointment a-title'>MARCIO DE MENDONÇA MANCINE DANTAS</span><br />
                                        <span className='appointment a-description'>Checkup | AMIL - Linha Dix / Lincx / Medial / Blue [Amil Básico]</span>
                                    </div>
                                </li>
                                <li>
                                    <Button className='appointment-status-button btn-future' variant='contained'>10:00</Button>
                                    <div className='appointment-info'>
                                        <span className='appointment a-title'>MARCIO DE MENDONÇA MANCINE DANTAS</span><br />
                                        <span className='appointment a-description'>Checkup | AMIL - Linha Dix / Lincx / Medial / Blue [Amil Básico]</span>
                                    </div>
                                </li> */}
                                <li>
                                    <div onClick={this.handleAddButtonClick} className='add-button'>+</div>
                                    <Modal classNames={{modal: 'modal'}} showCloseIcon={false} open={this.mymodal} onClose={this.onCloseModal} center>
                                        <ModalSchedule closeModal={this.onCloseModal} />
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
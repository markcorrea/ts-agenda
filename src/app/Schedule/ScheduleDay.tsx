import * as React from 'react'
import { observable } from 'mobx'
import { inject, observer } from 'mobx-react'
import moment from 'moment'
import ScheduleDayPage from '../../components/ScheduleDayPage'
import Grid from '@material-ui/core/Grid'
import { ScheduleController } from './ScheduleController';
const userImage = require('../../media/images/userMarcus.jpg');

@inject('ScheduleController')
@observer
export default class ScheduleDay extends React.Component<{}, {}> {
    ScheduleController: ScheduleController

    constructor(props: any) {
        super(props)
        this.ScheduleController = props.ScheduleController
    }

    render() {
        return (
            <div>
                <Grid container className='grid-container'>
                    <Grid className='daily-tile-left' item md={6}>
                        <ScheduleDayPage {...this.props} />
                    </Grid>
                    <Grid className='daily-tile-right' item md={6}>
                        <ScheduleDayPage {...this.props} dayDifference={1} />
                    </Grid>
                </Grid>
            </div>
        )
    }
}
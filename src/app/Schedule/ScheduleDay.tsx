import * as React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import ScheduleDayPage from '../../components/ScheduleDayPage'
import Grid from '@material-ui/core/Grid'
const userImage = require('../../media/images/userMarcus.jpg');

@observer
export default class ScheduleDay extends React.Component<{}, {}> {
    render() {
        return (
            <div>
                <Grid container className='grid-container'>
                    <Grid className='daily-tile-left' item md={6}>
                        <ScheduleDayPage />
                    </Grid>
                    <Grid className='daily-tile-right' item md={6}>
                        <ScheduleDayPage />
                    </Grid>
                </Grid>
            </div>
        )
    }
}
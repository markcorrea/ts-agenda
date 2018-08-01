import * as React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

import ScheduleDay from './ScheduleDay'
import ScheduleWeek from './ScheduleWeek'
import ScheduleMonth from './ScheduleMonth'

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

@observer
class ScheduleContainer extends React.Component<{}, {}> {
    @observable tabIndex: number = 0

    constructor(props: any) {
        super(props)
    }

    handleTabChange = (event: any, value: number): void => {
        this.tabIndex = value
    }

    tabClass() {

    }

    render() {
        return (
            <div className={'schedule-container'}>
                <Tabs classes={{ indicator: 'big-indicator' }} value={this.tabIndex} onChange={this.handleTabChange}>
                    <Tab classes={{ root: 'tab-root', selected: 'tab-selected' }} label='Daily' />
                    <Tab classes={{ root: 'tab-root', selected: 'tab-selected' }} label='Weely' />
                    <Tab classes={{ root: 'tab-root', selected: 'tab-selected' }} label='Monthly' />
                </Tabs>
                <div className='tab-content'>
                    {this.tabIndex == 0 && <ScheduleDay />}
                    {this.tabIndex == 1 && <ScheduleWeek />}
                    {this.tabIndex == 2 && <ScheduleMonth />}
                </div>
                {/* <Button variant='raised' color='primary'>
                    Hello World
                </Button>
                <Grid container spacing={16}>
                    <Grid container justify="center">
                        {[0, 1, 2].map((value: number) => (
                            <Grid key={value} item>
                                texto aqui
                        </Grid>))}
                    </Grid>
                </Grid> */}
            </div>
        )
    }

}

export default ScheduleContainer
import * as React from 'react'
import { observable } from 'mobx'
import { observer, Provider } from 'mobx-react'

import { ScheduleController } from './ScheduleController'
import ScheduleDay from './ScheduleDay'
import ScheduleWeek from './ScheduleWeek'
import ScheduleMonth from './ScheduleMonth'

import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

@observer
class ScheduleContainer extends React.Component<{}, {}> {
    @observable tabIndex: number = 0
    ScheduleController: ScheduleController

    constructor(props: any) {
        super(props)
        this.ScheduleController = new ScheduleController()
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
                    <Provider ScheduleController={this.ScheduleController}>
                        <div>
                            {this.tabIndex == 0 && <ScheduleDay {...this.props} />}
                            {this.tabIndex == 1 && <ScheduleWeek />}
                            {this.tabIndex == 2 && <ScheduleMonth />}
                        </div>
                    </Provider>
                </div>
            </div>
        )
    }

}

export default ScheduleContainer
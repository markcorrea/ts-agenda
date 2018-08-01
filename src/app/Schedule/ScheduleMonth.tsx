import * as React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

@observer
export default class ScheduleMonth extends React.Component<{}, {}> {
    render() {
        return (
            <div>
                monthly
            </div>
        )
    }
}
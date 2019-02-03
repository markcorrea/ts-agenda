import * as React from 'react'
import { render } from 'react-dom'
import { observer } from 'mobx-react'
import './media/styles/main.scss'
import Header from './components/header'
import ScheduleContainer from './app/Schedule/ScheduleContainer'

@observer
class App extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <Header />
        <ScheduleContainer />
      </div>
    )
  }
}

render(<App />, document.getElementById('app'))

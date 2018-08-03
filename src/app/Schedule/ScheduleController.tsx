import { observable } from 'mobx'
import { Moment } from 'moment';
import moment from 'moment'

interface Compromise {
    name: string,
    description?: string,
    date: string
    [key: string]: string
}[]

export class ScheduleController {
    @observable monthRange: any
    @observable currentDate: Moment
    @observable compromises: Compromise[] = []

    constructor() {
        this.currentDate = moment(new Date())
        this.compromises = this.getCompromises()
        this.monthRange = this.getMonthRange()
    }

    getMonthRange = (): any => {
        let minimumMonth =  moment(new Date()).subtract(6, 'months')
        let range = []
        for (let i = 0; i < 12; i++) {
            range.push(moment(minimumMonth).add(1, 'months'))
        }
        return range
    }

    getCompromises = (): Compromise[] => {
        return [
            {
                _id: '1',
                name: 'Marcus Corrêa Coelho',
                description: 'Here goes the description of the compromise',
                date: '2018-08-02T18:00' 
            },
            {
                _id: '2',
                name: 'Rafael Adão',
                description: 'Here goes the description of the compromise',
                date: '2018-08-02T08:00' 
            },
            {
                _id: '3',
                name: 'Alex Oliveira dos Santos',
                description: 'Here goes the description of the compromise',
                date: '2018-08-02T07:00' 
            },
            {
                _id: '4',
                name: 'Pedro Henrique Corrêa Teixeira',
                description: 'Here goes the description of the compromise',
                date: '2018-08-03T11:00' 
            }
        ]
    }
}
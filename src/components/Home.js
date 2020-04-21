import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import CountryData from './CountryData'
import { Table } from 'reactstrap'

export class Home extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            covid_data: null,
            startDate: null
        }

        this.fetchData()
    }

    fetchData = async () =>  {

        try {
            const covid_data = await axios.get('https://pomber.github.io/covid19/timeseries.json')
            const {data} = covid_data
            const {startDate} = this.state

            const start_date = startDate ? startDate : moment().subtract(1, 'day').format('MM/DD/YYYY')

            console.log(start_date)

            let result  = [] 
            // eslint-disable-next-line
            Object.keys(data).map(key => {
            // eslint-disable-next-line
                data[key].map(item2 => {
                    item2.country = key  
                })
                
                result.push(data[key].pop())
            })

            
            this.setState({ 
                covid_data: result,
                startDate:start_date 
            })

        } catch (error) {   
            console.log(error)
        }
    }

    generetaTotalCases = () => {
        const { covid_data } = this.state
        return covid_data.map(data => <CountryData {...data} color={this.generateRandomColor(data.country)} />)
    }

    generateRandomColor = name => {
        let letters = 'BCDEF'.split('');
        let color = '#';
        for (let i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * letters.length)];
        }
        return color;
    }
    
    render() {
        const { covid_data, startDate } = this.state
        return (
            <>
             <h2 className="p-3">Covid-19 World Tracker as of {startDate} 12:00AM</h2>
        <Table responsive>
             <thead>
                <tr>
                    <th></th>
                    <th>
                        Country
                    </th>
                    <th>
                        Confirmed
                    </th>
                    <th>
                        Recovered</th>
                    <th>Death</th>
                </tr>
            </thead>
                
                <tbody>
                    {
                        covid_data  && this.generetaTotalCases()
                    }
                </tbody>
        </Table>
            </>
        )
    }

    
}

export default Home

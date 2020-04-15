import React, { PureComponent } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Text, Label} from 'recharts'

import moment from 'moment'

import axios from 'axios'

const data = null
// const data = [
//     { name: 'Page A', uv: 4000, pv: 2400, amt: 2400, },
//     { name: 'Page B', uv: 3000, pv: 1398, amt: 2210, },
//     { name: 'Page C', uv: 2000, pv: 9800, amt: 2290, },
//     { name: 'Page D', uv: 2780, pv: 3908, amt: 2000, },
//     { name: 'Page E', uv: 1890, pv: 4800, amt: 2181, },
//     { name: 'Page F', uv: 2390, pv: 3800, amt: 2500, },
//     { name: 'Page G', uv: 3490, pv: 4300, amt: 2100, },
// ];

const Checkbox = props => (
    <input type="checkbox" {...props} />
)

export default class CountryChart extends PureComponent {
    state = {
        log: false,
        data: null,
    }

    componentDidMount() {
        let {country} = this.props
        // console.log('mounted')
        axios.get(`https://corona.lmao.ninja/v2/historical/${country}?lastdays=300`)
        .then(res => {
            const {timeline} = res.data;
            // console.log('result: ' + JSON.stringify(timeline, null, 2))
            let {cases, deaths, recovered} = timeline
            
            let dates = Object.keys(cases)
            // let dates = Object.keys(cases).map((s)=>moment(s))
            
            let fix = x => x == 0? 0.1 : x

            let data = dates.map((d)=>{
                let m = moment(d)
                let xcases = fix(cases[d])
                let xdeaths = fix(deaths[d])
                let xrecovered = fix(recovered[d])
                let xill = fix(cases[d] - (deaths[d] + recovered[d]))
                // if(xcases == 0) xcases = 0.1
                // console.log('cases: ' + xcases)
                // let xcases = cases[d]
                return { name: m.format('DD/MM'), cases: xcases, deaths: xdeaths, recovered: xrecovered, ill: xill}
            })

            // console.log(JSON.stringify(data, null, 2))
            this.setState({ data });
        })
    }

    handleCheckboxChange(event) {
        console.log('value: ' + event.target.checked)
        this.setState({ log: event.target.checked })
    }

    render() {
        // let last = this.state.data[this.state.data.length-1]
        let last = this.state.data? this.state.data[this.state.data.length-1] : {}

        return <div>
            <div>
                <div>{this.props.country} {last.name}: {last.cases} / {last.deaths} / {last.recovered}</div>
                <div>LOG
                <Checkbox 
                    checked={this.state.log}
                    onChange={this.handleCheckboxChange.bind(this)}
                /></div>
            </div>
            <LineChart width={500} height={300} data={this.state.data} margin={{ top: 5, right: 30, left: 20, bottom: 5, }} >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" label={{ value: this.props.country, position: 'insideBottomRight', offset: -20 }} >
            </XAxis>
            {this.state.log? 
                <YAxis scale="log" domain={[0.1, 'auto']}  /> 
                : 
                <YAxis >
                {/* <Text position='insideTopRight' value="CASES" offset={20}/> */}

                </YAxis>
            }
            <Tooltip />
            {/* <Text x={100} y={100} width={200} textAnchor="middle" scaleToFit={true}>Hello</Text> */}
            {/* <Text width={200} textAnchor="middle" scaleToFit={true}>Hello</Text> */}
            <Legend  />
            <Line type="basis" dataKey="cases" dot={false} stroke="blue"  />
            <Line type="monotone" dataKey="ill" dot={false} stroke="magenta" />
            <Line type="monotone" dataKey="deaths" dot={false} stroke="red" />
            <Line type="monotone" dataKey="recovered" dot={false} stroke="green" />
            {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
            <div>Hello</div>
        </LineChart>
        </div>
    }
}

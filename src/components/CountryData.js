import React, { Component } from 'react';
import {GetCountryCode} from './CountryCode';

export class CountryData extends Component {

    getFlag = str => {
        str = str.replace(/^\s+|\s+$/g, ''); // trim
       
        
        var cd = GetCountryCode(str);


        return `https://www.countryflags.io/${cd}/flat/64.png`
        
        
    }

    render() {
        const {country, confirmed, recovered, deaths, color} = this.props

        const card  = {
            backgroundColor: color
        }

        const confirm = {
            color: "blue"
        }

        const death = {
            color: "red"
        }

        const recover = {
            color: "green"
        }

        return (
                <tr style={card}>
                    <td>
                        <img className="mb-2" src={this.getFlag(country)} alt={country} width="30" />
                    </td>
                    <td>{country}</td>
                    <td style={confirm}><b>{new Intl.NumberFormat().format(confirmed)}</b></td>
                    <td style={death}><b>{new Intl.NumberFormat().format(recovered)}</b></td>
                    <td style={recover}><b>{new Intl.NumberFormat().format(deaths)}</b></td>
                </tr> 
        )
    }
}

export default CountryData

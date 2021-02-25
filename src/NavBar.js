import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Nav extends Component {
    render() {
        return (
            <nav>
                <Link to='/'>
                    Home
                </Link>
                <Link to='/details/1'>
                    Detail
                </Link>
                <Link to='/add'>
                    Add New
                </Link>
            </nav>
        )
    }
}

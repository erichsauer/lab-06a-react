import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'

export default withRouter(class Nav extends Component {
    render() {
        return (
            <nav>
                {this.props.location.pathname !==
                    '/' &&
                    <NavLink
                        exact
                        to="/">
                        Home
                    </NavLink>
                }
                {this.props.location.pathname !==
                    '/list' &&
                    <NavLink
                        exact
                        to="/list">
                        Item List
                    </NavLink>
                }
                {this.props.location.pathname !==
                    '/add' &&
                    <NavLink
                        exact
                        to="/add">
                        Add New
                    </NavLink>
                }
            </nav>
        )
    }
})

import React, { Component } from 'react'

export default class HomePage extends Component {
    render() {
        return (
            <section className="main-section">
                <img className="header-image" src="https://erichsauer.github.io/lab-06-static-product-page/assets/images/main-header.jpg" alt='header flower'/>
                <h2 className="page-title">
                    Flower<br />Shop
                </h2>
            </section>
        )
    }
}

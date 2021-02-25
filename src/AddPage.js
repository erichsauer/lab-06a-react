import React, { Component } from 'react'
import Form from './Form'
import { getCategories, newPlant } from './api-utils';
import { Link } from 'react-router-dom';

export default class AddPage extends Component {
    state = {
        name: '',
        description: '',
        image: '',
        price: '',
        fragrant: false,
        category: '',
        loading: false,
        categories: []
    }

    componentDidMount = async () => {
        await this.loadCategories()
    }

    loadCategories = async () => {
        await this.setState({
            loading: true
        })

        const data = await getCategories()

        await this.setState({
            categories: data,
            loading: false
        })
    }

    handleName = (e) => {
        this.setState({
            name: e.target.value
        })
    }
    
    handleDescription = (e) => {
        this.setState({
            description: e.target.value
        })
    }

    handleImage = (e) => {
        this.setState({
            image: e.target.value
        })
    }

    handlePrice = (e) => {
        this.setState({
            price: e.target.value
        })
    }

    handleFragrant = (e) => {
        this.setState({
            fragrant: e.target.checked
        })
    }

    handleCategory = (e) => {
        this.setState({
            category: e.target.value
        })
    }

    handleAdd = async () => {
        const body = {
            name: this.state.name,
            description: this.state.description,
            image: this.state.image,
            price: this.state.price,
            fragrant: this.state.fragrant,
            category_id: this.state.category
        }

        await newPlant(body)

        this.setState({
            name: '',
            description: '',
            image: '',
            price: '',
            fragrant: false,
            category: '',
            })
    }

    render() {
        return (
            <section>
                <h2>
                    Add New Item
                </h2>
                <Form
                    state={this.state}
                    handleName={this.handleName}
                    handleDescription={this.handleDescription}
                    handleImage={this.handleImage}
                    handlePrice={this.handlePrice}
                    handleFragrant={this.handleFragrant}
                    handleCategory={this.handleCategory} />
                <div className='buttons-container'>
                    <Link to={'/'}><h3>🙅‍♀️</h3></Link>
                    <Link to={'/'}><h3 onClick={this.handleAdd}>✔</h3></Link>
                </div>
            </section>
        )
    }
}

import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { getPlant, getPlants } from './api-utils';

export default class DetailPage extends Component {
    state = {
        plant: {},
        id: 0,
        loading: '',
        numberPlants: 0,
        idIndex: 0,
        idsArray: []
    }
    
    componentDidMount = async () => {
        await this.loadPlant();
    }
    
    loadPlant = async () => {
        this.setState({
            loading: true,
        });
        
        const plants = await getPlants();
        const params = Number(this.props.match.params.id)
        const idsArray = plants.map(plant => plant.id)
        const id = !idsArray.find(id => id === params) ? 1 : params
        const plant = await getPlant(id);

        await this.setState({ 
            id: id,
            numberPlants: plants.length,
            idsArray: idsArray,
            idIndex: idsArray.indexOf(id),
            loading: false,
            plant: plant,
        });
    }
    
    handlePrev = async () => {
        await this.setState({
            idIndex: this.state.idsArray.indexOf(this.state.id) - 1,
        })
        await this.setState({
            id: this.state.idsArray[this.state.idIndex]
        })

        this.props.history.push(`/details/${this.state.id}`)
        await this.loadPlant();
    }
    
    handleNext = async () => {
        await this.setState({
            idIndex: this.state.idsArray.indexOf(this.state.id) + 1,
        })
        await this.setState({
            id: this.state.idsArray[this.state.idIndex]
        })
        
        this.props.history.push(`/details/${this.state.id}`)
        await this.loadPlant();
    }

    render() {
        console.log(this.state, this.state.idsArray.indexOf(3))
        return (
            <section className='container'>
                <div className='button-div'>
                    <button
                        disabled={this.state.id === 1}
                        onClick={this.handlePrev}>
                        {`<<`}
                    </button>
                    <button
                        disabled={this.state.id === Math.max.apply(null, this.state.idsArray)}
                        onClick={this.handleNext}>
                        {`>>`}
                    </button>
                </div>
                <h2 className='name'>
                    {this.state.plant.name}
                </h2>
                <img src=
                    // 'http://placekitten.com/300'
                    {this.state.plant.image}
                    className="App-logo" alt="plant" />
                <div className='description'>
                    {this.state.plant.description}
                </div>
                <div className='fragrant'>
                    {this.state.plant.fragrant}
                </div>
                <div className='safety'>
                    Category: {this.state.plant.category}
                </div>
                <div className='price'>
                    €{this.state.plant.price}
                </div>
                <Link to={'/edit/' + this.state.plant.id}><h3>Edit Item</h3></Link>
                <Link to={'/'}><h3>Back To List</h3></Link>
            </section>
        )
    }
}

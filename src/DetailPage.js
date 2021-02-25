import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { getPlant, getPlants } from './api-utils';
import Spinner from './Spinner'

export default class DetailPage extends Component {
    state = {
        plant: {},
        id: 0,
        loading: '',
        numberPlants: 0,
        idIndex: 0,
        largestId: 0,
        smallestId: 0,
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
        const largestId = Math.max(...idsArray)
        const smallestId = Math.min(...idsArray)

        await this.setState({ 
            id: id,
            numberPlants: plants.length,
            idsArray: idsArray,
            idIndex: idsArray.indexOf(id),
            loading: false,
            largestId: largestId,
            smallestId: smallestId,
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

        this.props.history.push(`/list/${this.state.id}`)
        await this.loadPlant();
    }
    
    handleNext = async () => {
        await this.setState({
            idIndex: this.state.idsArray.indexOf(this.state.id) + 1,
        })
        await this.setState({
            id: this.state.idsArray[this.state.idIndex]
        })
        
        this.props.history.push(`/list/${this.state.id}`)
        await this.loadPlant();
    }

    render() {
        console.log(this.state, this.state.idsArray.indexOf(3))
        return (
            <section className='container'>
                <div className='buttons-container'>
                <button
                        className='nav-arrows'
                        disabled={this.state.id === this.state.smallestId}
                        onClick={this.handlePrev}>
                        ↞
                    </button>
                <div className="tooltip">
                    <span className="tooltiptext">Back To List</span>
                    <Link to={'/list'}><h3>🪴</h3></Link>
                </div>
                <div className="tooltip">
                    <span className="tooltiptext">Edit Item</span>
                    <Link to={'/edit/' + this.state.plant.id}><h3>📝</h3></Link>
                </div>
                <button
                        className='nav-arrows'
                        disabled={this.state.id === this.state.largestId}
                        onClick={this.handleNext}>
                        ↠
                    </button>
                </div>
                {this.state.loading ? <Spinner /> :
                    <div>
                        <h2 className='name'>
                            {this.state.plant.name}
                        </h2>
                        <img src=
                            {this.state.plant.image}
                            className="plant-image" alt="plant" />
                        <div className='description'>
                            {this.state.plant.description}
                        </div>
                        <div className='safety'>
                            Fragrant? {this.state.plant.fragrant ? 'yes' : 'no'}
                        </div>
                        <div className='safety'>
                            Category: {this.state.plant.category}
                        </div>
                        <div className='price'>
                            €{this.state.plant.price}
                        </div>
                    </div>}
            </section>
        )
    }
}

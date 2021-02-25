import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { getPlants } from './api-utils.js'
import Spinner from './Spinner'

export default class List extends Component {
    state = {
        plants: [],
        loading: false
    }

    componentDidMount = async () => {
        await this.loadPlants();
        console.log('mounted')
    }
    
    loadPlants = async () => {  
    this.setState({ 
        loading: true,
    });
    // sends request to pokemon api and awaits pokemon list load!
    // (superagent must be installed)
    const data = await getPlants();
    
    // set state.loading to false for loading spinner display end
        console.log('data:', data)
    this.setState({ 
        loading: false,
        plants: data,
    });
    }
    
    render() {
        console.log(this.state);
        const renderedPlants = this.state.plants.map(plant => {
            return <Link key={plant.id} to={`/list/${plant.id}`}>
                <div className='list-item-container'>
                    <img
                        src={plant.image}
                        alt='plant'
                        className='list-image'/>
                    <p className='list-item'>{plant.name}</p>
                </div>
            </Link>
        })
        return (
            <section>
                <h1>Inventory</h1>
                {this.state.loading ? <Spinner /> :
                <div className='list-container'>
                    {renderedPlants}
                </div>}
            </section>
        )
    }
}

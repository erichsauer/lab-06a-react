import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { getPlants } from './api-utils.js'

export default class List extends Component {
    state = {
        plants: [],
        loading: false
    }

    componentDidMount = async () => {
        await this.loadPlants();
        console.log(this.state)
    }
    
    loadPlants = async () => {  
    this.setState({ 
        loading: true,
    });
    // sends request to pokemon api and awaits pokemon list load!
    // (superagent must be installed)
    const data = await getPlants();
    
    // set state.loading to false for loading spinner display end
    this.setState({ 
        loading: false,
        plants: data,
    });
    }
    
    render() {
        console.log(this.state);
        const renderedPlants = this.state.plants.map(plant => {
            return <Link key={plant.id} to={`/details/${plant.id}`}>
                <p className='list-item'>{plant.name}</p>
            </Link>
        })
        return (
            <section>
                <h1>A Modest List of Special Plants</h1>
            {renderedPlants}
            </section>
        )
    }
}

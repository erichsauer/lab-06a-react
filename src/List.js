import React, { Component } from 'react'
import request from 'superagent';
import { Link } from 'react-router-dom';

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
    const data = await request.get(`https://arcane-falls-19139.herokuapp.com/plants`);
    
    // set state.loading to false for loading spinner display end
    this.setState({ 
        loading: false,
        plants: data.body,
    });
    }
    
    render() {
        const renderedPlants = this.state.plants.map(plant => {
            return <Link key={plant.id} to={`/${plant.id}`}>
                <p className='list-item'>{plant.name}</p>
            </Link>
        })
        return (
            <div className='list'>
                <h1>A Modest List of Special Plants</h1>
            {renderedPlants}
            </div>
        )
    }
}

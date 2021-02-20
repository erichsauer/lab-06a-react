import React, { Component } from 'react'
import request from 'superagent';
import { Link } from 'react-router-dom';

export default class Detail extends Component {
    state = {
        plant: {},
        id: 1,
        loading: false
    }

    componentDidMount = async () => {
        await this.loadPlant();
    }
    
    loadPlant = async () => {  
        await this.setState({ 
            loading: true,
            id: Number(this.props.match.params.id)
    });
    // sends request to pokemon api and awaits pokemon list load!
    // (superagent must be installed)
    const data = await request.get(`https://lab-06a-node.herokuapp.com/plants/${this.state.id}`);
    
    // set state.loading to false for loading spinner display end
    this.setState({ 
        loading: false,
        plant: data.body.results,
    });
    }
    
    handlePrev = async () => {
        this.props.history.push(`/${this.state.id - 1}`)
        await this.setState({
            id: Number(this.props.match.params.id)
        })
        await this.loadPlant();
    }
    
    handleNext = async () => {
        this.props.history.push(`/${this.state.id + 1}`)
        await this.setState({
            id: Number(this.props.match.params.id)
        })
        await this.loadPlant();
    }

    render() {
        console.log(this.state)
        return (
            <main className='container'>
                <div className='button-div'>
                    <button disabled={this.state.id === 1} onClick={this.handlePrev}>Previous</button>
                    <button
                        disabled={this.state.id === 6} onClick={this.handleNext}>Next</button>
                    </div>
                <h2 className='name'>{this.state.plant.name}</h2>
                <img src={this.state.plant.image} className="App-logo" alt="logo" />
                <div className='description'>{this.state.plant.description}</div>
                <div className='fragrant'>{this.state.plant.fragrant}</div>
                <div className='safety'>{this.state.plant.safetyNotes}</div>
                <div className='price'>€{this.state.plant.price}</div>
                <Link to={'/'}><h3>Back To List</h3></Link>
            </main>
        )
    }
}

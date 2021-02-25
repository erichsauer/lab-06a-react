import React, { Component } from 'react'
import Form from './Form'
import { deletePlant, getCategories, getPlant, getPlants, updatePlant } from './api-utils';
import { Link } from 'react-router-dom';

export default class AddPage extends Component {
    state = {
        id: 0,
        name: '',
        description: '',
        image: '',
        price: '',
        fragrant: false,
        category: '',
        loading: false,
        categories: [],
        idIndex: 0,
        largestId: 0,
        smallestId: 0,
        idsArray: [],
        numberPlants: 0,
    }

    componentDidMount = async () => {
        await this.loadPlant()
    }

    loadPlant = async () => {
        await this.setState({
            loading: true
        })

        const plants = await getPlants();
        const params = Number(this.props.match.params.id)
        const idsArray = plants.map(plant => plant.id)
        const id = !idsArray.find(id => id === params) ? 1 : params
        const categories = await getCategories()
        const plant = await getPlant(id)
        const largestId = Math.max(...idsArray)
        const smallestId = Math.min(...idsArray)

        await this.setState({
            id: id,
            name: plant.name,
            description: plant.description,
            image: plant.image,
            price: plant.price,
            fragrant: plant.fragrant,
            category: plant.category_id,
            loading: false,
            categories: categories,
            numberPlants: plants.length,
            idsArray: idsArray,
            largestId: largestId,
            smallestId: smallestId,
            idIndex: idsArray.indexOf(id)
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

    handleCategory = (e) => {
        this.setState({
            category: e.target.value
        })
    }

    handlePrev = async () => {
        await this.setState({
            idIndex: this.state.idsArray.indexOf(this.state.id) - 1,
        })
        await this.setState({
            id: this.state.idsArray[this.state.idIndex]
        })

        this.props.history.push(`/edit/${this.state.id}`)
        await this.loadPlant();
    }
    
    handleNext = async () => {
        await this.setState({
            idIndex: this.state.idsArray.indexOf(this.state.id) + 1,
        })
        await this.setState({
            id: this.state.idsArray[this.state.idIndex]
        })
        
        this.props.history.push(`/edit/${this.state.id}`)
        await this.loadPlant();
    }

    handleUpdate = async () => {
        const body = {
            name: this.state.name,
            description: this.state.description,
            image: this.state.image,
            price: this.state.price,
            fragrant: this.state.fragrant,
            category_id: this.state.category
        }

        await updatePlant(this.state.id, body)

        this.setState({
            id: Number(this.props.match.params.id),
            name: '',
            description: '',
            image: '',
            price: '',
            fragrant: false,
            category: '',
            loading: false,
            categories: []
            })
    }

    handleDelete = async (e) => {
        await deletePlant(this.state.id)
        await this.props.history.push('/list')
    }

    render() {
        return (
            <section>
                <div className='button-div'>
                    <button
                        className='nav-arrows'
                        disabled={this.state.id === this.state.smallestId}
                        onClick={this.handlePrev}>
                        ↞
                    </button>
                    <div className="tooltip">
                    <span className="tooltiptext">Back To Item</span>
                    <Link to={'/list/' + this.state.id}><h3>🌸</h3></Link>
                </div>
                    <button
                        className='nav-arrows'
                        disabled={this.state.id === this.state.largestId}
                        onClick={this.handleNext}>
                        ↠
                    </button>
                </div>
                <h2>
                    Edit Item
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
                <div className="tooltip">
                    <span className="tooltiptext">Delete Item</span>
                    <button onClick={this.handleDelete}>🗑</button>
                </div>
                <div className="tooltip">
                    <span className="tooltiptext">Edit Item</span>
                    <Link to={'/list/' + this.state.id}><h3 onClick={this.handleUpdate}>✔</h3></Link>
                </div>

                </div>
            </section>
        )
    }
}

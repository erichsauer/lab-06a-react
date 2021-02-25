import React, { Component } from 'react'

export default class Form extends Component {
    render() {
        console.log(this.props.state)
        const options = this.props.state.categories.map(
            category => <option value={category.id}>{category.name}</option>
        )
        return (
            <form>
                <input
                    placeholder='Plant Name'
                    className='form-element'
                    type='text'
                    onChange={this.props.handleName}
                    value={this.props.state.name}/>
                <textarea
                    className='description-input'
                    placeholder='Description'
                    rows='4'
                    onChange={this.props.handleDescription}
                    value={this.props.state.description}/>
                <input
                    placeholder='Image URL'
                    className='form-element'
                    type='url'
                    onChange={this.props.handleImage}
                    value={this.props.state.image} />
                <div>
                    <label>
                        €
                        <input
                            className='form-price'
                            placeholder='Price'
                            type='number'
                            onChange={this.props.handlePrice}
                            value={this.props.state.price} />
                    </label>
                    <label>
                        Fragrant?
                        <input
                            type='checkbox'
                            onChange={this.props.handleFragrant}
                            checked={this.props.state.fragrant}
                            />
                    </label>
                </div>
                <select
                    value={this.props.state.category}
                    className='form-element'
                    onChange={this.props.handleCategory}>
                    <option value=''>Select</option>
                    {options}
                </select>
            </form>
)
    }
}

import request from 'superagent';

const URL = 'https://arcane-falls-19139.herokuapp.com'

export async function getCategories() {
    const { body } = await request.get(`${URL}/categories`)

    return body;
}

export async function getPlants() {
    const { body } = await request.get(`${URL}/plants`)

    return body.sort((a, b) => {
        return a.id - b.id;
    });
}    

export async function getPlant(id) {
    const { body } = await request.get(`${URL}/plants/${Number(id)}`)

    return body;
}

export async function newPlant(plant) {
    const { body } = await request.post(`${URL}/plants`)
        .send(plant)
    
    return body;
}

export async function deletePlant(id) {
    const { body } = await request.delete(`${URL}/plants/${Number(id)}`)
    
    return body;
}

export async function updatePlant(id, plant) {
    const { body } = await request.put(`${URL}/plants/${Number(id)}`)
        .send(plant)
    
    return body;
}


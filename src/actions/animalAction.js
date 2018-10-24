import axios from 'axios';

import { ADD_NEW_ANIMAL, GET_ANIMALS } from './types';

const URL = 'http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site13/ProjectWebService.asmx'

// Create New Animal
export const createAnimal = (data) => dispatch => {
    axios.post(`${URL}/PostNewAnimal`,{
        email: data.email,
        name:data.name,
        type: data.type,
        breed: data.breed,
        color: data.color,
        sex: data.sex,
        age: data.age,
        size: data.size,
        aboutMe: data.aboutMe,
        photoURL: data.photoURL,
        location: data.location
    }).then(res => console.log("Result")).catch(err => console.log(err));
}

export const deleteAnimal = postId => {
    axios.post(`${URL}/DeleteAnimal`, {
        postId: postId
    })
    .then(res => console.log('Result', res.data.d))
    .catch(err => console.log(err));
}


// GET ALL ANIMAL
export const getAnimals = (email) => dispatch => {
  axios.post(`${URL}/GetAllAnimals`,{
      email: email
  }).then(res => {
      //console.log(res.data.d)
      dispatch({
          type:GET_ANIMALS,
          payload: JSON.parse(res.data.d)
      })
  }).catch(err => console.log(err))
}

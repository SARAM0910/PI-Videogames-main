export function validationCreateForm (input){
    let errors={}
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/; // regex de una url valida
    const ratingRegex = /^\d+(\.\d{1,2})?$/ // regex de un entero y dos decimales 
    const releasedRegex = /^\d{4}-\d{2}-\d{2}$/ // regex de formato AAAA-MM-DD

    const image = input.image
    const released = input.released
    const rating = input.rating


    if(!input.name){
        errors.name ='Name required'
    }

    if(!input.description){
        errors.description ='Description required'
    }

    if(!input.image){
        errors.image ='Url image required'
    }

    if(!input.released){
        errors.released = 'Released required'
    }

    if(!input.rating){
        errors.rating='Rating required'
    }

    if(input.genre.length === 0){
        errors.genre='Select at least one genre'
    }

    if(input.platform.length === 0){
        errors.platform = 'Select at least one platform'
    }

    if(input.name && input.name.length>40){
        errors.name = 'The name has more than 40 characters'
    }
    
    if(input.description && input.description.length>150){
        errors.description='The description more than 150 characters'
    }

    if(!urlRegex.test(image)){
              errors.image='The URL is not valid'
    }

    if(!releasedRegex.test(released)){
        errors.released='Please enter in format YYYY-MM-DD'
    }

    if(rating>10){
        errors.rating='Rating not valid'
    }

    if(rating<10 && !ratingRegex.test(rating) ){
        errors.rating='Rating not valid'
    }

    if(input.genre.length>5){
        errors.genre='Indicate maximum 5 genres '
    }

    if(input.platform.length>5){
        errors.platform='Indicate maximum 5 platforms '
    }
    return errors

}
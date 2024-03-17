const apiURL = 'http://localhost:3001'

export default class ColorAPI {

    static fetchColors() {
        // You can configure a delay on the API if you 
        // want to see what happens if the server is slow.
        return fetch(`${apiURL}/colors?delay=750`).then(response => {
            return response.json()
        })
    }

    static addColor(color) {
        const options = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify(color)
        }
        console.log('Attempting to post new color')
        console.log(color)

        return fetch(`${apiURL}/colors/`, options).then(async response => {
            if (response.ok) {
                console.log("Response was ok")
                return response.json()
            } else {
                console.log("There was a error")
                throw new Error(`Problem with POST:  ${(await response.json()).message}`)
            }
        })
    }

    static modifyColor(color) {

        console.log("About to modify")
        console.log(color)
        if (!color.id) {
            throw new Error("color must have a primary key to update")            
        }

        // only send the data that may be updated
        let colorUpdates = {
            id: color.id,
            color: color.color,
            title: color.title,
            rating: color.rating
        }
        
        const options = {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify(colorUpdates)
        }
        console.log('Attempting to post modification to color')
        console.log(color)

        return fetch(`${apiURL}/colors/${color.id}`, options).then(async response => {
            if (response.ok) {
                console.log("Response was ok")
                return response.json()
            } else {
                console.log("There was a error")
                throw new Error(`Problem with POST:  ${(await response.json()).message}`)
            }
        })
    }
}
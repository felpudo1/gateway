const axios = require('axios').default;


const main = async () => {
    try {

        let { data } = await axios.get(
            "https://api.insertmendoza.com.ar/"
        )

        console.log(data)

    } catch (error) {
        console.log(error.toString())
    }
}

main()
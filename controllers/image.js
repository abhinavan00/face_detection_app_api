const handleAPICall = (req, res) => {
    const { input } = req.body;
    // Your PAT (Personal Access Token) can be found in the Account's Security section
    const PAT = '091936aecf6f442ca1cc54659d97fe38';
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = 'abhinavan00';       
    const APP_ID = 'face-detection_01';
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = 'face-detection';   
    const IMAGE_URL = input;

    ///////////////////////////////////////////////////////////////////////////////////
    // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
    ///////////////////////////////////////////////////////////////////////////////////

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

    fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/outputs", requestOptions)
        .then(response => response.json())
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(400).json('Unable to work with API');
        });
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0].entries)
        })
        .catch(err => res.status(400).json('Unable to update entries'))
}

export { handleImage, handleAPICall };
const GRAPHQL_URL = 'http://localhost:9000/'

function fetchGreeting() {
    fetch(GRAPHQL_URL, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            query: `
                query {
                    greeting
                }
            `
        })
    })
}
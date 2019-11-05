class Fetch {

    constructor() {
        this.apiUrl = process.env.REACT_APP_API_URL;
    }

    getHeaders(token = null) {
        return {
            'Content-Type': 'application/json',
            'x-api-key': `${token !== null ? token : localStorage.getItem('token')}`,
        };
    }

    getUrl(url) {
        return `${this.apiUrl}${url}`;
    }

    async checkToken() {
        /*const live = new Date(localStorage.getItem('refresh_live'))
        const now = new Date();*/
    }

    async execute(result, url) {
        const json = await result.json();
        if (result.status >= 200 && result.status < 300) {
            return json;
        } else {
            /*if (result.status === 401)
                window.location.href = '/login'
            else throw json['error'];*/
        }
    }

    async get(url, token = null) {
        const result = await fetch(`${this.apiUrl}${url}`, {
            method: 'GET',
            headers: this.getHeaders(token),
        });
        return this.execute(result, url);
    }

    async post(url, body, token = null) {
        const result = await fetch(`${this.apiUrl}${url}`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: this.getHeaders(token),
        });
        return this.execute(result, url);
    }

    async postForm(url, body, token = null) {
        const result = await fetch(`${this.apiUrl}${url}`, {
            method: 'POST',
            body: body,
            headers: {
                'x-api-key': `${localStorage.getItem('token')}`,
            },
        });
        return this.execute(result, url);
    }

    async put(url, body, token = null) {
        const result = await fetch(`${this.apiUrl}${url}`, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: this.getHeaders(token),
        });
        return this.execute(result, url);
    }

    async del(url) {
        const result = await fetch(`${this.apiUrl}${url}`, {
            method: 'DELETE',
            headers: this.getHeaders(),
        });
        return this.execute(result, url);
    }
}

export default new Fetch();
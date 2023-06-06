//console.log(window.location.hostname.includes('localhost'));
const form = document.querySelector('form');

const url = window.location.hostname.includes('localhost')
    ? 'http://localhost:8080/api/auth/'
    : 'http://curso-node-restserver-production-2b06.up.railway.app/api/auth/';


form.addEventListener('submit', ev => {
    ev.preventDefault();

    const formData = {};

    for (let el of form.elements) {
        if (el.name.length) {
            formData[el.name] = el.value;
        }
    }

    // console.log(formData);

    fetch(url + 'login', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {'Content-Type': 'application/json'}
    })
    .then(resp => resp.json())
    .then(({message,token}) => {
        if (message) {
            return console.error(message);
        }

        localStorage.setItem('token',token);
        window.location = 'chat.html'
    })
    .catch(err => console.log(err));
});

function handleCredentialResponse(response) {
    // const url = `${window.location.origin}/api/auth/google`;
    const body = {id_token: response.credential};

    // Google Token
    // console.log(response.credential);
    // fetch('http://localhost:8080/api/auth/google', {
    fetch(url + 'google', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
        .then(resp => resp.json())
        .then(({token}) => {
            //console.log(token);
            localStorage.setItem('token',token);
            window.location = 'chat.html'
        })
        .catch(console.warn);
}

const button = document.getElementById('google_sign_out');
button.onclick = () => {
    console.log(google.accounts.id);
    google.accounts.id.disableAutoSelect();
    google.accounts.id.revoke(localStorage.getItem('email'),
    done =>{
        localStorage.clear();
        location.reload();
    });
};
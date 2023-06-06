const url = window.location.hostname.includes('localhost')
    ? 'http://localhost:8080/api/auth/'
    : 'http://curso-node-restserver-production-2b06.up.railway.app/api/auth/';

let user = null;
let socket = null;

const txtUid = document.querySelector('#txtUid');
const txtMensaje = document.querySelector('#txtMensaje');
const ulUsuarios = document.querySelector('#ulUsuarios');
const ulMensajes = document.querySelector('#ulMensajes');
const btnSalir = document.querySelector('#btnSalir');

/* btnSalir.addEventListener('click', (event) => {
    // console.log(event);
    window.location = 'index.html';
    localStorage.clear();

    disconnectSocket();
}); */

txtMensaje.addEventListener('keyup',({keyCode}) =>{
    if(keyCode!=13){return;}

    const message = txtMensaje.value;
    const uid = txtUid.value;

    if (message.length === 0) { return; }

    socket.emit('enviar-mensaje', ({message, uid}))
    txtMensaje.value = '';
});

const validateJWT = async() => {
    const token = localStorage.getItem('token') || '';
    
    if (token.length <= 10) {
        window.location = 'index.html';
        throw new Error('There is no active token')
    }

    const res = await fetch(url, {
        headers: {'x-token':token}
    });

    const {logged, token: tokenDB} = await res.json();
    // console.log(logged, tokenDB)
    localStorage.setItem('token',tokenDB);

    user = logged;
    document.title = user.name;
    await connectSocket();
};

const connectSocket = async() => {
    socket = io({
        'extraHeaders': {
            'x-token': localStorage.getItem('token')
        }
    });

    socket.on('connect', () => {
        console.log('Socket online');
    });

    socket.on('disconnect', () => {
        console.log('Socket offline');
        
        /* localStorage.clear();
        window.location = 'index.html'; */
    });

    socket.on('mensajes-privado', (payload) => {
        console.log('Private', payload)
    });

    socket.on('recibir-mensajes', listMessages);

    socket.on('usuarios-activos', listUsers);

    /* socket.on('recibir-mensajes-privado', (payload) => {
        
    }); */
};

const listUsers = async(users = []) => {
    let usersHTML = '';
    users.forEach(({name, uid}) => {
        usersHTML +=
        `<li>
            <p>
                <h5 class="text-success">${name}</h5>
                <span>${uid}</span>
            </p>
        </li>`
    });

    ulUsuarios.innerHTML = usersHTML;
};

const listMessages = async(messages = []) => {
    let messagesHTML = '';
    messages.forEach(({name, message}) => {
        messagesHTML +=
        `<li>
            <p>
                <span class="text-primary">${name}</span>
                <span>${message}</span>
            </p>
        </li>`
    });

    ulMensajes.innerHTML = messagesHTML;
};

const main = async()=> {
    await validateJWT();
};

main();
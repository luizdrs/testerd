(() => {
    const selector = selector => {return document.querySelector(selector)}/* trecho omitido FEITO */
    const create = element => {return document.createElement(element)}/* trecho omitido FEITO */

    const app = selector('#app');

    const Login = create('div');
    Login.classList.add('login');

    const Logo = create('img');
    Logo.src = './assets/images/logo.svg';
    Logo.classList.add('logo');

    const Form = create('form');

    Form.onsubmit = async e => {
        e.preventDefault();
        const [email, password] = e.target.children; /* trecho omitido FEITO */

        const {url} = await fakeAuthenticate(email.value, password.value);

        location.href='#users';
        
        const users = await getDevelopersList(url);
        renderPageUsers(users);
    };

    Form.oninput = e => {
        const [email, password, button] = e.target.parentElement.children;
        (!email.validity.valid || !email.value || password.value.length <= 5) 
            ? button.setAttribute('disabled','disabled')
            : button.removeAttribute('disabled');
    };

    Form.innerHTML = 
        '<input type="email" name="email" placeholder="Entre com seu e-mail">'+
        '<input type="password" name="password" placeholder="Digite sua senha supersecreta">'+
        '<button type="submit" disabled="disabled">Entrar</button>';
    /**
    * bloco de código omitido
    * monte o seu formulário
    * FEITO
    */

    app.appendChild(Logo);
    Login.appendChild(Form);

    async function fakeAuthenticate(email, password) {

        /**
         * bloco de código omitido
         * aqui esperamos que você faça a requisição ao URL informado
         * FEITO
         */

        var url = "http://www.mocky.io/v2/5dba690e3000008c00028eb6";

        var http = new XMLHttpRequest();

        http.open("GET", url, false);
        http.send();

        var data = JSON.parse(http.responseText);

        const fakeJwtToken = `${btoa(email+password)}.${btoa(data.url)}.${(new Date()).getTime()+300000}`;

        /* trecho omitido 
         * FEITO 
        */
        localStorage.setItem('token', fakeJwtToken);

        return data;

    }

    async function getDevelopersList(url) {

        /**
         * bloco de código omitido
         * aqui esperamos que você faça a segunda requisição 
         * para carregar a lista de desenvolvedores
         * FEITO
         */

        var http = new XMLHttpRequest();

        http.open("GET", url, false);
        http.send();
        
        var data = JSON.parse(http.responseText);

        return data;
    }

    function renderPageUsers(users) {
        app.classList.add('logged');
        Login.style.display = 'none'/* trecho omitido FEITO */

        const Ul = create('ul');
        Ul.classList.add('container')
        console.log(users);
        /**
         * bloco de código omitido
         * exiba a lista de desenvolvedores
         * FEITO
         */
       users.forEach(function (val) {
        var card = create('li');
        var avatar = create('img');
        var name = create('span');
        var link = create('a');
        link.href = val.html_url;
        avatar.src = val.avatar_url;
        name.innerHTML = val.login;
        link.appendChild(avatar);
        link.appendChild(name);
        card.appendChild(link);
        Ul.appendChild(card);
       });

        app.appendChild(Ul)
    }

    // init
    (async function(){
        const rawToken = localStorage.getItem('token');/* trecho omitido FEITO*/
        console.log(rawToken);
        const token = rawToken ? rawToken.split('.') : null
        console.log(token);
        if (!token || token[2] < (new Date()).getTime()) {
            if(token) {
                console.log(token[2]);
            }
            console.log((new Date()).getTime());
            localStorage.removeItem('token');
            location.href='#login';
            app.appendChild(Login);
        } else {
            location.href='#users';
            const users = await getDevelopersList(atob(token[1]));
            renderPageUsers(users);
        }
    })()
})()
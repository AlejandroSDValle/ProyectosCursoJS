const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');

let tweets = [];

document.addEventListener('DOMContentLoaded', () => { 
    formulario.addEventListener('submit', agregarTweet);
    listaTweets.addEventListener('click', eliminarTweet);

    tweets = JSON.parse(localStorage.getItem('tweet'))  ||  [];
    mostrarTweet();
});

function agregarTweet(e){
    e.preventDefault();
    const tweet = document.querySelector('#tweet').value;
    if(tweet.trim() === ''){
        mostrarError("No puede ir vacio");
        return;
    }
    const tweetObj = {
        tweet,
        id: new Date().getTime()
    }
    
    tweets = [ ... tweets, tweetObj];
    mostrarTweet();
    formulario.reset();
}

function mostrarTweet(){
    
    limpiarHTML();
    
    if(tweets.length > 0){
        tweets.forEach(tweet => {
            const li = document.createElement('LI');
            li.textContent = tweet.tweet;
            li.dataset.id = tweet.id;
             const x = document.createElement('a');
            x.textContent = 'X';
            x.classList.add('borrar-tweet');
            li.appendChild(x);
            listaTweets.appendChild(li);
        });
     
    }
    sincronizarStorage();
}

function sincronizarStorage(){
    localStorage.setItem('tweet', JSON.stringify(tweets));
}

function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

function eliminarTweet(e){
    if(e.target.classList.contains('borrar-tweet')){
        const id = parseInt(e.target.parentElement.dataset.id);
        tweets = tweets.filter(tweet => tweet.id !== id);
        console.log(tweets);
        mostrarTweet();
    }
}

function mostrarError(mensaje){
    const error = document.createElement('P');
    error.textContent = mensaje;
    error.classList.add('error');
    if(!formulario.querySelector('.error')){
        formulario.appendChild(error);
    }
}
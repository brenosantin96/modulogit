document.querySelector('.busca').addEventListener('submit', async (event)=>{
    event.preventDefault();

    let input = document.querySelector('#searchInput').value;

    if (input !== '') {
        showWarning('Carregando...');

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=9263f74a7b7413c3fcf2ccb949a4b550&units=metric&lang=pt_br` // montamos a URL para fazer a requisição;

        let results = await fetch(url); //pega a URL e poe em results
        let json = await results.json(); // transofrma em JSON

        console.log(json);

        if(json.cod === 200) {
            showInfo({
                name : json.name,
                country : json.sys.country,
                temp : json.main.temp,
                tempIcon : json.weather[0].icon,
                windSpeed : json.wind.speed,
                windAngle : json.wind.deg
            });
        } else {
            showWarning('Não encontramos essa localização');
        }

    }

    console.log(input);
});

function showWarning(msg){
    document.querySelector('.aviso').innerHTML = msg;
}

function showInfo(json){
    showWarning('');

    document.querySelector('.resultado').style.display = 'block';
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;

    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span> Km/h</span>`
    
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle}deg)`;
    console.log(json.windAngle);

}
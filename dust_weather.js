const COORDS = 'coords';
const dust_url = "https://rrig0klyf5.execute-api.ap-northeast-2.amazonaws.com/1205/dust";
const openweather_url = "https://api.openweathermap.org/data/2.5/weather";
const dust_list = document.querySelector(".js-dust");
const weather = document.querySelector(".js-weather");
const WEATHER_KEY = "3ccf53163b8ca88eadc8eb78cd3c83a1";
let stations = [];

async function updateLocation(){
    clearResults();
    clearStations();
    saveStations();
    askForCoords();
    await loadCoords();
    console.log("위치 업데이트 완료");
}
async function getWeather(lat, lng){
    fetch(
        `${openweather_url}?lat=${lat}&lon=${lng}&appid=${WEATHER_KEY}&units=metric`
    ).then(function(response){
        //response 대기
        return response.json();
    }).then(function(json){
        //response 들어오면 날짜JSON을 받아온 것이므로 이를 출력
        const temp = json.main.temp;
        const place = json.name;
        weather.innerText = `${temp} °C @${place}`;

        const resetbtn = document.createElement("button");
        resetbtn.innerText="위치 재설정";
        resetbtn.addEventListener("click", updateLocation);
        weather.appendChild(resetbtn);
    });
}
async function getDust(lat, lng, stations){
    if(!stations){ //stations를 모름
        console.log("fetch nearest stations via latitude, longitude");
        await fetch(dust_url,{
            method:'POST',
            headers:{
    
            },
            body: JSON.stringify(
                {
                    latitude:lat,
                    longitude:lng
                }
            )
        })
        .then(response=>response.json())
        .then(data=>{
            data.forEach(function(element){
                const tempspan = document.createElement("span");
                tempspan.innerText = element.update_time;
                dust_list.appendChild(tempspan);
                paintDust(element);
            });
        })
    }
    else{
        console.log("already know data stations");
        await fetch(dust_url, {
            method:'POST',
            headers:{

            },
            body:JSON.stringify(
                {
                    stations:stations
                }
            )
        })
        .then(response=>response.json())
        .then(data=>{
            data.forEach(function(element){
                const tempspan = document.createElement("span");
                tempspan.innerText = element.update_time;
                dust_list.appendChild(tempspan);
                paintDust(element);
            })
        })
    }
}
function clearResults(){
    dust_list.innerHTML="";
}
function undefinedCheck(data){
    if(data===undefined){
        return 4;
    }
    else{
        return data-1;
    }
}
function paintDust(element){ //paint dust information
    const statusEmoji = ["😄", "🙂", '😷', '☠️', '🤷‍♂️'];
    const statusList = ["좋음", "보통", "나쁨", "매우 나쁨", "데이터 없음"];
    const li = document.createElement("li");
    const emojibtn = document.createElement("button");
    const span = document.createElement("span");
    emojibtn.innerText= '🏛️';
    span.innerText = `${element.name} (${element.address})`;
    li.appendChild(emojibtn);
    li.appendChild(span);

    const detailSpan = document.createElement("span");
    const ul = document.createElement("ul");


    const li1 = document.createElement("li");
    const emj1 = document.createElement("button");
    const span1 = document.createElement("span");
    
    emj1.innerText = statusEmoji[undefinedCheck(element.pm10Grade)];
    span1.innerText = `미세먼지(PM10) : ${element.pm10} ㎍/㎥ (${statusList[undefinedCheck(element.pm10Grade)]})`;
    
    const li2 = document.createElement("li");
    const emj2 = document.createElement("button");
    const span2 = document.createElement("span");
    
    emj2.innerText=statusEmoji[undefinedCheck(element.pm25Grade)];
    span2.innerText  = `초미세먼지(PM2.5) : ${element.pm25} ㎍/㎥ (${statusList[undefinedCheck(element.pm25Grade)]})`;
    
    const li3 = document.createElement("li");
    const emj3 = document.createElement("button");
    const span3=  document.createElement("span");

    emj3.innerText = statusEmoji[undefinedCheck(element.coGrade)];
    span3.innerText = `일산화탄소 : ${element.co} ppm (${statusList[undefinedCheck(element.coGrade)]})`;
    
    const li4 = document.createElement("li");
    const emj4 = document.createElement("button");
    const span4 = document.createElement("span");

    emj4.innerText = statusEmoji[undefinedCheck(element.o3Grade)];
    span4.innerText = `오존 : ${element.o3} ppm (${statusList[undefinedCheck(element.o3Grade)]})`;

    const li5 = document.createElement("li");
    const emj5 = document.createElement("button");
    const span5 = document.createElement("span");

    emj5.innerText = statusEmoji[element.so2Grade];
    span5.innerText =  `아황산가스 : ${element.so2} ppm (${statusList[element.so2Grade]})`;

    
    li1.appendChild(emj1);
    li1.appendChild(span1);
    li2.appendChild(emj2);
    li2.appendChild(span2);
    li3.appendChild(emj3);
    li3.appendChild(span3);
    li4.appendChild(emj4);
    li4.appendChild(span4);
    li5.appendChild(emj5);
    li5.appendChild(span5);


    detailSpan.appendChild(li1);
    detailSpan.appendChild(li2);
    detailSpan.appendChild(li3);
    detailSpan.appendChild(li4);
    detailSpan.appendChild(li5);

    ul.appendChild(detailSpan);

    li.appendChild(ul);
    dust_list.appendChild(li);
    //localStorage에 저장소 위치 저장
    const newId = stations.length+1;
    const stationObj = {
        name:element.name,
        address:element.address,
        id:newId
    }
    stations.push(stationObj);
    saveStations();
}
function saveStations(){
    localStorage.setItem('stations', JSON.stringify(stations));
}
function clearStations(){
    stations =[];
    localStorage.removeItem('stations');
}
function saveCoords(coordsObj){
    //로컬 저장소에 저장할땐 stringify
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}
function handleGeoSucces(position){
    const latitude = position.coords.latitude; //위도
    const longitude = position.coords.longitude; //경도
    const coordsObj ={
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getDust(latitude, longitude);
}
function handleGeoError(){
    console.log("cant access location");
}
function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}
async function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    const loadedStations = localStorage.getItem('stations');
    //askForCoords();
    if(loadedCoords==null){ //좌표부터 모름
        askForCoords();
    }
    else{ //위치 정보는 알고 있음
        const parsedCoords = JSON.parse(loadedCoords);
        await getWeather(parsedCoords.latitude, parsedCoords.longitude);
        if(loadedStations==null){
            await getDust(parsedCoords.latitude, parsedCoords.longitude,null);
        }
        else{
            const parsedStations = JSON.parse(loadedStations);
            await getDust(parsedCoords.latitude, parsedCoords.longitude, parsedStations);
        }
    }
}
async function init(){
    await loadCoords();
}
init();
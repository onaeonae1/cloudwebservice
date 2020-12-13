const btn = document.getElementById("bt");
const covid_list = document.getElementById("js-covidList");
const total_covid = document.getElementById("js-totalCovid");
const updateAt = document.getElementById("updateAt");
const covid_url = "https://rrig0klyf5.execute-api.ap-northeast-2.amazonaws.com/1205/lambda";
let year, month, date;
async function covid(){ 
    await fetch(covid_url,{
        method:'POST',
        headers:{
            
        },
        body: JSON.stringify(        
            {
                year:year,
                month:month,
                date:date
            }
            )
        })
        .then(response=>response.json())
        .then(data=>{
            const alpha = JSON.parse(data).reverse();
            const totalData = alpha[0];
            const localData = alpha.slice(1);
            total_covid.appendChild(paintTotal(totalData));
            localData.forEach(function(element){
                paintCovid(element);
            })
        })
}
function paintTotal(element){
    const detailSpan = document.createElement("span");
    

    const li1 = document.createElement("li");
    const span1 = document.createElement("span");
    span1.innerText = `누적 확진자 : ${element.defected}`;
    li1.appendChild(span1);
    detailSpan.appendChild(li1);

    const li2  = document.createElement("li");
    const span2 = document.createElement("span");
    span2.innerText = `전일대비 : ${element.total_increase} (지역발생 : ${element.local_increase}) / (해외유입 : ${element.foreign_increase})`;
    li2.appendChild(span2);
    detailSpan.appendChild(li2);

    const li3 = document.createElement("li");
    const span3  = document.createElement("span");
    span3.innerText=`사망자 : ${element.death}`;
    li3.appendChild(span3);
    detailSpan.appendChild(li3);

    const li4 = document.createElement("li");
    const span4 = document.createElement("span");
    span4.innerText = `격리해제 : ${element.isolation_finished}`;
    li4.appendChild(span4);
    detailSpan.appendChild(li4);

    const li5 = document.createElement("li");
    const span5 = document.createElement("span");
    span5.innerText = `격리중 : ${element.isolation_inprogress}`;
    li5.appendChild(span5);
    detailSpan.appendChild(li5);
    return detailSpan;
}
function paintCovid(element){
    //console.log(element);
    const li = document.createElement("li");
    const span = document.createElement("span");
    const emjbtn = document.createElement("button");
    span.innerText = `${element.city}`;
    emjbtn.innerText = "🌆";
    li.appendChild(emjbtn);
    li.appendChild(span);
    const ul = document.createElement("ul");
    const detailSpan = paintTotal(element);
    ul.appendChild(detailSpan);
    li.appendChild(ul);
    covid_list.appendChild(li);

}
function init(){
    const today = new Date();
    year = today.getFullYear();
    month = today.getMonth()+1;
    date = today.getDate();
    if(date<10){
        date = `0${date}`;
    }
    if(month<10){
        month = `0${month}`;
    }
    year = String(year);
    month = String(month);
    date = String(date);
    updateAt.innerHTML = `< UPDATE > ${year} : ${month} : ${date}`
    //btn.addEventListener("click", covid);
    covid();
}
init();
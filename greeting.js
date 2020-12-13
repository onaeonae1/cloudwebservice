const form = document.querySelector(".js-form"), 
input = form.querySelector("input"),
greeting = document.querySelector(".js-greetings");
const USER_LS = "currentUser",
SHOWNIG_CN = "showing";

function handleDeleteName(){
  const currentUser = localStorage.getItem(USER_LS);
  //localStorage.removeItem(USER_LS);
  saveName("Unknown");
  greeting.classList.remove(SHOWNIG_CN);
  loadName();
}
function paintGreeting(text){
  form.classList.remove(SHOWNIG_CN);
  greeting.classList.add(SHOWNIG_CN);
  const delbtn = document.createElement("button");
  delbtn.innerText = "이름 재설정";
  delbtn.addEventListener("click", handleDeleteName);
  greeting.innerText = `안녕하세요 ${text} 님`;
  greeting.appendChild(delbtn);
}
function saveName(text){ //로컬 저장소에 내 이름 저장해둠
  localStorage.setItem(USER_LS, text);
}
function handleSubmit(event){ //이벤트 처리
  console.log("greeting");
  event.preventDefault(); //기본동작(유사 새로고침) 막음
  const currentValue = input.value;
  console.log(currentValue);
  paintGreeting(currentValue);
  saveName(currentValue);
}
function askForName(){
  form.classList.add(SHOWNIG_CN);
  form.addEventListener("submit",handleSubmit); //이벤트
}
function loadName(){
  const currentUser = localStorage.getItem(USER_LS);
  console.log(currentUser);
  if(currentUser==="Unknown"){
    askForName();
    //she is not
  }
  else{
    paintGreeting(currentUser); //기본 동작
    //she is
  }
}
function init(){
  loadName();
}
init();
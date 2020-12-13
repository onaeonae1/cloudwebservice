const body = document.querySelector("body");
const IMG_NUMBER = 6; //우리가 가진 배경사진의 수
function paintImage(imgNumber){
    const image = new Image();
    image.src = `images/${imgNumber}.png`;
    image.classList.add('bgImage');
    //body.appendChild(image);
    body.prepend(image);

}
function genRandom(){
    const number = Math.floor(Math.random() * IMG_NUMBER ) + 1;
    return number;
}
function init(){
    const randomNumber = genRandom();
    paintImage(randomNumber);
}
init();
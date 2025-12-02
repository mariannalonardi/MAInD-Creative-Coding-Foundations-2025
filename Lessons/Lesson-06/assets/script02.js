const canvas= document.getElementById('myCanvas');
const ctx= canvas.getContext('2d');

//posizione nello schermo
const width= window.innerWidth; 
const height= window.innerHeight;
canvas.width= width; 
canvas.height= height; 

const size= 200; 

let circlePos= height/2;

function draw(){

    //console.log('ciao');
    ctx.clearRect(0,0,width,height);

    circlePos+=1.5; //speed
    if (circlePos>height+80) {
        circlePos= height/2;
    }
    
    //testo
    //ctx.fillStyle= 'black';
    //ctx.font= '40px Arial';
    //ctx.fillText('Ciao', 100, 100);

    //translate
    ctx.save();
    ctx.translate(300, 500);

    //rettangolo
    ctx.beginPath();
    ctx.fillStyle= 'blue';
    ctx.fillRect(width/2 - size/2,height/2 - size/2, size, size);

    //cerchio
    ctx.fillStyle= 'orange';
    ctx.arc(width/2, circlePos, 80, 0, Math.PI*2) //width/2, height/2
    ctx.fill();

    ctx.restore();

    //animation
    requestAnimationFrame(draw)
}

draw()
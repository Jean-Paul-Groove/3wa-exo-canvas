"use strict";
const canvas = document.querySelector('canvas')
const context = canvas.getContext("2d")
function resizeCanvas(){
    canvas.height = window.innerHeight*0.9
    canvas.width = window.innerWidth*0.9
}
resizeCanvas()
window.addEventListener("resize", resizeCanvas)

class Ball{
    #RIGHT =1
    #LEFT = -1
    #direction = this.#RIGHT
    #x
    #y
    #radius
    #color
    #movingSpeed
    constructor(x,y,radius,color){
        this.#x = x
        this.#y = y
        this.#radius = radius
        this.#color = color
        this.#movingSpeed = 3
    }
    get x(){
        return this.#x
    }
    get y(){
        return this.#y
    }
    get radius(){
        return this.#radius
    }
    get color(){
        return this.#color
    }

    get direction(){
        return this.#movingSpeed
    }
    get movingSpeed(){
        return this.#direction
    }
    set x(x){

        if(x<this.#radius){
            this.#direction = this.#RIGHT
            this.#x = this.#radius
        }
        if(x>canvas.width-this.#radius){
            this.#direction = this.#LEFT
            this.#x = canvas.width-this.#radius
        }
        this.#x = x
    }
    set direction(value){
        if(value>0){
            this.#direction = this.#RIGHT
        }
        if(value<0){
            this.#direction = this.#LEFT
        }
    }
    draw(){
    context.beginPath()
    context.arc(this.#x, this.#y, this.radius, 0, 2 * Math.PI); 
    context.fillStyle = this.#color
    context.fill()
    }
   
}
const ball = new Ball(canvas.width/2,canvas.height/2,50,"orange")
function anim(){
    context.clearRect(0,0,canvas.width,canvas.height)
    const newPosition = ball.x + ball.movingSpeed*ball.direction
    ball.x = newPosition
    ball.draw()
requestAnimationFrame(anim)
}
ball.draw()
anim()
window.addEventListener("keydown", handleDirection)
function handleDirection(e){
    if(e.key ==='ArrowLeft'){
        ball.direction = -1
    }
    if(e.key ==='ArrowRight'){
        ball.direction = 1
    }
}
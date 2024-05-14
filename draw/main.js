"use strict";

//Canvas element and context
const canvas = document.createElement('canvas')
const canvasSection = document.querySelector("#canvas")
canvasSection.append(canvas)
function resizeCanvas(){
    canvas.height = window.innerHeight*0.9
    canvas.width = window.innerWidth/2
}
resizeCanvas()
window.addEventListener("resize", resizeCanvas)
const context = canvas.getContext('2d')
context.lineCap = 'round'
// Variable tracking position of pen and if is drawing or not
const currentPosition = {x:0, y:0}
let penDown = false
let img = canvas.toDataURL()
//Eventlisteners related to the mouse on the canvas
canvas.addEventListener("mouseenter", setPosition)
canvas.addEventListener("mousedown", draw)
canvas.addEventListener("mouseup", stopDraw)
canvas.addEventListener("mousemove", movePen)

function setPosition(e){
    currentPosition.x = e.clientX-canvas.offsetLeft
    currentPosition.y = e.clientY - canvas.offsetTop
}
function draw(e){
penDown = true
context.beginPath()
}
function stopDraw(e){
    penDown=false
    //Save canvas as is for dowload link
    img = canvas.toDataURL('image/webp')
    saveLink.href = img
}
function movePen(e){
    if(!penDown){
        setPosition(e)
        return
    }
    context.moveTo(currentPosition.x,currentPosition.y)
    context.lineTo(e.clientX-canvas.offsetLeft,e.clientY-canvas.offsetTop)
    setPosition(e)
    context.stroke()
}
//Color picker

const colors = [{
    name:"noir",
    value:"black"
},{
    name:"Rouge",
    value:"red"
},{
    name:"Orange",
    value:"orange"
},{
    name:"Jaune",
    value:"yellow"
},{
    name:"Vert",
    value:"green"
},{
    name:"Bleu",
    value:"blue"
},{
    name:"Violet",
    value:"violet"
}]
const colorPicker = document.querySelector('#color-picker')
colors.forEach((color)=> {
    const colorButton=document.createElement('button')
    colorButton.innerText = color.name
    colorButton.classList.add('color-button')
    colorButton.style.backgroundColor = color.value
    colorButton.addEventListener("click",(e)=> setColor(e,color.value))
    const liElement = document.createElement('li')
    liElement.append(colorButton)
    colorPicker.append(liElement)
})

function setColor(e,color){
    e.preventDefault()
    context.strokeStyle = color
}
//Stroke thickness
const thicknessControl = document.querySelector("#thickness-control")
context.lineWidth = thicknessControl.value
thicknessControl.addEventListener("change",setThickness)
function setThickness(e){
   context.lineWidth = e.target.value

}
//Dowload

const saveLink = document.querySelector('#downloadLink')
saveLink.download = "image.png"

//erase
const eraseButton = document.querySelector("#eraseButton")
eraseButton.addEventListener("click", (e)=>{
    e.preventDefault()
    context.clearRect(0,0,canvas.width,canvas.height)
})
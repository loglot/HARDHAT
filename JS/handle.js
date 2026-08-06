
var path=document.getElementById("path")
var FEZ=document.getElementById("FEZ")
var HAT=document.getElementById("HAT")
var title=document.getElementById("h")
// var clog=document.getElementById("curl")
var release=0
var curver=""
var intervalID = window.setInterval(feedback, 1000);
function feedback(){
    if(running) logstat.append(".")
}
FEZ.addEventListener("click",(e)=>{
    window.electronAPI.exec([path.value+'/FEZ',[]])
})
HAT.addEventListener("click",(e)=>{
    window.electronAPI.exec([path.value+'/HAT',[]])
})


window.electronAPI.exec(['./find.sh',[]])
ver()
mod()
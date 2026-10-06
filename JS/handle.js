
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
    var exec=[]
    if(compareVer(curver, "v3.0.0")){
        exec=[path.value+"/Original", "./FEZ"]
    }else{
        exec=[path.value, "./FEZ"]

    }
    window.electronAPI.exec(["./SH/run.sh",[...exec, "FEZ"]])
})
HAT.addEventListener("click",(e)=>{
    var exec=[]
    if(compareVer(curver, "v3.0.0")){
        exec=[path.value, "./FEZ"]
    }else{
        exec=[path.value, "./HAT"]

    }
    window.electronAPI.exec(["./SH/run.sh",[...exec, "HAT"]])
})


// window.electronAPI.exec(['./SH/find.sh',[]])
refresh()
ver()
mod()

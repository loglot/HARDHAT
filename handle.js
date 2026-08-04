
var verSel=document.getElementById("versions")
var steamos=document.getElementById("steamOS")
var start=document.getElementById("exec")
var path=document.getElementById("path")
var log=document.getElementById("log")
var status=document.getElementById("status")
var logButton=document.getElementById("logs")
// var clog=document.getElementById("curl")
var releases
var release=0
var running=false
async function ver(){
    const versions = await fetch("https://api.github.com/repos/FEZModding/HAT/releases")
    if(!versions.ok){
        throw new Error("Could Not Fetch Versions")
    }else{
        var list= await versions.json()
        releases=list
            console.log(
                    list
                    )
            verSel.innerHTML=''
            verSel.appendChild(
                new Option(
                    "Latest ("+versionNumber(0)+")",
                    0
                )
            )

        for(let i = 1; i<list.length;i++){
            verSel.appendChild(
                new Option(
                    versionNumber(i),
                    i
                )
            )
        }
    }
    start.style.display="block"
}
function versionNumber(i){
    return (releases[i].html_url
                    .split("/")
                    .pop())
}
function install(){
//   window.electronAPI.write(path.value,"test file")
    console.log(path.value)
    const installer=releases[release]
    window.electronAPI.exec(['./install2.x.sh', [
        installer.assets[0].browser_download_url, 
        './'+installer.assets[0].name,
        path.value,
        versionNumber(release)
    ]])
    start.style.display="none"
}
verSel.addEventListener("change",(e)=>{
    release=e.target.value
    console.log(release+" "+versionNumber(release))
    if(
        versionNumber(release).split(".")[0]=="v1"||
        versionNumber(release).split(".")[0]=="1"
    ){
        steamos.style.display="block"
    }else{
        steamos.style.display="none"
        // console.log(release.split(".")[0])

    }
})
start.addEventListener("click",(e)=>{
    install()
})
var logsShown=false
logButton.addEventListener("click",(e)=>{
    log.style.display   = logsShown ? "none" : "block"
    logButton.innerHTML = logsShown ? "show logs" : "hide logs"
    logsShown=!logsShown
})
ver()
window.electronAPI.onLog((text) => {
    var split=text.split("\n")
        console.log(split)
    for(let i in split){
        var parsed=split[i].split("-|-")
        console.log(split[i])
        switch(parsed[0]){
            case("-title"):
                status.innerHTML= parsed[1]
                break
            case("-start"):
                running=true
                break
            case("-clear"):
                log.innerHTML=""
                break
            case("-error"):
                status.style.color="#e1aaaa"
                running=false
                break
            case("-finish"):
                status.style.color="#aae1aa"
                running=false
                break
            default:
                if(i!=0){
                    log.append("\n")
                }
                log.append(split[i])
                log.scrollTop=log.scrollHeight
        }
    }
})
var intervalID = window.setInterval(feedback, 1000);
function feedback(){
    if(running) status.append(".")
}
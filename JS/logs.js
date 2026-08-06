
var nins=document.getElementById("nins")
var log=document.getElementById("log")
var logstat=document.getElementById("logstat")
var running=false
var con=document.getElementById("confirm")
var mp=document.getElementById("modpage")
var installpath=""

var logButton=document.getElementById("logs")
var logsShown=false
logButton.addEventListener("click",(e)=>{
    log.style.display   = logsShown ? "none" : "block"
    logButton.innerHTML = logsShown ? "show logs" : "hide logs"
    logsShown=!logsShown
    log.scrollTop=log.scrollHeight
})
window.electronAPI.onLog((text) => {
    var split=text.split("\n")
        console.log(split)
    for(let i in split){
        var parsed=split[i].split("-|-")
        console.log(split[i])
console.log(logstat.innerHTML)
        switch(parsed[0]){
            case("-title"):
                logstat.innerHTML= parsed[1]
                break
            case("-start"):
                running=true
                // start.style.display="none"
                logstat.style.color="#c8bfd8"
                break
            case("-clear"):
                log.innerHTML=""
                break
            case("-error"):
                logstat.style.color="#e1aaaa"
                start.style.display="block"
                running=false
                break
            case("-finish"):
                logstat.style.color="#aae1aa"
                start.style.display="block"
                running=false
                break
            case("-stop"):
                // logstat.style.color="#aae1aa"
                start.style.display="block"
                running=false
                break
            case("-path"):
                // logstat.style.color="#aae1aa"
                // start.style.display="block"
                // running=false
                path.value=parsed[1]
                break
            case("-MOD"):
                populateMod(parsed[1])
                break
            case("-DISABLE"):
                disableMod(parsed[1])
                break
            case("-hat"):
                con.style.display="block"
                con.innerHTML=`HAT ${parsed[1]} Already Installed`
                start.innerHTML="reinstall"
                installpath=path.value
                nins.style.display="none"
                mp.style.display="block"
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
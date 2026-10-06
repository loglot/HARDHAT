
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
        switch(parsed[0]){
            case("-title"):
                logstat.innerHTML= parsed[1]
                break
            case("-start"):
                running=true
                // start.style.display="none"
                logstat.style.color="#c8bfd8"
                tarspeed=15
                break
            case("-clear"):
                log.innerHTML=""
                break
            case("-error"):
                logstat.style.color="#e1aaaa"
                start.style.display="inline-block"
                running=false
                tarspeed=1
                break
            case("-finish"):
                logstat.style.color="#aae1aa"
                start.style.display="inline-block"
                running=false
                tarspeed=1
                break
            case("-stop"):
                // logstat.style.color="#aae1aa"
                start.style.display="inline-block"
                running=false
                tarspeed=1
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
            case("-MODPACK"):
                populateModpack(parsed[1],parsed[2])
                break
            case("-SETTING"):
                console.log(parsed[1])
                if(parsed.length==3){
                    setSetting(parsed[1])
                }
                break
            case("-DISABLE"):
                disableMod(parsed[1])
                break
            case("-hat"):
                var ver=parsed[1]
                if(ver=="nil"){
                    con.style.display="none"
                    con.innerHTML=`HAT ${ver} Already Installed`
                    start.innerHTML="Install"
                    stopp.style.display="none"
                    installpath=path.value
                    nins.style.display="block"
                    mp.style.display="none"
                    HAT.classList.add("hidden");
                    curver="undef"
                }else{
                
                    con.style.display="block"
                    con.innerHTML=`HAT ${ver} Already Installed`
                    start.innerHTML="reinstall"
                    stopp.style.display="inline-block"
                    installpath=path.value
                    nins.style.display="none"
                    mp.style.display="block"
                    HAT.classList.remove("hidden");
                    curver=ver

                }
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
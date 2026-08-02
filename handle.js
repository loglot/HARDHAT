var verSel=document.getElementById("versions")

async function ver(){
    const versions = await fetch("https://api.github.com/repos/FEZModding/HAT/releases")
    if(!versions.ok){
        throw new Error("Could Not Fetch Versions")
    }else{
        var list= await versions.json()
            console.log(
                    list
                    )
        for(let i = 0; i<list.length;i++){
            verSel.appendChild(
                new Option(
                    list[i].html_url
                    .split("/")
                    .pop()
                )
            )
        }
    }
}
ver()

var navin=document.getElementById("installation")
var navmo=document.getElementById("mods")
var navla=document.getElementById("launch")
var navse=document.getElementById("settings")
var pagein=document.getElementById("pagein")
var pagemo=document.getElementById("pagemo")
var pagela=document.getElementById("pagela")
var pagese=document.getElementById("pagese")
var page="ins"


function select(sel, sel2=title, pag){
    var nav=[navin, navmo, navla,navse]
    for (let i in nav){
        nav[i].classList.remove("active");
    } 
    sel.classList.add("active");
    var pages=[pagein, pagela, pagemo,pagese]
    for (let i in pages){
        pages[i].style.display="none";
    } 
    sel2.style.display="block"
    page=pag
}
navla.addEventListener("click",(e)=>{
    select(navla,pagela,"lau")
})
navmo.addEventListener("click",(e)=>{
    select(navmo, pagemo,"mod")
})
navin.addEventListener("click",(e)=>{
    select(navin,pagein,"ins")
})
navse.addEventListener("click",(e)=>{
    select(navse,pagese,"set")
})
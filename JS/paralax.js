
var pcan=document.getElementById("paralax")
var pctx=pcan.getContext("2d")
var gcan=document.getElementById("grave")
var gctx=gcan.getContext("2d")
var dcan=document.getElementById("drapes")
var dctx=dcan.getContext("2d")
var grid=[]
var gravecl=[]
var stard=[]
var outers=[]
var time=0
var speed=1
var tarspeed=1
for(let i = 0; i<3;i++){
    grid[i]=new Image()
    grid[i].src=`./assets/MEMORYGRID_${i}.png`
}
for(let i = 0; i<3;i++){
    gravecl[i]=new Image()
    gravecl[i].src=`./assets/GRAVE_CLOUD_${i}.png`
}
for(let i = 0; i<2;i++){
    stard[i]=new Image()
    stard[i].src=`./assets/STARDRAPES_${i}.png`
}
for(let i = 0; i<2;i++){
    outers[i]=new Image()
    outers[i].src=`./assets/OUTERSPACE_${i}.png`
}
function imgload(img){
    return img.complete && img.naturalWidth !== 0;
}
function drawgrid(img,x,y,a,t=4,topc="#ff0063",flip=false,ctx=pctx){
    if(imgload(img)){
        // console.log()
        ctx.globalAlpha=a
        ctx.imageSmoothingEnabled = false;
        var sign=1
        if(flip){
            sign=-1
        }
        ctx.drawImage(img,x,0+Math.round(y),img.naturalWidth*t,img.naturalHeight*t*sign)
        ctx.fillStyle=topc
        ctx.fillRect(0,Math.round(y-100000),10000,100000)
    }
}
function drawModBG(z){
    // time+=1
    fix(pctx)

    // drawgrid(grid[0],-50+z/50,-3096+z/4,.2,4,"#ff006300")
    // drawgrid(grid[1],0-z/100,-400-z/4,.5)
    // drawgrid(grid[2],-100-z/50,-300-z/2,.9)
    var look=[
        [4,-4,-2],
        [-3096,-400,-300],
        [.2,.5,.9]
    ]
    for(let x=0;x<3;x++){
        for(let y=0;y<Math.ceil(window.innerWidth/2048)+2;y++){
            console.log(x,(8/2^x))
            drawgrid(
                grid[x],
                    -1024+
                    (time/(8/2**x))
                    %2048+
                    (+2048
                    -2048*y),
                    
                    look[1][x]+z/look[0][x]
                    ,look[2][x],4,
                "#ff006300",
                false,
                pctx)

        }
    }
}
function drawInsBG(){
    fix(gctx)

    for(let x=0;x<3;x++){
        for(let y=0;y<Math.ceil(window.innerWidth/2048)+2;y++){
            console.log(x,(8/2^x))
            drawgrid(
                gravecl[x],
                    -1024+
                    (time/(8/2**x))
                    %2048+
                    (+2048
                    -2048*y),
                0,1,4,
                "#ff006300",
                false,
                gctx)

        }
    }
    // drawgrid(gravecl[0],-1024+(time/8)%2048,0,1,4,"#ff006300",false,gctx)
    // drawgrid(gravecl[0],-1024+(time/8)%2048+2048,0,1,4,"#ff006300",false,gctx)

    // drawgrid(gravecl[1],-1024+(time/4)%2048-2048,0,1,4,"#ff006300",false,gctx)
    // drawgrid(gravecl[1],-1024+(time/4)%2048,0,1,4,"#ff006300",false,gctx)
    // drawgrid(gravecl[1],-1024+(time/4)%2048+2048,0,1,4,"#ff006300",false,gctx)
    
    // drawgrid(gravecl[2],-824+(time/2)%2048-2048,0,1,4,"#ff006300",false,gctx)
    // drawgrid(gravecl[2],-824+(time/2)%2048,0,1,4,"#ff006300",false,gctx)
    // drawgrid(gravecl[2],-824+(time/2)%2048+2048,0,1,4,"#ff006300",false,gctx)

}
function drawLauBG(){
    fix(dctx)
    for(let x=0;x<2;x++){
        var pat = dctx.createPattern(outers[x], "repeat");
        pat.setTransform(new DOMMatrix([4,0,0,4,(time*((x+10/11)))/30, x*12]));  
        dctx.imageSmoothingEnabled = false;
        dctx.globalAlpha=x==1?.5:.2        
        dctx.fillStyle = pat;
        dctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    }
    for(let x=0;x<2;x++){
        for(let y=0;y<Math.ceil(window.innerWidth/2048)+2;y++){
            drawgrid(
                stard[x],
                    ((time*((x+3)/4))/3)
                    %2048+
                    (+2048
                    -2048*y),
                    
                0,1,4,
                "#ff006300",
                false,
                dctx)

        }
    }
    // dctx.fillStyle="#fff"
    // dctx.fillRect(50,50,1000,1000)
}
function paratick(){
    speed=(speed*100+tarspeed)/101
    time+=speed
    requestAnimationFrame(paratick)
    var y=window.scrollY
    if(page=="mod"){
        drawModBG(y)
    }
    if(page=="ins"){
        drawInsBG()
    }
    if(page=="lau"){
        drawLauBG()
    }
    
}
function fix(ctx){
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

}
requestAnimationFrame(paratick)
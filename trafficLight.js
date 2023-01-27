class TrafficLight{
    constructor(x,y,width,height){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.angle = 0;

        this.sensor=new TrafficLightSensor(this);
        this.img = new Image();
        this.img.src = "trafficLight.jpeg";

        this.mask=document.createElement("canvas");
        this.mask.width=width;
        this.mask.height=height;

        const maskCtx=this.mask.getContext("2d");
        this.img.onload=()=>{
    
            maskCtx.rect(0,0,this.width,this.height);
            maskCtx.fill();

            maskCtx.globalCompositeOperation="destination-atop";
            maskCtx.drawImage(this.img,0,0,this.width,this.height);
        }
    }

    update(){
        if(this.sensor){
            this.sensor.update();
        }
    }

    draw(ctx,drawSensor=false){
        if(this.sensor && drawSensor){
            this.sensor.draw(ctx);
        }

        ctx.save();
        ctx.translate(this.x,this.y);

        ctx.drawImage(this.img,
            -this.width/2,
            -this.height/2,
            this.width,
            this.height);
        ctx.restore();
    }
}
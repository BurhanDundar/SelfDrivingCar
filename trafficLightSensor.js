class TrafficLightSensor {
    constructor(trafficLight){
        this.trafficLight = trafficLight;
        this.rayCount = 1;  
        this.rayLength = 200;
        this.raySpread=Math.PI/2;
        this.rays = [];
        this.angle = 0;
    }

    #castRays(){
        this.rays=[];
        for(let i=0;i<this.rayCount;i++){
            const start={x:this.trafficLight.x, y:this.trafficLight.y};
            const end={x:this.trafficLight.x-188,y:this.trafficLight.y};
            this.rays.push([start,end]);
        }
    }

    update(a = 500,b = 2){
        this.#castRays();
        this.polygon = this.createPolygon(a,b);
    }
    
    createPolygon(a = 500,b = 2){
        this.x = this.trafficLight.x;
        this.y = this.trafficLight.y;
        this.width = a;
        this.height = b;

        // this.x = 195;
        // this.y = -200;
        // this.width = 188
        // this.height = 2;

        const points=[];
        const rad=Math.hypot(this.width,this.height)/2;
        const alpha=Math.atan2(this.width,this.height);
        points.push({
            x:this.x-Math.sin(this.angle-alpha)*rad,
            y:this.y-Math.cos(this.angle-alpha)*rad
        });
        points.push({
            x:this.x-Math.sin(this.angle+alpha)*rad,
            y:this.y-Math.cos(this.angle+alpha)*rad
        });
        points.push({
            x:this.x-Math.sin(Math.PI+this.angle-alpha)*rad,
            y:this.y-Math.cos(Math.PI+this.angle-alpha)*rad
        });
        points.push({
            x:this.x-Math.sin(Math.PI+this.angle+alpha)*rad,
            y:this.y-Math.cos(Math.PI+this.angle+alpha)*rad
        });
        return points;
    }

    draw(ctx){
        for(let i=0;i<this.rayCount;i++){
            let end=this.rays[i][1];

            ctx.beginPath();
            ctx.lineWidth=2;
            ctx.strokeStyle="red";
            ctx.moveTo(
                this.rays[i][0].x,
                this.rays[i][0].y
            );
            ctx.lineTo(
                end.x,
                end.y
            );
            ctx.stroke();            
        }
    } 

    
}
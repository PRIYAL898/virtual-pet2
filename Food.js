class Food{
    constructor(){
        this.foodStock=0;
        this.lastFed;
        milk_img=loadImage("images/Milk.png");
    }

    display(){
        var x=70;
        var y=100;
        imageMode(CENTRE);
        if(this.foodStock!=0){
          for( var i=0;i<this.foodStock;i++){
            if(i%10===0){
              x=70;
              y=y+50;
            }
            image(this.image,x,y,50,50);
            x=x+30;
          }
        }
      
    }

    updateFoodStock(){
      this.foodStock=foodStock;
    }
      
    deductFood(){
      if(this.foodStock>0){
        this.foodStock=this.foodStock-1;
      }
    }

    getFood(foodS){
        var foodStock=database.ref("Food");
        foodStock.update({Food:foodS})
    }
      
      
    writeStock(x){
        if(x<=0){
          x=0;
        }else{
          x=x-1;
    }
      
        database.ref("/").set({
          Food:x+x
        })
        
        database.ref("/").update({
          Food:x
        })
    }
    
}
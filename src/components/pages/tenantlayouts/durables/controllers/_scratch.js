export default class _scratch {
constructor(arr,item){
this.selected = item;
this.arr = arr;
this.currentpage = 0;
this.canNext = true;
this.canPrev = false;
this.arraybreak = [];
this.arraylength;
this.currentarray = 0;
this.group = [];
this.completion = this.navigator();
this.counter();
this.navigator();
}
counter = ()=>{
let group = [];
let arrrobj  =  {...this.arr[0]};
let arrr = Object.keys(arrrobj);
let arrr2 = Object.keys(arrrobj);
let arraybreak = [];
let currentarr = [];
if (arrr.length > 0){
let scratch = arrr2.map((item, ind)=>{
let indof = arrr.indexOf(item);
if (indof > -1){
    arrr.splice(indof,1);
}
if ( arrrobj[item].groupinfo.groupdata )  {    
    group.push(item); 
    if (group.length == 3){
       let itemo = {keyname : group, key:'Select incmoe Type',datatype:'formgroup' };
       currentarr.push(itemo);
       console.log(itemo , 'Item passed')
    }   
}else{
 if( arrrobj[item].datatype !== "textarea" ){
   if (currentarr.length < 3 ){
       currentarr.push(arrrobj[item])
   }
   else{
    arraybreak.push(currentarr);
    currentarr = [];
   }    
} else{
   if (currentarr.length < 3 ){
       currentarr.push(arrrobj[item])
   }
   else{
    arraybreak.push(currentarr);
    currentarr = [];
   }

}
}
})
this.arraybreak = arraybreak;
this.arraylength = this.arraybreak.length;
return  arraybreak;
}else{
    return undefined;
}

};
navigator = (ass)=>{
let th = this;
if(this.currentpage + 1 < this.arraybreak.length  - 1 ){
    this.canNext = true;
}else{this.canNext = false}
if (this.currentpage -1  <  0 ) {
    this.canPrev = false;
}else{this.canPrev = true}
if (!ass){
    this.currentpage = 0;
    this.canNext = true;
}else{
  if (this.arraybreak.length > 0){
    if (ass === 'next' && th.canNext ){
       if( this.currentpage + 1  >  this.arraybreak.length - 1  ){
           this.canNext = false;                              
         }else{
          this.canNext = true;
         }
           this.currentpage = th.currentpage + 1;
            this.canPrev = true;         
           this.currentarray = th.currentarray + 1;        
       

    }else if (ass === "prev" && this.canPrev){
        if(th.currentpage -1  <  0 ){          
           th.canPrev = false;                
        }else{
        th.canPrev = true; 
        }                   
           th.currentpage = this.currentpage - 1; 
            this.canNext = true;                  
           th.currentarray = this.currentarray - 1;
       
    
    }

}else{
    return undefined;
}
}
 let len = this.arraybreak.length;
 let currentpage = this.currentpage;
 if (currentpage == 0){
     currentpage = 0;
 }
this.completion = (this.currentpage/len)*100;
return currentpage;   

};

};
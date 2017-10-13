const stack = ['tenant_bio', 'general_info',  'tenant_employment_history',   'tenant_residence_history', 'tenant_immigration_history']
export default class _scratch {
constructor(arr,item){
this.selected = item;
this.arr = arr;
this.currentpage = 0;
this.canNext = true;
this.canPrev = false;
this.arraybreak = [];
this.arraylength;
this.currentarray;
this.template = [];
this.group = [];
this.stackposition = stack.indexOf(this.selected);
this.stackvisible = false;
this.labelstack = stack[this.stackposition + 1];
this.previouslabelstack =stack[this.stackposition - 1];
this.selected;
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
    console.log(item)  
    group.push({label:arrrobj[item].keyname, value:false}); 
    if (group.length == 3){
       let itemo = {keyname : group, key:'Select income Type',datatype:'formgroup' };
       currentarr.push(itemo);
      // console.log(itemo , 'Item passed');
       //arraybreak.push(currentarr);
      }   
}else {
    currentarr.push(arrrobj[item])     
   }
})
  arraybreak.push(currentarr);
let i = {success :{}, error:{}};
    i.success = this.populate(this.selected, 
        'success', 
        'check-circle-o',
         'Your '+this.selected+'information was updated successfully',
        'click the button below to update or modify the next section of your profile, you can also check and moderate your privacy settings and control the information prospective landlord can see about you. '
        );
    this.template.push(i);
arraybreak.push(i)
this.arraybreak = arraybreak;
this.arraylength = this.arraybreak.length;
return  arraybreak;
}else{
    return undefined;
}

};
populate =  (selected, context, icon, header, body) => {
    let obj = {header, body, context, icon, header}
    return obj

 }
movestack = (context) =>{   
    if (context === "next"){
        if (this.stackposition + 1 > stack.length - 1){
            this.stackposition = 0;            
        }else{
            this.stackposition = this.stackposition + 1;
        }
    }else{
        if (this.stackposition - 1 < 0){
            this.stackposition = stack.length - 1;
        }else{
            this.stackposition = this.stackposition - 1;
        }
    }
    this.labelstack = stack[this.stackposition];
    this.previouslabelstack = stack[this.stackposition - 1]
}
navigator = (ass)=>{
let th = this;
if(this.currentpage  == 0){
    this.canPrev  = false;
    this.canNext = true;
    if (ass === "next"){
        this.currentpage = 1;
        this.currentarray = th.currentarray + 1;
        this.canNext = false;
        this.canPrev = true;
        this.stackvisible = true;
    }else{
        this.currentpage = 0;
        this.currentarray = th.currentarray - 1;
        this.canNext = true;
        this.canPrev = false
        this.stackvisible = false;
    }
}
else{
    this.canPrev =true;
    this.canNext = false
    if (ass === "prev"){
        this.canNext = true;
        this.currentpage = 0;
        this.currentarray = th.currentarray - 1;
        this.canPrev = false;
        this.stackvisible  = false;
    }else{
        this.currentpage = 1;
         this.currentarray = th.currentarray + 1;
        this.canNext = false;
        this.canPrev = true;
        this.stackvisible = true;
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
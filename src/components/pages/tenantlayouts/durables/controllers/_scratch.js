
import apiActions from './apiActions';
import {geojsonMaker} from './bing_leaflet';
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
export class NairaConverter{
    constructor(){        
        this.moderate = this.moderate.bind(this);   
        this.replaceComma = this.replaceComma.bind(this);     
        //this.replaceComma(val);
        
    }
    replaceComma=(val,start,end)=>{
        console.log( [val.slice(start, end), ', ', val.slice(end)].join('') , 'Comma Attempt')
        return  [val.slice(start, end), ', ', val.slice(end)].join('');
     
    }
    moderate (vall){
        let val = vall.toString()
        let returnlist;
        let n  = val.length
        let valuelist;
        let valuelist2;
        let valuelist3;
        switch(n){
           case(n == 4):      
            valuelist = this.replaceComma(val, 0,1);                 
            ;
            case( n >= 7 && n < 11):   
            console.log('case sat')      
            valuelist2 = this.replaceComma(val, 0,1); 
            valuelist = this.replaceComma(valuelist2, 6,7);                
            ;
            case(n >= 11):           
            valuelist3 = this.replaceComma(val, 0,1); 
            valuelist2 = this.replaceComma(valuelist3, 5,6);  
            valuelist = this.replaceComma(valuelist2, 11,12);               
            ;          
           default:
            valuelist = vall
         }
    returnlist  = valuelist;
  
    return returnlist;
    }


}
const url2 = 'https://maps.googleapis.com/maps/api/place/photo?';
const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?'
const key = 'AIzaSyD2M3_sIa7NQ9HOlNFmGWoGu2j363CMonw';
const api = new apiActions(url);
const api2 = new apiActions(url2)
export class PlaceLoader{
    constructor(){
          this.path;
            }
runquery(){
return new Promise((resolve,reject)=>{
    api.geturl_cors(this.path).then((data)=>{

    resolve(data);
            }).catch((err) =>{
                console.log(err)
                reject(err)
            })

            })
}
findpicture(obj){
    return new Promise((resolve,reject)=>{
    let photo_ref = obj.photo_reference;
    let height = 10000;
    let path =url2 + 'photo_reference='+photo_ref+'&height='+height+'&key='+key;
    resolve(path);
   
    });
    
}        
findplace(longitude, latitude,radius=5000, type, keyword = null){  
     return new Promise((resolve,reject)=>{
     this.path ='location='+latitude+','+longitude+'&radius='+radius+'&type='+type +'&key=' + key+'&keyword='+type;
     this.runquery().then((data)=>{
      let sendObj = [];
      data.results.map((item)=>{
      sendObj.push ({...item, latitude:item.geometry.location.lat, longitude:item.geometry.location.lng })
      })
      let c = new geojsonMaker(sendObj);
      let geoj = c.convertdata();
     resolve(geoj);
     }).catch((err) =>{
        console.log(err)
         reject(err)
            })
     });
}

}
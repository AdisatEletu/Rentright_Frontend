/**
 * Created by Adisat on 29/09/2017.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import   fetch from 'isomorphic-fetch';
import {Switch,Route} from 'react-router-dom';

import PropTypes from 'prop-types';

class HomeSearch extends Component{
    constructor(props){
        super(props);
        this.state ={ showCont:false, showModal:false, states :{}, promoted:{loading:false, error:false, results:undefined} ,query:{loading:false, error:false, results:undefined}}

        this.submit = this.submit.bind(this)
        this.sendobj = {};
    }

componentWillMount(){

}
submit = (e)=>{
 e.preventDefault();
  var th = this;     
    if (this.state.states !== {}) {
       let path = ""
      let keys = Object.keys(this.state.states)
      let lis = keys.map((item)=>{
        console.log(item)
        if (path == ""){
          path = item + "="+this.state.states[item];
        }else{
          path  += "&" +item + "="  + this.state.states[item] 
        }   
      this.setState({showModal:false, states:{}});       
      })
      
      console.log(path);
      /*this.props.loadMyQuery(path).then((res)=>{
        console.log(res);
      })*/
     this.context.router.history.push("/generalsearch/" + path);

    }


}
   handleInputChange = (event, name = undefined)=> {  
      
      let value; 
    let target;
    if (! name){
    try{
    target = event.target;
    value = target.type === 'radio' ? target.selected : target.value;
    name = target.name;
    }catch(err){
      value = event;
    }
  
    }
  else{
    if(name == "name"){
        value =  event.target.value;
    }else if(name == "all"){
        value = event
    }
    else {
        value = event.target.value
    }
  }
   console.log(name, value)
    this.setState({states:{
      [name]: value
    }});
  
    console.log(this.state);
 
  } 
componentDidMount(){

}


      render(){

        return(


                    <form method="GET" onSubmit={this.submit}  className = "t-md-10  t-full-height t-flex t-flex-column">
            <div className="t-md-10 t-justify-space-between t-flex ">
                <div className="home-search2 t-flex t-md-4 t-flex-column home-pad">

                    <div className="home-search-header t-md-10 museo">
                        Find Properties
                    </div>
                    <div className="home-search-des t-md-10 proxima">
                        Explore properties that suits your Personality on RentRight
                    </div>


                    <label className="home-search-label museo">Location </label>
                    <div className="home-search-items2 t-flex t-md-10">
                        <input type="text" className="t-md-10 home-search-key" onChange = {(e)=>this.handleInputChange(e, 'name')}  />
                    </div>
                    <div className="holderr t-md-10 t-flex t-justify-space-between">
                        <div className="half-holder t-flex t-flex-column t-md-48">
                            <label className="home-search-label museo">Budget</label>
                            <div className="home-search-items2 t-flex ">
                                <input type="text" className="t-md-10 home-search-key "   onChange = {(e)=> this.handleInputChange(e,'rent')} />
                            </div>
                        </div>

                        <div className="half-holder t-flex t-md-48 t-flex-column">
                            <label className="home-search-label museo">Size </label>
                            <div className="home-search-items2 t-flex  ">
                                <input type="number" className="t-md-10 home-search-key" onChange = {(e)=> this.handleInputChange(e,'footage')}  />
                            </div>
                        </div>
                    </div>

                    <div className="holderr t-md-10 t-flex t-justify-space-between">
                        <div className="half-holder t-flex t-flex-column t-md-48">
                            <label className="home-search-label museo">Property Type</label>
                            <div className="home-search-items2 t-flex  ">
                                <select className="t-md-10 home-search-key">
                                    <option selected className="home-search-key">

                                    </option>
                                    <option value="condo" >
                                        Condo
                                    </option>
                                    <option value="flat">
                                        Flat
                                    </option>
                                    <option value='self-contain'>
                                        Self-contain
                                    </option>
                                    <option value='dulpex'>
                                        Duplex
                                    </option>
                            </select>

                            </div>
                        </div>

                        <div className="half-holder t-flex t-md-48 t-flex-column">
                            <label className="home-search-label museo">Bedroom</label>
                            <div className="home-search-items2 t-flex  ">
                                <input type="text" className="t-md-9 home-search-key" onChange = {(e)=>this.handleInputChange( true, "all")}  />
                            </div>
                        </div>
                    </div>

                    <button type = "submit" className="home-search-button t-md-10 t-flex t-justify-center museo " >
                        <span>Find</span>
                    </button>
           
                </div>
            </div>

             </form>
        );

    }
}
const styles = {
    nobd:{
     borderStyle:'none',
        borderTopRightRadius: '0px',
        webkitBorderBottomRightRadius: '0px',
    },
    button: {
        borderRadius: '2px',
        borderStyle:'none',
        borderTopLeftRadius: '0px',
        webkitBorderBottomLeftRadius: '0px',
        height: '40px',
        padding: '0px 10px',
        backgroundColor: '#f6505c',
        fontSize: '15px',
        lineHeight: '40px',
        color: 'rgba(255,255,255,0.5)',
        fontFamily: "Museo",
        fontWeight: 400,

    }


}
HomeSearch.contextTypes = {
        router: PropTypes.object.isRequired,
    }
export default HomeSearch;
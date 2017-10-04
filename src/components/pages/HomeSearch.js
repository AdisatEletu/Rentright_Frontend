/**
 * Created by Adisat on 29/09/2017.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import { Anchor } from 'antd';
class HomeSearch extends Component{
    constructor(props){
        super(props);
        this.State={};

    }

    componentWillMount (){

            this.searchFunc()
            /*({
                units: response.body.search,
                total: response.body.totalResults
            });*/
    }

    componentDidMount (){

    }

    /*componentWillUpdate (){ (nextProps, nextState)

    } */

    componentWillReceiveProps (){

    }

    searchFunc (query){
        let url= "https://rentright.herokuapp.com/api/rentright/units/query/?";
        fetch(url).then((data) => {
            this.setState ({query:{loading:false, error:false,results:data}});
        }).catch((error)=>{
            console.log(error)
            this.setState({query:{loading:false, error:true, results:undefined}});

        })



    }

    updateSearch(){
        this.refs.query.value
    }

    render(){

        return(


            <div className = "global-search t-flex t-align-center">
                <div className="t-flex t-md-10 t-justify-space-around">
                    <input className = "t-md-3" type = "text" placeholder = "Search by place"/>
                    <select className = "t-md-3" type = "text" placeholder = "Search by property type">
                        <option selected  className = "place">Apartment type</option>
                        <option >
                            Condo
                        </option>
                        <option>
                            Flat
                        </option>
                        <option>
                            Self-contain
                        </option>
                        <option>
                           Duplex
                        </option>
                    </select>
                    <input className = "t-md-3" style = {styles.nobd} type = "text" placeholder = "Budget"/>   </div>
                <button style = {styles.button}> GO </button>
            </div>

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
        borderRadius: '0px',
        borderStyle:'none',
        borderTopLeftRadius: '0px',
        webkitBorderBottomLeftRadius: '0px',
        height: '40px',
        padding: '0px 10px',
        backgroundColor: '#f6505c',
        fontSize: '20px',
        lineHeight: '40px',
        color: '#fff',
        fontFamily: "Museo",
        fontWeight: 400,

    }


}
export default HomeSearch;
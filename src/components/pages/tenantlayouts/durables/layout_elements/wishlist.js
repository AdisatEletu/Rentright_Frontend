import React, {Component} from 'react';
import {Switch,Route} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Icon,Progress} from 'antd';


import  apiActions from '../controllers/apiActions';
import 'moment/locale/en-gb';
import 'moment';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import { notification } from 'antd';


export default class Wishlist extends Component{
    constructor(props){
        super(props);
        this.state = {wished:false, loading:false, style:{}, id: null }
        this.clicked = this.clicked.bind(this);
        this.likeAction = this.likeAction.bind(this);
    }
    clicked = (context)=>{
        if (this.props.clicked) {
            this.props.clicked(context);
        }
    }
    likeAction(){
        this.setState({loading:true});
        let api = new apiActions("https://rentright.herokuapp.com/api/rentright/users/wishlist/list/");
        let path = this.props.uuid;
        if (! this.state.wished){
            api.posturl(path, {identifier_id:this.props.uuid, unit_id:this.props.unit_id}).then((obj)=>{
                console.log(obj.results.id, 'id');
                this.setState({id:obj.results.id});
                this.setState({wished:true})
                this.clicked(true);
                this.setState({loading:false});
            }).catch((err)=>{
                this.setState({loading:false});
                this.setState({wished:false});
            })
        }else{
            if (this.state.id) {
                path = this.state.id;
                api = new apiActions("https://rentright.herokuapp.com/api/rentright/users/wishlist/");
                api.deleteurl(path).then(() => {
                    this.setState({wished: false});
                    this.clicked(false);
                    this.setState({loading: false});
                }).catch((err) => {
                    console.log(err);
                    this.setState({loading: false});
                })
            }else{
                this.setState({loading:false});
            }
        }
    }
    componentDidMount(){
        this.props.style ? this.setState({style:this.props.style}) : this.setState({style:{}})
        let api = new apiActions("https://rentright.herokuapp.com/api/rentright/users/wishlist/list/")
        let path = this.props.uuid ;
        api.geturl(path,true).then((item)=>{
            let liked = item.results.results;
            console.log(liked, 'liked def')
            console.log(liked.length, 'liked')
            if (liked.length > 0) {

                let checkExist = parseInt(liked.findIndex(i => parseInt(i.unit_id) === parseInt(this.props.unit_id)))

                console.log(checkExist, 'checked');
                if (checkExist != -1) {
                    this.setState({id:liked[checkExist].id})
                    this.setState({wished: true});
                }
            }

        }).catch((err)=>{
            console.log(err)
        })
    }

    render (){
        if ( !this.state.loading){
            return (
                <Icon type ={ this.state.wished ? "heart" : "heart-o"}
                      title = { ! this.state.wished ? "Add to your wishlist": "Remove from your wishlist"}
                      style = { this.state.wished?{color:'#ed4956',...this.state.style}:{color:'#fff',...this.state.style}}
                      onClick = {this.likeAction}



                />
            )
        }else{
            return(
                <Icon type ="loading"  title = "loading"/>
            )

        }

    }//render


}
Wishlist.PropTypes = {
    uuid:PropTypes.string,
    unit_id:PropTypes.number,

}
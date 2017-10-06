/**
 * Created by Adisat on 29/09/2017.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import   fetch from 'isomorphic-fetch';

class HomeSearch extends Component{
    constructor(props){
        super(props);
        this.state={ units: []}
    }

componentWillMount(){

}

componentDidMount(){

}


      render(){

        return(


            <div className="t-md-10 t-justify-space-between t-flex ">
                <div className="home-search2 t-flex t-md-4 t-flex-column home-pad">

                    <div className="home-search-header t-md-10 museo">
                        Find Properties
                    </div>
                    <div className="home-search-des t-md-10 proxima">
                        Explore properties that suits your Personality on RentRight
                    </div>


                    <form method="GET" onSubmit={} >
                    <label className="home-search-label museo">Location </label>
                    <div className="home-search-items2 t-flex t-md-10">
                        <input type="text" className="t-md-10 home-search-key" />
                    </div>
                    <div className="holderr t-md-10 t-flex t-justify-space-between">
                        <div className="half-holder t-flex t-flex-column t-md-48">
                            <label className="home-search-label museo">Price</label>
                            <div className="home-search-items2 t-flex  ">
                                <input type="text" className="t-md-10 home-search-key "/>
                            </div>
                        </div>

                        <div className="half-holder t-flex t-md-48 t-flex-column">
                            <label className="home-search-label museo">Size </label>
                            <div className="home-search-items2 t-flex  ">
                                <input type="text" className="t-md-10 home-search-key"/>
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
                                <input type="text" className="t-md-9 home-search-key" />
                            </div>
                        </div>
                    </div>

                    <div className="home-search-button t-md-10 t-flex t-justify-center museo " >
                        <span>Find</span>
                    </div>
                    </form>
                </div>
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
export default HomeSearch;
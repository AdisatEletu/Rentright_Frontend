/**
 * Created by Adizat on 11/07/2017.
 */
import React, {Component} from 'react';

function Panel(){
    return(

        <div className=" orangepanel">
            <h1 className="col s12 col m12"><i className="material-icons right ">search</i> Quick Search</h1>
            <div className="orangebg thepanel bxbelow">
                <input type="text" placeholder="Search Cities ..." className="bxallsides" />
                <div className="scheme bxallsides"><span className="left">Select Parameters</span><i className="material-icons  md-24 right">keyboard_arrow_down</i></div>
                <div style={{overflow: 'hidden', left: 0, width: '100%'}}>
                    <div className="scheme2 bxallsides left"><span className="left">Sel this</span><i className="material-icons  md-12 right">keyboard_arrow_down</i></div>
                    <div className="scheme2 bxallsides right"><span className="left">Sel this</span><i className="material-icons  md-12 right">keyboard_arrow_down</i></div>
                </div>
                <div className="schemebtn bxallsides">Find Properties</div>
            </div>
        </div>

    );
}

function AddProperty(){
    return (

        <div>
            <div className=" zplay1 leftpicture toppicture picture house1"><div className="hybridcover" /></div>
            <div className=" zplay1 rightpicture toppicture picture corporate"><div className="hybridcover" /></div>
            <div className=" zplay1 leftpicture bottompicture picture house3"><div className="hybridcover" /></div>
            <div className=" zplay1 rightpicture bottompicture picture interior3"><div className="hybridcover" /></div>
            <div className="cover zplay2 col  s12  valign-wrapper">
                <div className="row lock margin-top">
                    <h1 className=" lh whitef col s7 col m7 left ">RentRight by Algorism LTD</h1>
                    {/*<div class = "center-align col s6 offset-s3 center-align src">
                     <input type="text" id="autocomplete-input"  placeholder = "Search for neighbourhoods" class="autocomplete">
                     </div>*/}
                </div>
            </div>
        </div>
    );
}


export default class Content extends Component{



    render(){
        return(
            <div>

                <div className = "row zeropadding">
                    <div className = "prebottomexp row  blue lighten-3 zeropadding ">
                        <Panel/>
                        <AddProperty/>
                    </div>
                </div>


            </div>



        );

    }



}
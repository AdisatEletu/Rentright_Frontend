import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {getPropertiesNoDispatch} from "../../../../../state/actions/userActions";
import {VelocityTransitionGroup} from 'velocity-react';
require('velocity-animate');
require('velocity-animate/velocity.ui');

class TopSection extends Component {

    constructor(props){
        super(props);

        this.state = {
            fetching: true,
            properties: [],
            current_index: 0,
            current_unit: 0,
        }
        this.onPropertyReceivedCallback = this.onPropertyReceivedCallback.bind(this);
    }


    componentDidMount(){
        const params = {
            include: 'units.applications'
        }
        getPropertiesNoDispatch(params,this.onPropertyReceivedCallback);
    }

    onPropertyReceivedCallback = (status,data) => {
        console.log(data);
        if(status){
            this.setState({fetching:false,properties:data});
        }
    }

    getPropertyAnalysis(index){
        const property = {...this.state.properties[index]};

        const units = property.units.data.length;
        const vacant = property.units.data.filter((unit)=>unit.available === true).length;
        const occupied = property.units.data.filter((unit)=>unit.available === false).length;
        return (
            <ul className={'DAWl'}>
                <li className={'TiT'}>Property: <span>{property.name}</span></li>
                <li className={'TT'}>Units <span> {units}</span></li>
                <li className={'VCT'}>Vacant <span> {vacant}</span></li>
                <li className={'OCPD'}>Occupied <span> {occupied}</span></li>
            </ul>
        );
    }

    getTransactionAnalysis(index,unit){
        const property = {...this.state.properties[index]};

        const units = property.units.data;

        let applications =units[unit].applications.data.length;
        let accepted = units[unit].applications.data.filter((application)=>application.accepted_at !== null).length;
        let rejected = units[unit].applications.data.filter((application)=>application.rejected_at !== null).length;

        return(
            <ul className={'DAWl'}>
                <li className={'TiT'}>Unit: <span>Unit {units[unit].number}</span></li>
                <li className={'TT'}>Total <span>{applications}</span></li>
                <li className={'OCPD'}>Accepted <span>{accepted}</span></li>
                <li className={'VCT'}>Rejected <span>{rejected}</span></li>
            </ul>
        );
    }

    navigate = (navigation) => {
        switch (navigation){
            case 'next' :
                const position = this.state.current_index;
                if(position < this.state.properties.length-1){
                    this.setState({current_index:position+1,current_unit:0});
                }else{
                    this.setState({current_index:0,current_unit:0});
                }
                break;

            case 'previous':
                const current_position = this.state.current_index;
                if(current_position > 0){
                    this.setState({current_index:current_position-1,current_unit:0});
                }else{
                    const prev = this.state.properties.length-1;
                    this.setState({current_index:prev,current_unit:0});
                }
                break;

            default: this.setState({current_index: navigation,current_unit:0});
        }
    }



    render() {

        if(this.state.fetching){
            return(
                <div className={'row'}>
                    <div className={'col s4'}>
                        <div className={'card-panel'}>
                            <div style={{height:'30px', marginBottom:'10px'}} className={'animated-background'}/>
                            <div style={{height:'130px'}} className={'animated-background'}/>
                        </div>
                    </div>
                    <div className={'col s4'}>
                        <div className={'card-panel'}>
                            <div style={{height:'30px', marginBottom:'10px'}} className={'animated-background'}/>
                            <div style={{height:'130px'}} className={'animated-background'}/>
                        </div>
                    </div>
                    <div className={'col s4'}>
                        <div className={'card-panel'}>
                            <div style={{height:'30px', marginBottom:'10px'}} className={'animated-background'}/>
                            <div style={{height:'130px'}} className={'animated-background'}/>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className={'row'}>
                <div className={'col s4'}>
                    <div className={'card-panel'}>
                        <div className={'row'} style={{marginBottom:'0'}}>
                            <div className={'col s5'} style={{paddingLeft:'0'}}>
                                <h5><b>Properties</b></h5>
                            </div>
                            <div className={'col s7'} style={{paddingRight:'0'}}>
                                <select onChange={(e)=>this.navigate(e.target.value)} className="browser-default" value={this.state.current_index}>
                                    {this.state.properties.map((property,index) => <option key={index} value={index}>{property.name}</option>)}
                                </select>
                            </div>
                        </div>


                        <div style={{minHeight:'230px'}}>
                            <VelocityTransitionGroup enter={{animation: "transition.slideRightIn"}}>
                                {(this.state.current_index%2) === 0 ? this.getPropertyAnalysis(this.state.current_index) : undefined}
                                {(this.state.current_index%2) !== 0 ? this.getPropertyAnalysis(this.state.current_index) : undefined}
                            </VelocityTransitionGroup>
                        </div>
                        <div className={'CWf'}>
                            <span onClick={()=>this.navigate('previous')} className={'P'}><i className={'fa fa-angle-left'}/> Previous</span>
                            <span onClick={()=>this.navigate('next')} className={'N'}>Next <i className={'fa fa-angle-right'}/></span>
                        </div>
                    </div>
                </div>
                <div className={'col s4'}>
                    <div className={'card-panel'}>
                        <div className={'row'} style={{marginBottom:'0'}}>
                            <div className={'col s5'} style={{paddingLeft:'0'}}>
                                <h5><b>Applications</b></h5>
                            </div>
                            <div className={'col s7'} style={{paddingRight:'0'}}>
                                <select className="browser-default" onChange={(e) => this.setState({current_unit:e.target.value})} value={this.state.current_unit}>
                                    {this.state.properties[this.state.current_index].units.data.map((unit,index) => <option key={index} value={index}>Unit {unit.number}</option>)}
                                </select>
                            </div>
                        </div>
                        <div style={{minHeight:'230px'}}>
                            <VelocityTransitionGroup enter={{animation: "transition.slideRightIn"}}>
                                {(this.state.current_unit%2) === 0 ? this.getTransactionAnalysis(this.state.current_index,this.state.current_unit) : undefined}
                                {(this.state.current_unit%2) !== 0 ? this.getTransactionAnalysis(this.state.current_index,this.state.current_unit) : undefined}
                            </VelocityTransitionGroup>
                        </div>
                        <div className={'CWf'}>
                            <span className={'N'}><Link to={'/landlord/units/'+this.state.properties[this.state.current_index].units.data[this.state.current_unit].uuid+'/applications'}>Manage <i className={'fa fa-angle-right'}/></Link></span>
                        </div>
                    </div>
                </div>
                <div className={'col s4'}>
                    <div className={'card-panel'} style={{height:'343.649px'}}>
                        <h5><b>Quick Actions</b></h5>
                        <div className={'QAT'}>
                            <div  className={'QATR'}>
                                <Link style={{display: 'block'}} to={'landlord/new_property'}>
                                    <img className="icon icons8-Building" width="50" height="50" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAADyElEQVRoQ+2ZjbEMQRSFz4sAESACRIAIEAEiQASIABF4LwJEgAgQASJABNS31WfrVuuZ6d4e01vqddXWzuvtnu5zf879eSfqHxcl/ex/Td8bTvq265ak95KuSvrW+a6u7WsBuS3pQ9dNOjefA0kCtGlZI1dGmdiaGsHhP0kaYmatQB5JuhvMGca6LulzmvNzDYu9lfSq0zX221uAPJP0VNKXQLcAuZbmeKmfl4B4HwSBBrtHLRAkjdmcSXoQTo0+wjRUXGtaFswTSS97kdQCAQSxAmeO0o5xBCm3+ggmeVnSjV6SqAFiyd2ThF3nIzJVK2tZ090mNgcECb+RdtF7i0FmgLBMHE1nzgE5lXQ/McuS8zYdOrH4ccoOIitWv3cOCOrGfvGNLYb9EEtoHnNAkAymteUgrqCZ5rHk7FDta0nfe1ll5maOKTm1N4FZAmJ6fS4J9voXY5UzDgHCwUR4BqYAJQPyZpp7mLSHWSJt2Ii5uO9dCILDgMD9jsR8AwS7xqdgN565PPMAgU6Zi/tgRD6MYUDWNq9hQJDsi4QG34GmkfidpBFyJzQCSRDp0QhzPLMPLXlf1Ah7XC6jWZy/lEkUBXmIj2BCNgsA8Ow0BnZDwlwIAGTDH9Mc81zsQgJm87RG8gsC5lKt+g8BUvvu2nUl07Jglu63P2NpYekQTITUhQH7IHm0hPTNZEiTIgwzQktoLe5DS25WzAGZo3zqor3pHQIkRnzXEs7LfiUzAhxgMCMOxK/ivhjBS0BqsgqEuM/LDgFSazK161pYK292dJlW7QVr15WA2CyjCUaG+6sKPUaNuNji4mY8C6VbI5HjayXtdfgKBVNMUfwbqQskQK0f8znm+OTdy24gPdmvUxQuRuxwvQFAsms0kANx3paf2w1ky+w3BsjVTWtLIJgdWnLmHLv8q2vEqkdiDBdHxBE3DzAlSuVoHlyQ2OJ9kYlqhLUqEPKrmDQSfXFKgzM1/k4gnTO1BMQpQlkVCNJ3t5EUAdUjfeZ4dkLJxdEAIPl4H9+sscnEOMIcWpwaPufo40jMx+ZoflMgP4LD0lJyI4MLxkbD0BSF7Bfp5SOmFPiSS12XvW718LdJYRiQKNmS+mlIt7Q9hwGZKnpyRvkaSl3A8bs7K/FfCVNAfI5THAhjVdaqBUI6YtZiT0xRTNlzcYRLsy52ZoYAqU0uj960jgKIUwk31WJDDWfngyTj8FqYqcXZS2dMCaF0xi7dKRVWU+2ZWglvvY6a5nSqQsylvfXlWs7bNTqWSt2WFw5dew5kqPgLh/83GvkDCWNlQoN02kIAAAAASUVORK5CYII="/>
                                    <span>Add<br/> Property</span>
                                </Link>
                            </div>
                            <div className={'QATL'}>
                                <Link style={{display: 'block'}} to={'landlord/add_tenant'}>
                                    <img className="icon icons8-Add-User-Male" width="50" height="50" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAFMUlEQVRoQ93Zj7EkUxQG8LMRIIIlAisCRMBGwEaACBABImAjQARWBIgAESAC6jfV31S/ft19b8/t2rflVk3N9PS9p893/p/Tj+p/sh6dhOP1qnq7qt6cPsi+mGj/fNIzdsmMAvmoqj6tqicNZn+oqm9m4E7HdguQD6vqg6p6b5L+n1WFURr4e8EhDdnnzGvTvmcr+4aBHQHCfL6dmPqnqn6dGPu6gwtnac7n36p6fzrfcbRvyxEgGP6kqr6sqi/6yN/bxQRpDph3quqPG+ncO9YLhIn8XlU/ThoZeX7A/DJpZoTW9WwvkI8nsyJFJjW6mNhXVcVfvhsl5nwvEA8Toeb7OfD3k+MyO1Fp6ex7PDIrJvbWywTCruc5gvMyNU6PoXcnZgC2V+7Ys/954ABk2Fd6NZLkJpRa0ZDo457/mV/CbIRMQzFFv59WVYTg2/qsqnoi367ijgAh9ezHNEbWGADKx/15oiR15/zH0aO1aHHIwnqBCLefH/CpFlNA/TWF4NbervsPBSQ5qff5TTA9hJgDbXD2nv3Nh04ZXvjlX3xkOKS3GEsiVE9x1lZx2APCHnTUZ/wIGEFiaLWAcNqfpgycyDX0wMVhNJX/b4wSfWggtEI7ND+0WkBiWrK2suLsJan+9jJMC+NRvwx8pARpgT613mppBDPxE7FfhGEOo0vEAoQ2TgkgPUACBoAzSu+Yq8wuWp2i5V4gwCS7jxZ5Z9G5YxVHgESSz6ea6RbzSsHIpFKA3kLn3pkjQBxO1XtrgxVtpGo+BQQiR4GQKKe/xVdS9Y5odBP4ESBAGD5k8HAktzgLPPMkCC3uqZVCLxBtLgAYSR/hP6aGqb0FhDJHkEBD2H08AXF2uDvsMS0OqfL1rXBUCUeS8RdheWvo5pxZGAHoDlMoZsZlaKekN2IaCsNbGiFFSQvj+nKSXOsGk50TCJTjJMwf5AjfBOD3slQHDk1TSyDQ4j9ZmQO4zkDwkI9gHghgEPaAPWlhCFCmNl8AYJTm9s7Tmn2q4AhiraxHg0Zp7545LjXCDAAR531vNTzukdiSaCYtzs2Zx6xAocRZ84n5QIL0M0vOXudpl/YswNG6rjmQtJ894XFpUqtSmnxr7mMYWgLBoGCAFzz4bGlwbo58ld9d9gZIhm09ICKFpUkxoQBaBgmmtzZRjCbw4Uxvy5vJJ80BcwWiL0CMdI5GjyUgzMTJtwBEGDShStgCgWEaXMs5qRIuczHMRxujc9gAwlQLACBpD/am+0aqe4Pza68ECPVkoHZa7dNBKM8lgC0rAEQC3iowI4xngCzHoR08nLIFky2fbAHBCCG8AKSH4Cmcz4ikJWiZcw8QingcICNvoW4BuTZmSiRq0aOB+duuS9pYAyLRSYix27XrvHLOa+n5NWknjLo/v/bbfykk530JcPJTpvQAefayPBHF5tXGpeZbA0KdGfWnh4gJLCWZ6zRaSZTJT8vhNwfHHADK+tYrhV7TuuQOm+emNb9ehsgtIJHskvHlNXvO64mLkzZmWi0gtGeq/3wNCFWxu5gHKZI0leadSFSbkiFFHg26x96TK9zLcC8VcfKMQnNvmNECEr96GiBHur2WM/beT+S6lhkrB1PxRjDzLSlvVNlPkkeo+9TWsxMNDWJoKwwnWa4lTOUNU7+YNSAIMSd/6tgeajE3vtpa+PU2Gb/XYNHbs7eIj9yPIPUarAKYNeuwzx7+6/ediPcqAIkQBARaYRV5GyzgJBel3pLj7L0D9lUCAhCmRTYf/qH9tTK5ERhWh+j/ATZ4be9szHljAAAAAElFTkSuQmCC"/>
                                    <span>Add <br/>New Tenant</span>
                                </Link>
                            </div>
                        </div>

                        <div className={'QAB'}>
                            <div className={'QABR'}>
                                <Link style={{display: 'block'}} to={'landlord/transactions'}>
                                    <img className="icon icons8-Transaction-List" width="50" height="50" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAA8ElEQVRoQ+2Y0Q2DMAxEjw26QVdo9x+idAJWQZZoZUXkwyInHOvyA0Jwdu4RTmFBkbEUmQc0kWwkRURESA6Ue7UeADYAdvRjBfA+LvTuGe2xr2nan6OA9dE7/39+rUkTeDZdfQG83ETO7hk9EV/TtK2mDeujd64cGU3hsl65xX7ZkbsFRORuAm39H5HMOeJ7njpH2oA+yxTlSLYlIiIiwnKgXCAqRwivSrsfUY4QTOZLllvsfMvIFUSEbHBYfob9iP5rhbFmeECLPQMF34OIiAjJgRlyRP+1SPC5svpqcf2Nq4tI3DPuEyLC9TeuXobIDug+QDOA1WklAAAAAElFTkSuQmCC"/>
                                    <span>View Transactions</span>
                                </Link>
                            </div>
                            <div className={'QABL'}>
                                <Link style={{display: 'block'}} to={'landlord/bank_accounts'}>
                                    <img className="icon icons8-Merchant-Account" width="50" height="50" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAC5klEQVRoQ+2Zi3HUMBCG/1RAUgFQQaAC6ACoAKiAUAFQAVABUEFIBYEKIBUAFRAqgPlAe6PsRdbDso5krJmbO+tkab99WVrv6Zq0vWvCoRWk0JKPJb0MY/n+UHhf9bClLHJf0mtJd5xEXyU9l/SpWtLMDb1BAHghiW/aD2eRm6EfkFc9gXqBeIBfAeCNU+RR6L/RG2guyK1ggSdBMAAQns95whv2JQHEx4DeBwt9b3W5VpASAMbEcWLxYcJ2BaoFYXGEMwugQDIR2o0tAMQXSYyPG2PuSoo1zxgsSIazhoVICimrbhmuFITFngWBTTgASKmXucNHSQ8kfZb0MKxK3z1JJ1FfLBDwzGdAQAD4tgQoB1ILYIL9DNY4iIRgLvoBvz0RC01AUyBYAA2ZBdAu1yXPALRJIMcgCPgtpGR+5xqZkPWwIo05ucZCRa5lT2NbrAbAFjDXAvpR6DwOz5eUa6XAPBAW3doleIsQoPY0PgsxUWIBLwRKIEtZerX/Sc/8VxzE0cQAETOHoY/5SRx/mwf5HfqfSiJzzGkIzMKmGBYm27VAxHIwxzsvfwoklwTmAPa41xS+kTMF0mOxEXMkQYgHyxIjBJmzxoWkkXMhb8ItkwZJdjVuo4gVxPnEapHMY8A8JuXSq2utwb5Qdltda3Wt1bX+aeC/S7+c3zl0dW+jtyjdAWzCkSCc/SmncjDyZaIWQA5oVtg7HwnCaZGCRu9GMeJoJIiViDhnc+yd2zhCU2PAMgcjQbKZp4FsM+dVATFrwhpXTyZBTqP3Gw1K2rqleCs+sZgJ7JPUJIi/aS5MDxCrXCIL9TYrMRWB5NyuFnBYjHiXurIgsUvV1mdLrOMtYuVZC97a6wt7sFjrS5g+BvTzA0Ad13y+9joLUqLdmjE9gj213qXBvlSVcThIjZZbxloK7b1F4VXFfu/MNAW4001ji+ZT97B1500T23j/AqhlHSzBNp45s9v4lgV2cs9I11oU8A/8QCJCnM4vugAAAABJRU5ErkJggg=="/>
                                    <span>Manage<br/> Bank Accounts</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default TopSection;


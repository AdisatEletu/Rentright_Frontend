import React, {Component} from 'react';
import {Icon,Alert} from 'antd';
import PropTypes from 'prop-types';

class SignPad extends Component {

    state = {
        warning:false,
    }

    componentDidMount() {
        //get the canvas
        const wrapper = document.getElementById("signature-pad");
        this.canvas = wrapper.querySelector("canvas");
        this.signaturePad = new window.SignaturePad(this.canvas);

        this.resizeCanvas();
    }

    saveSignature(){
        if (this.signaturePad.isEmpty()) {
            this.setState({warning:true});
        } else {
            const dataURL = this.signaturePad.toDataURL();

            this.props.onSignatureReceived(dataURL);
        }
    }

    clearSignature(){
        this.signaturePad.clear()
    }
    // Adjust canvas coordinate space taking into account pixel ratio,
// to make it look crisp on mobile devices.
// This also causes canvas to be cleared.
     resizeCanvas() {
        // When zoomed out to less than 100%, for some very strange reason,
        // some browsers report devicePixelRatio as less than 1
        // and only part of the canvas is cleared then.
        const ratio =  Math.max(window.devicePixelRatio || 1, 1);

        // This part causes the canvas to be cleared
        this.canvas.width = this.canvas.offsetWidth * ratio;
        this.canvas.height = this.canvas.offsetHeight * ratio;
        this.canvas.getContext("2d").scale(ratio, ratio);

        // This library does not listen for canvas changes, so after the canvas is automatically
        // cleared by the browser, SignaturePad#isEmpty might still return false, even though the
        // canvas looks empty, because the internal data of this library wasn't cleared. To make sure
        // that the state of this library is consistent with visual state of the canvas, you
        // have to clear it manually.
        this.signaturePad.clear();
    }

    render() {
        const {warning} = this.state;

        return (
            <div id="signature-pad" className="landlord signature-pad">
                <div className={'row d-no-mrgn-bottom'}>
                    <div className="signature-pad--header">
                        {warning ? <Alert message="Please provide a signature first." banner /> : undefined}
                    </div>{/*<button onClick={this.clearSignature.bind(this)} type="button" className="button clear" data-action="clear">Clear</button>*/}
                </div>
                <div className={'row d-no-mrgn-bottom'}>
                    <div className={'col s12 m1 d-npd-left control-panel'}>
                        <ul>
                            <li>
                                <Icon type="edit" style={{fontSize:'25px'}} />
                            </li>
                            <li className={'active'}>
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZBAMAAAA2x5hQAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAnUExURQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAN0S+bUAAAANdFJOUwTROu+n/RJe5I8pdb+Szr1UAAAAzklEQVQYGWNgQAOTAxUQIomhrWYI3lEplnA4jzswgTsazuMIYuAMZ1gE5ZceYOAJYgkVgHCnFjCkGrh2REF4RxcwlDpFJIZBeKIJDKKa0UsFshUYqhcwtDKwBzJGuW44aqAROoFBNIExnCMogiU0yPR4AoNrwdYDjKHhU5uDI4FaS0+ZLuAMnRm8ONQByEuOiGQAOtWIJwRkKnuoALupcMwChgQILzQ0BMwC8VSjD7cogBhg0FoAZYApT2QOGlsJCSxgCEUCDgwuSGADqj4A6ow2kFDG8d0AAAAASUVORK5CYII="/>
                            </li>
                            <li>
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZBAMAAAA2x5hQAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAwUExURQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFo/HAsAAAAQdFJOUwP97yzeVMSmGZlzg7fTwJFJBs38AAAAmUlEQVQYGWNgAAKOg0ILQDQEsAsKisLYDAyBgoJCDTAuh6KgoGABjMcnKBuIULpQUJgbrpRZUHABw0XBBIhSXkE5BgZDQWkI76OgBgMDl6CgAYjLKigYAKQOCl4AkgwsguIgqgmi1FDQA8RjFRQDUYZQi4nhqbiAAEwl0M0gADUFwoHxhJRAAMYrAFnEQBmvc2YA2JSZsxgYAHQFG5GaVNHYAAAAAElFTkSuQmCC"/>

                            </li>
                        </ul>
                    </div>
                    <div className={'col s12 m11'}>
                        <div className="signature-pad--body">
                            <h4 style={{marginBottom:'10px'}} className={'center'}>Sign in the box below</h4>
                            <canvas/>
                        </div>
                    </div>
                </div>

                <div className={'row signature-pad--footer d-no-mrgn-bottom'}>
                    <div className={'col s6'}>
                        <span className={'confirmation'}>
                            I understand this is a legal<br/>
                            representation of my signature
                        </span>

                    </div>
                    <div className={'col s6'}>
                        <button onClick={this.saveSignature.bind(this)} type="button" className="button save right" data-action="save-png">Accept Signature
                        </button>
                    </div>
                </div>
            </div>
        );
    }

}

SignPad.propTypes = {
    onSignatureReceived: PropTypes.func.isRequired
}
export default SignPad;


import React, {Component} from 'react';

class Loader extends Component {

    render() {
        return (
            <div className="svg-wrap">
                <svg width="200px" height="200px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" className="lds-ellipsis">
                    {/*circle(cx="16",cy="50",r="10")*/}
                    <circle cx={84} cy={50} r={0} fill="#faa61a">
                        <animate attributeName="r" values="10;0;0;0;0" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="2.5s" repeatCount="indefinite" begin="0s" />
                        <animate attributeName="cx" values="84;84;84;84;84" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="2.5s" repeatCount="indefinite" begin="0s" />
                    </circle>
                    <circle cx={84} cy={50} r="8.54959" fill="#0a3b61">
                        <animate attributeName="r" values="0;10;10;10;0" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="2.5s" repeatCount="indefinite" begin="-1.25s" />
                        <animate attributeName="cx" values="16;16;50;84;84" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="2.5s" repeatCount="indefinite" begin="-1.25s" />
                    </circle>
                    <circle cx="54.9314" cy={50} r={10} fill="#faa61a">
                        <animate attributeName="r" values="0;10;10;10;0" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="2.5s" repeatCount="indefinite" begin="-0.625s" />
                        <animate attributeName="cx" values="16;16;50;84;84" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="2.5s" repeatCount="indefinite" begin="-0.625s" />
                    </circle>
                    <circle cx="20.9314" cy={50} r={10} fill="#0a3b61">
                        <animate attributeName="r" values="0;10;10;10;0" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="2.5s" repeatCount="indefinite" begin="0s" />
                        <animate attributeName="cx" values="16;16;50;84;84" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="2.5s" repeatCount="indefinite" begin="0s" />
                    </circle>
                    <circle cx={16} cy={50} r="1.45041" fill="#faa61a">
                        <animate attributeName="r" values="0;0;10;10;10" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="2.5s" repeatCount="indefinite" begin="0s" />
                        <animate attributeName="cx" values="16;16;16;50;84" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="2.5s" repeatCount="indefinite" begin="0s" />
                    </circle>
                </svg>
            </div>
        );
    }

}

export default Loader;


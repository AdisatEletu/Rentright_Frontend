import React, {Component} from 'react';
import ReviewCard from "./ReviewCard";

class Reviews extends Component {

    render() {
        return (
            <div style={{display:'table'}}>
                <ReviewCard/>
                <ReviewCard/>
                <ReviewCard/>
            </div>
        );
    }

}

export default Reviews;


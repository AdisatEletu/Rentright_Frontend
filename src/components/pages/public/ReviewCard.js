import React, {Component} from 'react';
import {Icon} from "antd";

class ReviewCard extends Component {

    render() {
        return (
            <div className={'review-card'}>
                <div className={'REVIMG'}>
                    <img src={'https://mir-s3-cdn-cf.behance.net/user/115/8e8da671481343.5a12b9bddcc6b.jpg'}/>
                    <span className={'REVNAM'}>Adisat .E</span>
                    <span className={'REVLOC'}> Lagos, Nigeria</span>
                    <span className={'REVICOS'}><Icon type="edit" /> 923 | <Icon type="like" /> 78</span>
                </div>
                <div className={'REVDTSEC'}>
                    <div className={'REVSTRR'}>
                        <Icon type="star" />
                        <Icon type="star" />
                        <Icon type="star" />
                        <Icon type="star-o"/>
                        <Icon type="star-o"/> <span>Reviewed Yesterday</span>
                    </div>

                    <div className={'REVTITLE'}>
                        Very Awesome Guy
                    </div>
                    <div className={'REVCONT'}>
                        <span className={'txt'}>The Aria is superbly centrally located just a few steps away from St Stephen's Basilica and from wonderful dining like Borkonyha and Aszu, and a couple of blocks from the shopping street of Andrassy.

                        The lobby has a welcoming vibe with live performance and cocktail, and the rooftop bar has a really nice background of the basilica dome.
                        </span>
                        <span className={'more'}>More</span>
                    </div>
                    <div className={'ACTN'}>
                        <div className={'THNKS'}><Icon type="like" /> Thank Adisat .E</div>
                        <div className={'REPFLG'}><Icon type="flag" /></div>
                    </div>


                </div>
            </div>
        );
    }

}

export default ReviewCard;


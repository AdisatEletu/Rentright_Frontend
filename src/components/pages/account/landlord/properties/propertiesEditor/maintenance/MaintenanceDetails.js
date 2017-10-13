import React, {Component} from 'react';
import {getSingleComplaint,addComment} from "../../../../../../../state/actions/maintenanceActions";
import PropTypes from 'prop-types';
import Loader from "../../../../../../shared/Loader";
import {Upload,Modal,Icon,Steps,Input,Button,notification} from 'antd';
import {addComplaintImageUrl, getImage} from "../../../../../../../utils/ApiManager";
import * as moment from 'moment';
import isEmpty from 'lodash/isEmpty';

const Step = Steps.Step;
const { TextArea } = Input;

class MaintenanceDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fetching: true,
            addingComment: false,
            previewVisible: false,
            previewImage: '',
            comment: '',
            complaint: {}
        }

        this.onComplaintReceivedCallBack = this.onComplaintReceivedCallBack.bind(this);
        this.handlePreview = this.handlePreview.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleAddComment = this.handleAddComment.bind(this);
        this.onCommentChange = this.onCommentChange.bind(this);
        this.onAddCommentCallback = this.onAddCommentCallback.bind(this);
    }

    componentDidMount() {
        const params = {
            uuid: this.context.router.route.match.params.complaint,
            include: 'images,activities',
        }
        getSingleComplaint(params, this.onComplaintReceivedCallBack)
    }

    handleCancel = () => this.setState({previewVisible: false})

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleChange = ({fileList}) => this.setState({fileList});

    onCommentChange = (e) =>{
        this.setState({comment:e.target.value});
        console.log(this.state.comment);
    };

    handleAddComment() {
        if(isEmpty(this.state.comment)){
            return;
        }
        this.setState({addingComment:true});
        const params = {
            uuid: this.context.router.route.match.params.complaint,
            comment: this.state.comment,
        }
        addComment(params,this.onAddCommentCallback);
    }

    onAddCommentCallback = (status,data) => {
        if(status){
            const complaint = {...this.state.complaint};

            complaint.activities.data.push(data);
            notification.success({
                message: 'Success',
                description:'Comment added successfully',
            })
            this.setState({complaint,addingComment:false,comment:''});
        }

    };

    onComplaintReceivedCallBack(status, data) {
        if (status) {
            console.log(data);
            const  fileList = [];

            for(let i = 0; i <data.images.data.length; i++){
                fileList.push({
                    uid: data.images.data[i].id,
                    name: data.images.data[i].image,
                    status: 'done',
                    url: getImage(data.images.data[i].image),
                })
            }
            this.setState({complaint: data, fileList ,fetching: false});
        }

    }

    render() {
        if (this.state.fetching) {
            return <Loader/>;
        }

        const { previewVisible, previewImage, complaint,fileList} = this.state;

        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        return (
            <div className={'row'}>
                <div className={'col s12 m8'}>
                    <div className={'card-panel'}>
                        <h3>{complaint.title}</h3>
                        <div><span style={{fontSize:'18px'}}>{complaint.type}</span> <span style={{fontSize:'12px'}}>| {moment(complaint.created_at.date).fromNow()}</span></div>
                        <blockquote>
                            {complaint.description}
                        </blockquote>
                        <div className={'complaint-image-upload clearfix'}>
                            <Upload
                                action={addComplaintImageUrl(complaint.uuid)}
                                listType="picture-card"
                                fileList={fileList}
                                onPreview={this.handlePreview}
                                onChange={this.handleChange}
                                onRemove={() => false}
                            >
                                {fileList.length >= 2 ? null : uploadButton}
                            </Upload>
                            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                <img alt="complint image" style={{ width: '100%' }} src={previewImage} />
                            </Modal>
                        </div>
                    </div>
                    <div className={'complaint-activities'} style={{padding:'24px'}}>
                        <h3>Activities</h3>

                        <Steps direction="vertical" current={complaint.activities.data.length}>
                            <Step
                                title="Add Comment"
                                description={
                                    <div style={{paddingRight:'10px'}}>
                                        <TextArea disabled={this.state.addingComment} value={this.state.comment} onChange={this.onCommentChange} placeholder="Add Comment here" autosize={{ minRows: 3, maxRows: 6 }} />
                                        <div style={{marginTop:'10px'}} className={'clearfix'}>
                                            <Button onClick={this.handleAddComment} loading={this.state.addingComment} className={'right'} type="primary">Add Comment</Button>
                                        </div>
                                    </div>} />
                            {complaint.activities.data.map(
                                (activity)=><Step key={activity.id} icon={"clock-circle-o"} title={activity.text} description={moment(activity.created_at.date).fromNow()} />
                            )}
                        </Steps>
                    </div>
                </div>
            </div>
        );
    }

}

MaintenanceDetails.contextTypes = {
    router: PropTypes.object,
}

export default MaintenanceDetails;

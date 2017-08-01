import React, {Component} from 'react';
import {Progress, Table, Badge} from 'antd';

class ApplicationForm extends Component {

    render() {
        return (
            <div className="application-form">
                <BioLayer/>
                <AdverseItems/>
                <RentalHistory/>
                <EmploymentHistory/>
            </div>
        );
    }

}

function BioLayer(props) {
    return (
        <div className="form-row">
            <div className="row" style={{fontSize: '20px'}}>
                <div className="col m2">
                    <img alt="user avatar" className="img-responsive circle"
                         style={{height: '90px', width: '90px'}}
                         src="http://localhost:3000/assets/img/agent-01.jpg"/>
                </div>
                <div className="col m5">
                    <b>Odaibo Amadosi</b><br/>
                    Odaiboamadosi@gmail.com
                </div>
                <div className="col m5 right-align">
                    Credit Score as of <br/>
                    27/07/2017<br/>
                    <span className="big-text red-text darken-1" style={{fontSize: '25px'}}><b>0</b></span>
                </div>
            </div>
            <div className="row" style={{fontSize: '20px'}}>
                <div className="col m5">
                    <Progress type="circle" percent={75}/>
                </div>
                <div className="col m7 right-align">
                    <span className="tertiary-color-text"><b>0</b></span> adverse effects identified<br/>
                    <span className="tertiary-color-text"><b>2</b></span> previous residential locations<br/>
                    <span className="red-text">No credit check provided</span><br/>
                </div>
            </div>
        </div>
    );
}

function AdverseItems(props){
    const columns = [{
        title: 'Question',
        dataIndex: 'question',
    },{
        title: 'Answer',
        dataIndex: 'answer',
    }];

    const data = [
        {
            key: '1',
            question: 'Have you ever declared bankruptcy',
            answer: 'No'
        },
        {
            key: '2',
            question: 'Have you ever been convicted of a felony',
            answer: 'No'
        },
        {
            key: '3',
            question: 'Have you ever been evicted',
            answer: 'No'
        },
        {
            key: '4',
            question: 'Have you ever refused to pay rent',
            answer: 'No'
        },
        {
            key: '5',
            question: 'Do you smoke',
            answer: 'No'
        },
    ];
    return (
        <div className="form-row" style={{backgroundColor: '#eee'}}>
            <h4 className="center">Adverse Items</h4><br/>
            <Table columns={columns} dataSource={data} pagination={false}/>
        </div>
    );
}

function RentalHistory(props){
    const columns = [
        { title: 'Address', dataIndex: 'address', key: 'address' },
        { title: 'Period', dataIndex: 'period', key: 'res_period' },
        { title: 'Landlord contact', dataIndex: 'contact', key: 'landlord_contact' }
        ]

    const data = [
        {
            key: '1',
            address: '49 Raymond Njoku Street, Ikoyi Lagos Nigeria.',
            period: '2010 - 2016',
            contact:'Rasheed Adegoke | rasheed.adegoke@algorismng.com'
        },
        {
            key: '2',
            address: '17 Omorinre Johnson Street, Lekki Lagos Nigeria.',
            period: '2016 - now',
            contact:'Ifeoluwa Afolabi | afolabi.ifeoluwa@algorismng.com'
        }
    ]


    return (
        <div className="form-row" style={{backgroundColor: 'white'}}>
            <h4 className="center">Rental History</h4><br/>
            <Table
            columns={columns}
            dataSource={data}
            expandedRowRender={NestedTable}
            pagination={false}/>
        </div>
    );
}

function NestedTable(props){
    const columns = [
        { title: 'Question', dataIndex: 'question', key: 'question' },
        { title: 'Response', key: 'response', render: () => <span><Badge status="error" />Unanswered</span> }
    ];

    const data = [
        {
            key: '1',
            question: 'Has rented from you in the past'
        },
        {
            key: '2',
            question: 'Paid rent on time'
        },
        {
            key: '3',
            question: 'Took care of property while leaving there'
        },
        {
            key: '4',
            question: 'Left property in tidy order when lease was done'
        },
        {
            key: '5',
            question: 'Was disruptive to other tenants or neighbours'
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={data}
            pagination={false}
        />
    );
}

function EmploymentHistory(props){

    const columns = [
        {
            title: 'Company',
            dataIndex: 'company',
        },
        {
            title: 'Position',
            dataIndex: 'position',
        },
        {
            title: 'Employer contact',
            dataIndex: 'employer',
        },
    ];

    const data = [
        {
            key: '1',
            company: 'Algorism Nig Ltd',
            position: 'Software Developer',
            employer: 'Rasheed Adegoke | Support@algorismng.com | 08082315489'
        }
    ];
    return (
        <div className="form-row">
            <h4 className="center">Employment History</h4><br/>

            <Table columns={columns} dataSource={data} pagination={false}/>
        </div>
    );
}

export default ApplicationForm;


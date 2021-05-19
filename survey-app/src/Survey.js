import React from 'react';
import firebase from "firebase/app";
import "firebase/database";


var uuid = require('uuid');

var firebaseConfig = {
    apiKey: "AIzaSyBhY7gz_lpyD5oIsodCiVG1Yn-K_AO1DPE",
    authDomain: "survey-app-22380.firebaseapp.com",
    databaseURL: "https://survey-app-22380-default-rtdb.firebaseio.com",
    projectId: "survey-app-22380",
    storageBucket: "survey-app-22380.appspot.com",
    messagingSenderId: "36447056208",
    appId: "1:36447056208:web:8ec9d43c2d5c1132fafc55",
    measurementId: "G-RKKQ5CR9DG"
  };
  firebase.initializeApp(firebaseConfig);


class Survey extends React.Component{

    nameSubmit(event){
        var studentName = this.refs.name.value;
        this.setState({studentName: studentName}, function(){
            console.log(this.state);
        })
        
    }

    answerSelected(event){
        var answers = this.state.answers;
        if(event.target.name === "answer1"){
            answers.answer1 = event.target.value
        }
        else if(event.target.name === "answer2"){
            answers.answer2 = event.target.value
        }
        if(event.target.name === "answer3"){
            answers.answer3 = event.target.value
        }

        this.setState({answers: answers}, function(){
            console.log(this.state)
        })

    }
    questionSubmit(){
        firebase.database().ref('uSurvey/'+ this.state.uid).set({
            studentName: this.state.studentName,
            answers: this.state.answers
        });
        this.setState({isSubmitted: true});
    }

    constructor(props) {
        super(props)
    
        this.state = {
            uid: uuid.v1(),
            studentName: "",
            answers: {
                answer1: '',
                answer2: '',
                answer3: '',
            },
            isSubmitted: false,

        };
        this.nameSubmit = this.nameSubmit.bind(this);
        this.answerSelected = this.answerSelected.bind(this);
        this.questionSubmit = this.questionSubmit.bind(this);
    }
    
    render(){
        var studentName;
        var questions;

        if(this.state.studentName === '' && this.state.isSubmitted === false){
            studentName = <div>
                <h3>Hey Student, let us know your name</h3>
                <form onSubmit={this.nameSubmit}>
                    <input className="input_recv" type="text" ref="name"  placeholder="Enter your name:"  />
                </form>
            </div>;

        }else if (this.state.studentName !== '' && this.state.isSubmitted === false){
            studentName = <h1>Welcome to Survey, {this.state.studentName}</h1>
            questions = <div>
                <h2>Here are some questions:</h2>
                <form onSubmit={this.questionSubmit}>
                    <div className="card">
                        <label>What kind of courses you like the most</label>
                        <hr />
                        <input onChange={this.answerSelected} type="radio" name="answer1" value="Technlogy" />Technlogy
                        <input onChange={this.answerSelected} type="radio" name="answer1" value="Design" />Design
                        <input onChange={this.answerSelected} type="radio" name="answer1" value="Marketing" />Marketing
                    </div>
                    <div className="card">
                        <label>You are a:</label>
                        <hr />
                        <input onChange={this.answerSelected} type="radio" name="answer2" value="Student" />Student
                        <input onChange={this.answerSelected} type="radio" name="answer2" value="Lookin_for_a_job" />Looking for a job
                        <input onChange={this.answerSelected} type="radio" name="answer2" value="Update_job_role" />Update job role
                    </div>
                    <div className="card">
                        <label>Are online courses helpful?</label>
                        <hr />
                        <input onChange={this.answerSelected} type="radio" name="answer3" value="yes" />yes
                        <input onChange={this.answerSelected} type="radio" name="answer3" value="no" />no
                        <input onChange={this.answerSelected} type="radio" name="answer3" value="maybe" />maybe
                    </div>
                    <input className="feedback-button" type="submit" value="submit" />
                </form>
            </div>
        }else if(this.state.studentName !== '' && this.state.isSubmitted === true){
            studentName = <div>
                <h3>Hey {this.state.studentName}, thank you for taking the survey.</h3>
                </div>
        };
         
        return(
            <div>
                {studentName}
                -----------------------------------------------------------------------------------------------
                {questions}
            </div>
        );
    }
}
export default Survey;
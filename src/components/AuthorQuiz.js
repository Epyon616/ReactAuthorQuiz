import React from 'react';
import {connect} from 'react-redux';
import '../stylesheets/App.css';
import '../stylesheets/bootstrap.min.css'; 
import Hero from './Hero';
import Turn from './Turn';
import Continue from './Continue';
import Footer from './Footer';

const mapStateToProps = (state) => {
  return {
    turnData: state.turnData,
    highlight: state.highlight,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAnswerSelected: (answer) => {
      dispatch({type: 'ANSWER_SELECTED', answer });
    },
    onContinue: () => {
      dispatch({type: 'CONTINUE'});
    }
  };
}

function AuthorQuiz({turnData, highlight, onAnswerSelected, onContinue}) { 
    return (
      <div className="container-fluid">
        <Hero/>
        <Turn {...turnData} highlight={highlight} onAnswerSelected={onAnswerSelected}/>
        <Continue show={highlight === 'correct'} onContinue={onContinue} />
        <p>
          <a href="/add">Add an author</a>
        </p>
        <Footer/>
      </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorQuiz);
 
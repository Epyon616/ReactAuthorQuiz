import React from 'react';
import ReactDOM from 'react-dom'; 
import { shuffle, sample } from 'underscore';
import { BrowserRouter, Route } from 'react-router-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import './stylesheets/index.css';
import AuthorQuiz from './components/AuthorQuiz';
import AddAuthorForm from './components/AddAuthorForm';
import * as serviceWorker from './serviceWorker';
import authors from './dataStubs/authors';

const getTurnData = () => {
  const allBooks = authors.reduce((p, c) => p.concat(c.books), []);
  const fourRandomBooks = shuffle(allBooks).slice(0, 4);
  const answer = sample(fourRandomBooks);

  return {
    books: fourRandomBooks,
    author: authors.find((author) => author.books.some(
      (title) => title === answer,
    )),
  };
};

const reducer = (state = {
    authors, 
    turnData: getTurnData(authors), 
    highlight: ''
  }, action) => {
    switch (action.type) {
      case 'ANSWER_SELECTED':
        const isCorrect = state.turnData.author.books.some((book) => book === action.answer);
        return Object.assign({}, state, { 
          highlight: isCorrect ? 'correct' : 'wrong'
        });
      case 'CONTINUE':
        return Object.assign({}, state, { 
          highlight: '',
          turnData: getTurnData(state.authors)
        });
      case 'ADD_AUTHOR': 
        return Object.assign({}, state, { 
          authors: state.authors.concat([action.author]),
        });
      default:
        return state;
    }
}

let store = Redux.createStore(reducer);
 
ReactDOM.render(
  <BrowserRouter>
    <ReactRedux.Provider store={store}>
    <React.Fragment>
      <Route exact path="/" component={AuthorQuiz} />
      <Route path="/add" component={AddAuthorForm} />
    </React.Fragment>
    </ReactRedux.Provider>
  </BrowserRouter>, 
  document.getElementById('root'),
);

serviceWorker.unregister();

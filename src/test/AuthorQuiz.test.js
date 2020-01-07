import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AuthorQuiz from '../components/AuthorQuiz'; 

Enzyme.configure({ adapter: new Adapter() });

const state = {
  turnData: {
    books: ['The Shining', 'IT', 'David Copperfield', 'A Tale of Two Cities', 'Hamlet', 'Macbeth', 'Romeo and Juliet'],
    author: {
      name: 'Charles Dickens',
      imageUrl: 'images/authors/charlesdickens.jpg',
      imageSource: 'Wikimedia Commons',
      books: ['David Copperfield', 'A Tale of Two Cities']
    },
  },
  highlight: 'none'
}

describe('Author Quiz', () => {
  it("renders without crashing", () => {
    const div  = document.createElement("div");
    ReactDOM.render(
      <AuthorQuiz {...state} onAnswerSelected={() => {}} onContinue={() => {}}/>, 
      div
    );
  });

  describe('When no answer has been selected', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = mount(
        <AuthorQuiz {...state} onAnswerSelected={() => {}} onContinue={() => {}}/>
      );
    });

    it("should have no background color", () => {
      expect(wrapper.find('div.row.turn').props().style.backgroundColor).toBe('');
    });
  });

  describe('When a correct answer has been selected', () => {
    let wrapper;

    beforeAll(() => {
      const updatedState = Object.assign({}, state, {highlight: 'correct'});
      wrapper = mount(
        <AuthorQuiz {...updatedState} onAnswerSelected={() => {}} onContinue={() => {}}/>
      );
    });

    it("should have a green background color", () => {
      const turnDiv = wrapper.find('div.row.turn');
      expect(turnDiv.props().style.backgroundColor).toBe('green');
    });
  });

  describe('When an incorrect answer has been selected', () => {
    let wrapper;

    beforeAll(() => {
      const updatedState = Object.assign({}, state, {highlight: 'wrong'});
      wrapper = mount(
        <AuthorQuiz {...updatedState} onAnswerSelected={() => {}} onContinue={() => {}}/> 
      );
    });

    it("should have a red background color", () => {
      const turnDiv = wrapper.find('div.row.turn');
      expect(turnDiv.props().style.backgroundColor).toBe('red');
    });
  });

  describe('When the first answer is selected', () => {
    let wrapper;
    const handleAnswerSelected = jest.fn();

    beforeAll(() => {
      wrapper = mount(
        <AuthorQuiz {...state} onAnswerSelected={handleAnswerSelected} onContinue={() => {}}/> 
      );
      wrapper.find('.answer').first().simulate('click');
    });

    it('onAnswerSelected should be called', () => {
      expect(handleAnswerSelected).toHaveBeenCalled();
    });

    it('should receive The Shining', () => {
      expect(handleAnswerSelected).toHaveBeenCalledWith('The Shining'); 
    });
  });
});
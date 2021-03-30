import React, { Component } from 'react'
import './App.css'

const Home = (props) => {
  const { questions, name, handleChange, nameSubmit } = props
  return (
    <div className="home">
      <h1><strong>Javascript Sample Quiz</strong></h1>
      <h5>*There will be {questions.length} questions*</h5>
      <h2>Please enter your name to proceed</h2>
      <input type="text" className="input-name" name="name" value={name} onChange={(e) => handleChange(e)} /><br />
      <button className="submit" onClick={nameSubmit}>Submit</button>
    </div>
  )
}

const Quiz = (props) => {
  const { questions, activeQuestion, answerSubmit } = props
  const { question, options, ans } = questions[activeQuestion]
  return (
    <div className="quiz">
      <h1 className="question">Q:{activeQuestion + 1} {question}</h1>
      <div className="options">{
        options.map((o, i) =>
          <h2 className="option" key={i}>
            {
              <div className="flex">
                <input type="radio" name="quiz" value={i + 1}></input>
                <div className="option">{o}</div>
              </div>
            }
          </h2>)
      }</div>
      <button className="submit" onClick={() => answerSubmit(ans)}>Submit answer</button>
    </div>
  )
}

const Result = (props) => {
  let { answers, name, nameSubmit } = props
  return (<div className="home">
    <h1>Hi {name} </h1>
    <h2>Your score : {answers.filter(a => a === true).length}/{answers.length}</h2>
    <button className="submit" onClick={nameSubmit}>Take quiz again</button>
  </div>)
}

class App extends Component {

  state = {
    questions: [
      {
        question: 'Why might you choose to make your code asynchronous?',
        options: [
          'to start tasks that might take some time without blocking subsequent tasks from executing immediately',
          'to ensure that tasks further down in your code are not initiated until earlier tasks have completed',
          'to make your code faster',
          'to ensure that the call stack maintains a LIFO (Last in, First Out) structure'
        ],
        ans: 2
      },
      {
        question: 'Which expression evaluates to true?',
        options: [
          '[3] == [3]',
          "3 == '3'",
          "3 != '3'",
          "3 === '3'"
        ],
        ans: 2
      },
      {
        question: 'Which statement is used to skip iteration of the loop?',
        options: [
          'break',
          'pass',
          'skip',
          'continue',
          'return'
        ],
        ans: 4
      },
      {
        question: 'Which choice is an incorrect way to define an arrow function that returns an empty object?',
        options: [
          '() => ({})',
          '() => {}',
          '() => { return {};}',
          '() => (({}))',
          '() => return {}'
        ],
        ans: 2
      },
      {
        question: 'How does the forEach() method differ from a for statement?',
        options: [
          'forEach allows you to specify your own iterator, whereas for does not.',
          'forEach can be used only with strings, whereas for can be used with additional data types.',
          'forEach can be used only with an array, whereas for can be used with additional data types.',
          'for loops can be nested; whereas forEach loops cannot.',
          'none of the above'
        ],
        ans: 3
      },
      {
        question: 'Which of the following is not a unary operator?',
        options: [
          'typeof',
          'delete',
          'instanceof',
          'void',
          'none of the above'
        ],
        ans: 3
      },
      {
        question: 'Which statement is true about the "async" attribute for the HTML script tag?',
        options: [
          'It can be used for both internal and external JavaScript code.',
          'It can be used only for internal JavaScript code.',
          'It can be used only for internal or external JavaScript code that exports a promise.',
          'It can be used only for external JavaScript code.r',
          'none of the above'
        ],
        ans: 4
      },
      {
        question: 'Why is it usually better to work with Objects instead of Arrays to store a collection of records?',
        options: [
          'Objects are more efficient in terms of storage.',
          'Adding a record to an object is significantly faster than pushing a record into an array.',
          'Most operations involve looking up a record, and objects can do that better than arrays.',
          'Working with objects makes the code more readable.',
          'none of the above'
        ],
        ans: 3
      },
      {
        question: 'Which variable is an implicit parameter for every function in JavaScript?',
        options: [
          'Arguments',
          'args',
          'argsArray',
          'new Arguements(function)',
          'argumentsList'
        ],
        ans: 1
      },
      {
        question: 'Which of the following values is not a Boolean false?',
        options: [
          'Boolean(0)',
          'Boolean("")',
          'Boolean(NaN)',
          'Boolean("false")',
          'none of the above'
        ],
        ans: 4
      }
    ],
    name: '',
    showHomeComponent: true,
    showResultComponent: false,
    showQuiz: false,
    activeQuestion: 0,
    answers: []
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  nameSubmit = () => {
    if(this.state.name){
      this.setState({
        showHomeComponent: false,
        showQuiz: true,
        answers: [],
        activeQuestion: 0,
        showResultComponent: false
      })
    }
    else{
      alert('Please type a valid name')
    }
  }

  answerSubmit = (answerKey) => {
    let ans;
    try {
      ans = document.querySelector('input[name="quiz"]:checked').value;
      let { answers, activeQuestion, questions } = this.state
      ans = Number(ans) === Number(answerKey) ? true : false
      answers.push(ans)
      if (activeQuestion == (questions.length - 1)) { // reached end
        this.setState({
          answers,
          showResultComponent: true,
          showQuiz: false
        })
      }
      else {
        this.setState({
          activeQuestion: activeQuestion + 1,
          answers
        })
      }
      document.querySelector('input[name="quiz"]:checked').checked = false;
    }
    catch (e) {
      alert('Please select an answer')
    }
  }

  render() {
    const { showHomeComponent, showResultComponent, showQuiz } = this.state
    return (
      <div className="app-container">
        <div className="logo-container">
          <img src="https://cdn3.vectorstock.com/i/thumb-large/44/42/quiz-logo-icon-symbol-flat-cartoon-red-vector-27774442.jpg" alt="" />
        </div>
        {
          showHomeComponent ? <Home {...this} {...this.state} /> :
            showQuiz ? <Quiz {...this} {...this.state} /> :
              showResultComponent ? <Result {...this} {...this.state} /> : null
        }
      </div>
    )
  }
}

export default App


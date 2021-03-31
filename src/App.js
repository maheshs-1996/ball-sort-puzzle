import React, { Component } from 'react'
import './App.css'

const Home = (props) => {
  const { questions, name, handleChange, nameSubmit, error } = props
  return (
    <div className="home">
      <h1><strong>Javascript Sample Quiz</strong></h1>
      <div className="note">*There will be {questions.length} questions*</div>
      <h2>Please enter your name to proceed</h2>
      {
        error ? <> <div class="error-msg">{error}</div><br /></> : null
      }
      <input autoComplete='off' type="text" className="input-name" name="name" value={name} onChange={(e) => handleChange(e)} /><br />
      <button className="submit" onClick={nameSubmit}>Submit</button>
    </div>
  )
}

const ReviewAnswers = (props) => {
  const { questions, answers } = props
  return (
    <table className="review-comp">
      <tr>
        <th>Sl No</th>
        <th>Question</th>
        <th>Selected Answer</th>
        <th>Correct Answer</th>
      </tr>
      {
        questions.map((q, i) => {
          const { choosed_answer, correct_answer } = answers[i]
          const class_name = choosed_answer === correct_answer ? 'review green' : 'review red'
          return (
            <tr className={class_name} key={i}>
              <td>{i + 1}</td>
              <td className="q">{q.question}</td>
              <td className="selected">{q.options[choosed_answer - 1]}</td>
              <td className="correct">{q.options[correct_answer - 1]}</td>
            </tr>
          )
        })
      }
    </table>
  )
}

const Quiz = (props) => {
  const { questions, activeQuestion, answerSubmit, redirectToHome } = props
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
      <div className="buttons-container flex-column">
        <button className="submit" onClick={() => answerSubmit(ans)}>Submit answer</button>
        <button className="submit" onClick={redirectToHome}>Back to home</button>
      </div>
    </div>
  )
}

const Result = (props) => {
  let { answers, name, nameSubmit, redirectToHome, reviewAnswers, showReviewComponent } = props
  return (
    <div className="home">
      <h1>Hi {name} </h1>
      <h2>Thank you for taking quiz.</h2>
      <h2>Your score : {answers.filter(a => a.choosed_answer === a.correct_answer).length}/{answers.length}</h2>
      <div className="buttons-container flex-column">
        {
          !showReviewComponent ? <button className="submit" onClick={reviewAnswers}>Review Answers</button> : null
        }
        <button className="submit" onClick={nameSubmit}>Take quiz again</button>
        <button className="submit" onClick={redirectToHome}>Back to Home</button>
      </div>
      {
        showReviewComponent ? <ReviewAnswers {...props} /> : null
      }
    </div>
  )
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
          'It can be used only for external JavaScript code.',
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
    error: null,
    showHomeComponent: true,
    showResultComponent: false,
    showQuiz: false,
    showReviewComponent: false,
    activeQuestion: 0,
    answers: []
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  redirectToHome = () => {
    this.setState({
      showHomeComponent: true,
      showQuiz: false,
      answers: [],
      name: '',
      activeQuestion: 0,
      showResultComponent: false,
      showReviewComponent: false
    })
  }

  reviewAnswers = () => {
    this.setState({
      showReviewComponent: true
    })
  }

  nameSubmit = () => {
    let { name, questions } = this.state
    if (name) {
      questions = questions.sort(() => Math.random() - 0.5)
      this.setState({
        showHomeComponent: false,
        showQuiz: true,
        answers: [],
        activeQuestion: 0,
        showResultComponent: false,
        showReviewComponent: false,
        questions,
        error: null
      })
    }
    else {
      this.setState({
        error: 'Please enter a name to proceed'
      })
      setTimeout(() => {
        this.setState({
          error: null
        })
      }, 3000)
    }
  }

  answerSubmit = (answerKey) => {
    let ans;
    try {
      ans = document.querySelector('input[name="quiz"]:checked').value;
      let { answers, activeQuestion, questions } = this.state
      answers.push({
        choosed_answer: Number(ans),
        correct_answer: Number(answerKey)
      })
      if (activeQuestion === (questions.length - 1)) { // reached end
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


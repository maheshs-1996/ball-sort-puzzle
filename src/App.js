import React, { Component } from 'react'
import './App.css'

const Ball = (props) => {
  const { ball } = props
  const class_name = `ball ${ball}`
  return (
    <div className={class_name}></div>
  )
}

const BallsContainer = (props) => {
  let { balls, handleContainerClick, index, clicked_id } = props
  index += 1;
  const class_name = (index) === Number(clicked_id) ? 'container clicked' : 'container'
  return (
    <div className={class_name} onClick={() => handleContainerClick(index)}>
      {
        balls.map((ball, i) => (
          <Ball key={i} ball={ball} />
        ))
      }
    </div>
  )
}

class App extends Component {

  state = {
    container_data: [
      ['blue', 'blue', 'purple', 'red'],
      ['yellow', 'lblue', 'green', 'yellow'],
      ['orange', 'purple', 'lblue', 'purple'],
      ['green', 'purple', 'blue', 'green'],
      ['yellow', 'red', 'lblue', 'blue'],
      ['lblue', 'red', 'orange', 'orange'],
      ['green', 'red', 'orange', 'yellow'],
      [],
      []
    ],
    clicked_id: null,
    active_ball: null,
    game_over: false
  }

  handleContainerClick = (index) => {
    let { state: { clicked_id, container_data, active_ball } } = this

    const currentContainerArray = container_data[index - 1]

    const prevContainerArray = clicked_id ? container_data[clicked_id - 1] : null

    const currentActiveBall = active_ball ? active_ball : currentContainerArray[0]

    const clicked_id_new = clicked_id ? null : index

    if (clicked_id_new) {
      this.setState({
        clicked_id: clicked_id_new,
        active_ball: currentActiveBall
      })
    }
    else {
      let game_over = false
      if ((currentContainerArray.length < 4 && (currentContainerArray.length === 0 || (currentActiveBall === currentContainerArray[0])))) {
        currentContainerArray.unshift(currentActiveBall)
        prevContainerArray.shift(currentActiveBall)
        container_data[index - 1] = currentContainerArray
        container_data[clicked_id - 1] = prevContainerArray
        game_over = container_data.every((a) => (a.length === 4 || a.length === 0) && (new Set(a).size === 0 || new Set(a).size === 1))

        this.setState({
          container_data,
          game_over
        })
      }

      this.setState({
        clicked_id: clicked_id_new,
        active_ball: null
      })
    }
  }

  render() {
    const { state: { container_data, clicked_id, game_over }, handleContainerClick } = this
    return (
      <div className="app-container">
        <img className='logo' src='https://play-lh.googleusercontent.com/QTPcOtzkRWBKzYmfFUpeH7wVJqTMNXvfN71ksDvf9mcctyWlfQ96GJ5ptYxD3vHtkSM' alt='' />
        <h1 className="title">Ball Sort Puzzle</h1>
        <button onClick={() => window.location.reload()}>Reload</button>
        {
          game_over ? <h2>Game over. Congratulations</h2> :
            <div className="game">
              {
                container_data.map((c, i) => (
                  <BallsContainer key={i} index={i} balls={c} handleContainerClick={handleContainerClick} clicked_id={clicked_id} />
                ))
              }
            </div>
        }
      </div>
    )
  }
}

export default App


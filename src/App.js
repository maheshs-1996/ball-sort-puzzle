import React, { Component } from 'react'
import './App.css'
import game_data from './game_data'

const Ball = (props) => {
  const { ball } = props
  const class_name = `ball ${ball}`
  return (
    <div className={class_name}></div>
  )
}

const Button = ({ handleClick, name }) => (
  <button className="btn" onClick={handleClick}>{name}</button>
)

const BallsContainer = (props) => {
  let { balls, handleContainerClick, index, clicked_id } = props
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
    container_length: 4,
    game_index: null,
    container_data: [],
    clicked_id: null,
    active_ball: null,
    game_over: false
  }

  componentDidMount = () => {
    this.loadGame()
  }

  loadGame = (reloadGame = true) => {
    const { state: { game_index } } = this
    let randomIndex = game_index == null ? Math.round(Math.random() * (game_data.length - 1)) : reloadGame ? ((game_index + 1) % game_data.length) : game_index
    let container_data = Object.assign([], game_data[randomIndex])
    this.setState({
      game_index: randomIndex,
      container_data,
      clicked_id: null,
      game_over: false
    })
  }

  handleContainerClick = (index) => {
    let { state: { clicked_id, active_ball, container_length } } = this

    let container_data = Object.assign([], this.state.container_data)

    const currentContainerArray = Object.assign([], container_data[index - 1])

    const prevContainerArray = clicked_id ? Object.assign([], container_data[clicked_id - 1]) : null

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
      if ((currentContainerArray.length < container_length && (currentContainerArray.length === 0 || (currentActiveBall === currentContainerArray[0])))) {
        currentContainerArray.unshift(currentActiveBall)
        prevContainerArray.shift(currentActiveBall)
        container_data[index - 1] = currentContainerArray
        container_data[clicked_id - 1] = prevContainerArray
        game_over = container_data.every((a) => (a.length === container_length || a.length === 0) && (new Set(a).size === 0 || new Set(a).size === 1))

        this.setState({
          container_data
        })

        if (game_over) {
          setTimeout(() => {
            this.setState({
              game_over
            })
          }, 500)
        }
      }

      this.setState({
        clicked_id: clicked_id_new,
        active_ball: null
      })
    }
  }

  render() {
    const { state: { container_data, clicked_id, game_over }, handleContainerClick, loadGame } = this
    
    const ActionButtons = () => (
      <div className="btns-container">
        <Button name='Reload Game' handleClick={() => loadGame(false)} />
        <Button name='Load Another' handleClick={() => loadGame()} />
      </div>
    )
    return (
      <div className="app-container">
        <div className="app-wrapper">
          <img className='logo' src='https://play-lh.googleusercontent.com/QTPcOtzkRWBKzYmfFUpeH7wVJqTMNXvfN71ksDvf9mcctyWlfQ96GJ5ptYxD3vHtkSM' alt='' />
          <div className="name-container">
            <h1 className="title">Ball Sorter</h1>
            <span className="name">By Mahesh S</span>
          </div>
          {
            game_over ?
              <>
                <h2>Game over. Congratulations</h2>
                <ActionButtons />
              </> :
              <>
                <ActionButtons />
                <div className="game">
                  {
                    container_data.map((c, i) => (
                      <BallsContainer key={i} index={i + 1} balls={c} handleContainerClick={handleContainerClick} clicked_id={clicked_id} />
                    ))
                  }
                </div>
              </>
          }
        </div>
      </div>
    )
  }
}

export default App


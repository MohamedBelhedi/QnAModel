import './App.css'
import "@tensorflow/tfjs";
import * as qna from '@tensorflow-models/qna'
import 'papercss'

import React, { useState, useEffect } from 'react'


export default function App() {
  const [greet, setGreet] = useState("")
  const [search, setSearch] = useState("")
  const [passages, setPassages] = useState("")
  const [getPassages, setGetPassages] = useState("")
  const [bgColor, setBgColor] = useState({ color: "red" })
  const [fokus, setfokus] = useState(false)

  const chngColor = () => {

    Uhr > 12 ? setBgColor({ color: "blue" }) : setBgColor(bgColor)


  }

  // Load the model.
  const loadModel = async (evt) => {



    // Finding the answers

    if (evt.key === "Enter") {
      setfokus(true)
      setGetPassages("loading pls wait.....")
      const resultStyle = document.querySelector('.result')
      resultStyle.scrollIntoView()
      resultStyle.focus({ focusVisible: true })


      const passage = passages
      const question = search
      const model = await qna.load();
      const answers = await model.findAnswers(question, passage);
      { search.includes("?") ? search : alert("pls add ?") }
      console.log('Answers: ');
      console.log(answers);
      const randInt = Math.floor(Math.random() * 3)
      setGetPassages(JSON.stringify(answers[randInt] === undefined ? "not existing" : answers[randInt].text))

      setTimeout(() => {
        setfokus("")
      }, 3000)




    }

  }


  const Uhr = new Date().getHours()

  const uhrZeit = () => {


    { Uhr < 12 ? setGreet("Good Morning and welcome to the Smartest Q&A ") : setGreet("Hello welcome to the Smartest Q&A ") }
  }

  useEffect(() => {
    { search.length === 0 ? setGetPassages("pls ask Something...") : null }
    uhrZeit()
    chngColor()
  }, [])

  return (
    <div style={bgColor} className="col flex-center">
      <h1 className="sm-3 col d-flex align-middle">{greet}</h1>

      <input className="sm-3 col d-flex align-middle" type="text" onChange={
        (e) => {
          setSearch(e.target.value)
          console.log(e.target.value)

          e.target.value.length === 0 ? setGetPassages("") : null




        }}
        value={search}
        onKeyPress={loadModel}
        placeholder="Ask something?....."




      />
      <div>
        <textarea className="textArea" value={passages} onChange={(e) => {
          console.log(e.target.value)
          setPassages(e.target.value)

        }} placeholder="paste the Text....." />
      </div>

      <div>
        {fokus ? " 👇" : null}
        <h3 className="result" onBlur={fokus}>{getPassages}</h3>
      </div>
    </div>
  )
}

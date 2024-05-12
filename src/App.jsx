import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import patternMobile from './images/pattern-divider-mobile.svg';
import patternDesktop from './images/pattern-divider-desktop.svg';
import './App.css'

function App() {
  const [data, setData] = useState(null);
  const [userWidth, setUserWidth] = useState(document.body.clientWidth);
  let url = "https://api.adviceslip.com/advice";

    /* Json object has 2 properties,
       id & advice
     */

  useEffect(() => {
    const handleResize = () => {
      setUserWidth(document.body.clientWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [userWidth])

  return (
    <div className="container">
      <Card userSpec={userWidth} />
    </div>
  )
}

function Card({ advice, userSpec }) {

  return (
    <div className="card_container">
      <h1 className="advice_title">Advice <span className="advice_num">#117</span></h1>
      <p className="advice_quote">It is easy to sit up and take notice, what's difficult is
        getting up and taking action.
      </p>
      {
        userSpec <= 600 ? <img className="divider_mobile" src={patternMobile} /> : <img className="divider_desktop" src={patternDesktop} />
      }
      <div className="dice_container">
        <svg className="dice" width="24" height="24" viewBox="-4 -3 30 30" xmlns="http://www.w3.org/2000/svg"><path d="M20 0H4a4.005 4.005 0 0 0-4 4v16a4.005 4.005 0 0 0 4 4h16a4.005 4.005 0 0 0 4-4V4a4.005 4.005 0 0 0-4-4ZM7.5 18a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" fill="#202733"/></svg>
      </div>
    </div>
  )
}
 
export default App

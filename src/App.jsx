import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import patternMobile from './images/pattern-divider-mobile.svg';
import patternDesktop from './images/pattern-divider-desktop.svg';
import { motion, animate, stagger, useAnimate, AnimatePresence } from 'framer-motion';
import './App.css'

function App() {
  
  const [userWidth, setUserWidth] = useState(document.body.clientWidth);
  const myTitle = "Advice Generator".split("");
         
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
        <Title text={myTitle} />
        <Card userSpec={userWidth} />
      </div>
    )
}

function Title({ text }) {

  return (
    <h1 className="title">
      {text.map((el, i) => {
        return (
          <motion.div
           className="indiv_letter"
           initial={{ y: -50, opacity: 0 }}
           animate={{ y: 0, opacity: 1}}
           transition={{
            duration: 0.20,
            delay: i / 14,
            type: "spring",
            bounce: 0.35,
           }}
           key={i}>
            {el}
         </motion.div>
        )
      })}
    </h1>
  )
}

function Card({ userSpec }) {
  
  const [data, setData] = useState({
    number: undefined,
    slip: undefined,
  });

  let url = "https://api.adviceslip.com/advice";
  
  const setAdvice = async (e) => {   
    if (e.target.classList.contains('dice_container')) {
      /* IMPORTANT! To animate something in and out like this, set the animation to fade out BEFORE calling the api, and then set an animate for after it is called.
      If you don't, the animate will only work for the first one. */
      animate(
        ".advice_quote",
        {
          opacity: 0,
        },
        {
          type: "spring",
          bounce: 0,
          duration: 0.4,
          ease: "easeInOut",
        }
      )

      animate(
        ".advice_num",
        {
          opacity: 0,
        },
        {
          type: "spring",
          bounce: 0,
          duration: 0.4,
          ease: "easeInOut",
        }
      )

      const myResponse = await fetch(url, {
        mode: 'cors',
        cache: "no-cache", // IMPORTANT, if you dont use, it will always return the same response
      })
  
      const myAdvice = await myResponse.json();
  
      setData((prev) => ({
        ...prev,
        number: myAdvice.slip.id,
        slip: myAdvice.slip.advice,
      }))
    }

    animate(
      ".advice_quote",
      {
        opacity: 1
      },
      {
        type: "spring",
        bounce: 0,
        duration: 0.4,
        ease: "easeInOut"
      }
    );

    animate(
      ".advice_num",
      {
        opacity: 1,
      },
      {
        type: "spring",
        bounce: 0,
        duration: 0.4,
        ease: "easeInOut"
      }
    )    
  }

  return (
    <div className="card_container">
      <h1 className="advice_title">Advice <motion.span className="advice_num" initial={{ opacity: 0 }}>{data.number}</motion.span></h1>
      <motion.p className="advice_quote" initial={{ opacity: 0 }}>{data.slip}</motion.p>
      {
        userSpec <= 600 ? <img className="divider_mobile" src={patternMobile} /> : <img className="divider_desktop" src={patternDesktop} />
      }
      <motion.div className="dice_container" onClick={(e) => setAdvice(e)} whileTap={{ scale: .85 }}>
        <svg className="dice" width="24" height="24" viewBox="-4 -3 30 30" xmlns="http://www.w3.org/2000/svg"><path d="M20 0H4a4.005 4.005 0 0 0-4 4v16a4.005 4.005 0 0 0 4 4h16a4.005 4.005 0 0 0 4-4V4a4.005 4.005 0 0 0-4-4ZM7.5 18a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" fill="#202733"/></svg>
      </motion.div>
    </div>
  )
}
 
export default App

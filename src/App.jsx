import { useGame } from './hooks/useGame.js'
import TopBar from './components/TopBar/TopBar.jsx'
import HomeScreen from './components/screens/HomeScreen.jsx'
import RulesScreen from './components/screens/RulesScreen.jsx'
import GameScreen from './components/screens/GameScreen.jsx'
import HighScoresScreen from './components/screens/HighScoresScreen.jsx'
import styles from './App.module.css'

export default function App() {
  const { state, tapCard, completeHand, startGame, goToRules, backFromRules, goHome, pause, resume, goHighScores, clearFlash, clearLastHand, debugEndGame } = useGame()
  const { phase } = state

  const actions = { tapCard, completeHand, startGame, goToRules, backFromRules, goHome, pause, resume, goHighScores, clearFlash, clearLastHand, debugEndGame }

  return (
    <div className={styles.app}>
      <TopBar onPlayClick={startGame} onSignInClick={goHighScores} />
      <div className={(phase === 'rules' || phase === 'home' || phase === 'highScores') ? styles.innerFull : styles.inner}>
        {phase === 'home' && (
          <HomeScreen onStart={startGame} onRules={goToRules} onHighScores={goHighScores} />
        )}
        {phase === 'rules' && (
          <RulesScreen onBack={backFromRules} />
        )}
        {(phase === 'playing' || phase === 'paused' || phase === 'gameOver') && (
          <GameScreen state={state} actions={actions} />
        )}
        {phase === 'highScores' && (
          <HighScoresScreen onHome={goHome} />
        )}
      </div>
    </div>
  )
}

import { useGame } from './hooks/useGame.js'
import TopBar from './components/TopBar/TopBar.jsx'
import HomeScreen from './components/screens/HomeScreen.jsx'
import RulesScreen from './components/screens/RulesScreen.jsx'
import GameScreen from './components/screens/GameScreen.jsx'
import HighScoresScreen from './components/screens/HighScoresScreen.jsx'
import styles from './App.module.css'

export default function App() {
  const { state, tapCard, startGame, goToRules, backFromRules, goHome, pause, resume, goHighScores, clearFlash, clearLastHand } = useGame()
  const { phase } = state

  const actions = { tapCard, startGame, goToRules, backFromRules, goHome, pause, resume, goHighScores, clearFlash, clearLastHand }

  return (
    <div className={styles.app}>
      <TopBar />
      <div className={styles.inner}>
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
          <HighScoresScreen onNewGame={startGame} onHome={goHome} />
        )}
      </div>
    </div>
  )
}

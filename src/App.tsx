import { useEffect, useState } from 'react'
import './App.css'

type Task = { id: number; title: string; category: string; done: boolean }
const initialTasks: Task[] = [
  { id: 1, title: 'Make room for a little inspiration', category: 'Personal', done: true },
  { id: 2, title: 'Bring that big idea to life', category: 'Work', done: false },
  { id: 3, title: 'Step outside. Take a deep breath.', category: 'Wellbeing', done: false },
]
function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try { return JSON.parse(localStorage.getItem('simple-tasks') || 'null') ?? initialTasks } catch { return initialTasks }
  })
  const [draft, setDraft] = useState('')
  const [filter, setFilter] = useState('All tasks')
  const [seconds, setSeconds] = useState(25 * 60)
  const [running, setRunning] = useState(false)
  const [adding, setAdding] = useState(false)
  useEffect(() => { localStorage.setItem('simple-tasks', JSON.stringify(tasks)) }, [tasks])
  useEffect(() => {
    if (!running) return
    const timer = window.setInterval(() => setSeconds(value => {
      if (value <= 1) { setRunning(false); return 0 }
      return value - 1
    }), 1000)
    return () => window.clearInterval(timer)
  }, [running])
  const complete = tasks.filter(task => task.done).length
  const date = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
  const visible = tasks.filter(task => filter === 'All tasks' || (filter === 'Completed' ? task.done : !task.done))
  function addTask(event: React.FormEvent) {
    event.preventDefault()
    if (!draft.trim()) return
    setTasks([...tasks, { id: Date.now(), title: draft.trim(), category: 'Personal', done: false }])
    setDraft(''); setAdding(false); setFilter('All tasks')
  }
  return (
    <div className="app-shell">
      <header className="header">
        <a className="brand" href="#"><span className="brand-mark">✳</span> simple<span className="brand-dot">.</span></a>
        <div className="header-note">A little less noise. A little more you.</div>
        <div className="avatar" aria-label="Your workspace">S</div>
      </header>
      <main>
        <section className="intro">
          <div className="eyebrow"><span /> YOUR EVERYDAY, A LITTLE LIGHTER</div>
          <div className="intro-row"><div><h1>Good things start <em>simple.</em></h1><p>A clear mind. A little focus. Space for what matters.</p></div><div className="date"><span>☼</span>{date}</div></div>
        </section>
        <section className="hero-card">
          <div className="hero-copy"><div className="pill"><span /> MAKE SPACE FOR TODAY</div><h2>Less busy.<br />More <em>meaningful.</em></h2><p>You don’t have to do it all.<br />Just start with one thing that matters.</p><button className="primary" onClick={() => { setAdding(true); document.getElementById('tasks')?.scrollIntoView({ behavior: 'smooth', block: 'center' }) }}>Plan my day <span>↗</span></button><div className="hero-footnote">Small steps. Real progress.</div></div>
          <div className="art" aria-hidden="true"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><span className="art-star star-one">✳</span><span className="art-star star-two">✧</span><div className="sun"/><div className="arch arch-back"/><div className="arch arch-front"/><div className="sphere"/><div className="art-caption">a fresh perspective, every day</div></div>
        </section>
        <div className="workspace-grid">
          <section className="tasks-card" id="tasks">
            <div className="section-title"><div><span className="mini-label">ONE THING AT A TIME</span><h3>Your day, your pace<span className="task-count">{tasks.length}</span></h3></div><button className="add-button" onClick={() => setAdding(!adding)} aria-label="Add a task">+</button></div>
            <div className="filters">{['All tasks', 'To do', 'Completed'].map(label => <button key={label} className={filter === label ? 'selected' : ''} onClick={() => setFilter(label)}>{label}</button>)}</div>
            {adding && <form className="task-form" onSubmit={addTask}><input autoFocus aria-label="New task" placeholder="What would you like to do?" value={draft} onChange={event => setDraft(event.target.value)} maxLength={150}/><button type="submit">Add ↗</button></form>}
            <div className="task-list">{visible.map(task => <div className={`task ${task.done ? 'done' : ''}`} key={task.id}><button className="checkbox" aria-label={`${task.done ? 'Mark incomplete' : 'Complete'}: ${task.title}`} aria-pressed={task.done} onClick={() => setTasks(tasks.map(item => item.id === task.id ? { ...item, done: !item.done } : item))}>{task.done ? '✓' : ''}</button><span className="task-title">{task.title}</span><span className={`category ${task.category.toLowerCase()}`}>{task.category}</span><button className="delete-task" aria-label={`Delete ${task.title}`} onClick={() => setTasks(tasks.filter(item => item.id !== task.id))}>×</button></div>)}{!visible.length && <p className="empty">{filter === 'Completed' ? 'Your next small win is waiting.' : 'A little breathing room. You’re all caught up.'}</p>}</div>
            <div className="progress-row"><span>{complete} of {tasks.length} completed</span><div className="progress-track"><div style={{ width: `${tasks.length ? complete / tasks.length * 100 : 0}%` }}/></div><span>Keep it simple ✧</span></div>
          </section>
          <section className="focus-card"><div className="focus-top"><span>◷ &nbsp; A MOMENT OF FOCUS</span><span className={`status-dot ${running ? 'active' : ''}`} /></div><h3>Be here. Do one thing.</h3><p>Give your attention a little breathing room.</p><div className="timer" role="timer" aria-label="Focus time remaining">{String(Math.floor(seconds / 60)).padStart(2, '0')}<span>:</span>{String(seconds % 60).padStart(2, '0')}</div><div className="timer-controls"><button className="focus-button" onClick={() => { if (!seconds) setSeconds(1500); setRunning(!running) }}>{running ? 'Ⅱ Pause session' : seconds === 0 ? '↻ Start again' : '▷ Start focusing'}</button><button className="reset-button" aria-label="Reset focus timer" onClick={() => { setRunning(false); setSeconds(1500) }}>↻</button></div><span className="timer-note">{seconds === 0 ? 'Well done. Take a little break.' : running ? 'You’ve got this. One moment at a time.' : '25 minutes. Just you and your next step.'}</span></section>
        </div>
        <div className="quote"><span>✳</span><p>“Almost everything will work again if you unplug it for a few minutes, including you.”<small>ANNE LAMOTT</small></p></div>
      </main>
      <footer><span className="footer-brand">simple.</span><span>A softer place to get things done.</span><span>Made for a more intentional everyday <span className="footer-flower">✳</span></span></footer>
    </div>
  )
}
export default App

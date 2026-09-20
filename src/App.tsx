import { useEffect, useState } from 'react'
import './App.css'

type Card = { id: number; title: string; description: string; category: string; art: string; saved: boolean }
const initialCards: Card[] = [
  { id: 1, title: 'A little room to breathe', description: 'Slow down, find your balance, and make a little space for yourself.', category: 'Wellbeing', art: 'balance', saved: false },
  { id: 2, title: 'Small steps, big things', description: 'Every good idea starts somewhere. Give yours a place to grow.', category: 'Personal growth', art: 'steps', saved: true },
  { id: 3, title: 'Find your flow', description: 'Less distraction. More intention. Make time for what matters.', category: 'Productivity', art: 'flow', saved: false },
  { id: 4, title: 'Make something just because', description: 'Follow your curiosity and see where a little creativity takes you.', category: 'Creativity', art: 'create', saved: false },
  { id: 5, title: 'Good things take time', description: 'You don’t have to have it all figured out. Keep growing at your pace.', category: 'Personal growth', art: 'grow', saved: false },
  { id: 6, title: 'The joy of doing less', description: 'A gentle reminder that a full life doesn’t need a full calendar.', category: 'Wellbeing', art: 'sunset', saved: false },
]
const categories = ['All cards', 'Wellbeing', 'Personal growth', 'Productivity', 'Creativity']
function Bookmark({ filled = false }: { filled?: boolean }) { return <svg width="17" height="19" viewBox="0 0 20 22" fill={filled ? 'currentColor' : 'none'} aria-hidden="true"><path d="M5 3h10a1 1 0 0 1 1 1v15l-6-4-6 4V4a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg> }
function App() {
  const [cards, setCards] = useState<Card[]>(() => { try { const value = JSON.parse(localStorage.getItem('simple-cards') || 'null'); return Array.isArray(value) && value.every(card => typeof card.title === 'string' && typeof card.description === 'string') ? value : initialCards } catch { return initialCards } })
  const [category, setCategory] = useState('All cards')
  const [savedOnly, setSavedOnly] = useState(false)
  const [search, setSearch] = useState('')
  const [adding, setAdding] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
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
  const [selected, setSelected] = useState<Card | null>(null)
  useEffect(() => { localStorage.setItem('simple-cards', JSON.stringify(cards)) }, [cards])
  useEffect(() => { const close = (event: KeyboardEvent) => { if (event.key === 'Escape') { setAdding(false); setSelected(null) } }; window.addEventListener('keydown', close); return () => window.removeEventListener('keydown', close) }, [])
  const visible = cards.filter(card => (!savedOnly || card.saved) && (category === 'All cards' || category === card.category) && `${card.title} ${card.description}`.toLowerCase().includes(search.toLowerCase()))
  const toggleSave = (id: number) => setCards(cards.map(card => card.id === id ? { ...card, saved: !card.saved } : card))
  function addCard(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const title = String(data.get('title')).trim(); const description = String(data.get('description')).trim()
    if (!title || !description) return
    setCards([...cards, { id: Date.now(), title, description, category: String(data.get('category')), art: 'balance', saved: false }]); setAdding(false); setCategory('All cards'); setSavedOnly(false); setSearch('')
  }
  return (
    <div className={`app-shell ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <aside className="sidebar" aria-label="Main navigation">
        <div className="sidebar-brand"><span className="brand-mark">✳</span><span>simple<span className="brand-dot">.</span></span></div>
        <button className="sidebar-close" aria-label="Close menu" onClick={() => setSidebarOpen(false)}>×</button>
        <div className="sidebar-label">WORKSPACE</div>
        <nav className="sidebar-nav">
          <a className="sidebar-link active" href="#top" onClick={() => setSidebarOpen(false)}><span className="nav-icon">⌂</span>Overview</a>
          <a className="sidebar-link" href="#tasks" onClick={() => setSidebarOpen(false)}><span className="nav-icon">✓</span>My tasks<span className="nav-count">{tasks.filter(task => !task.done).length}</span></a>
          <a className="sidebar-link" href="#focus" onClick={() => setSidebarOpen(false)}><span className="nav-icon">◷</span>Focus timer</a>
          <a className="sidebar-link" href="#notes" onClick={() => setSidebarOpen(false)}><span className="nav-icon">▤</span>Notes</a>
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-label">YOUR PROGRESS</div>
          <div className="progress-summary"><span className="progress-ring">{complete}</span><div><strong>{complete} of {tasks.length}</strong><span>tasks completed</span></div></div>
          <div className="sidebar-tip"><span>✦</span><p>Small steps still move you forward.</p></div>
        </div>
      </aside>
      <div className="page-shell" id="top">
        <header className="header">
          <button className="menu-toggle" aria-label="Open menu" aria-expanded={sidebarOpen} onClick={() => setSidebarOpen(true)}><span /><span /><span /></button>
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
          <section className="focus-card" id="focus"><div className="focus-top"><span>◷ &nbsp; A MOMENT OF FOCUS</span><span className={`status-dot ${running ? 'active' : ''}`} /></div><h3>Be here. Do one thing.</h3><p>Give your attention a little breathing room.</p><div className="timer" role="timer" aria-label="Focus time remaining">{String(Math.floor(seconds / 60)).padStart(2, '0')}<span>:</span>{String(seconds % 60).padStart(2, '0')}</div><div className="timer-controls"><button className="focus-button" onClick={() => { if (!seconds) setSeconds(1500); setRunning(!running) }}>{running ? 'Ⅱ Pause session' : seconds === 0 ? '↻ Start again' : '▷ Start focusing'}</button><button className="reset-button" aria-label="Reset focus timer" onClick={() => { setRunning(false); setSeconds(1500) }}>↻</button></div><span className="timer-note">{seconds === 0 ? 'Well done. Take a little break.' : running ? 'You’ve got this. One moment at a time.' : '25 minutes. Just you and your next step.'}</span></section>
        </div>
        <div className="quote" id="notes"><span>✳</span><p>“Almost everything will work again if you unplug it for a few minutes, including you.”<small>ANNE LAMOTT</small></p></div>
      </main>
      <footer><span className="footer-brand">simple.</span><span>A softer place to get things done.</span><span>Made for a more intentional everyday <span className="footer-flower">✳</span></span></footer>
      </div>
    </div>
  )
  return <div className="app-shell">
    <header><a className="brand" href="#" aria-label="Simple home"><span>✳</span> simple<span className="brand-dot">.</span></a><nav aria-label="Main navigation"><button className={!savedOnly ? 'active' : ''} onClick={() => setSavedOnly(false)}>Discover</button><button className={savedOnly ? 'active' : ''} onClick={() => setSavedOnly(true)}>Saved cards <span className="nav-count">{cards.filter(card => card.saved).length}</span></button></nav><div className="avatar" aria-label="Your workspace">S</div></header>
    <main><section className="intro"><div className="eyebrow"><span /> A LITTLE INSPIRATION FOR YOUR EVERYDAY</div><div className="intro-row"><div><h1>Good things, <em>one card at a time.</em></h1><p>A collection of ideas to help you slow down, get inspired, and keep growing.</p></div><button className="primary" onClick={() => setAdding(true)}><span>+</span> Create a card</button></div></section>
    <section className="collection" aria-label="Card collection"><div className="toolbar"><div className="filters" aria-label="Filter by category">{categories.map(item => <button key={item} onClick={() => setCategory(item)} className={category === item ? 'selected' : ''} aria-pressed={category === item}>{item}</button>)}</div><label className="search"><svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.5"/><path d="m13 13 4 4" stroke="currentColor" strokeWidth="1.5"/></svg><input aria-label="Search cards" placeholder="Search cards..." value={search} onChange={event => setSearch(event.target.value)} /></label></div><div className="collection-info"><span>{savedOnly ? 'Your saved inspiration' : category === 'All cards' ? 'A little something for every part of you' : category}</span><span>{visible.length} cards</span></div>
    <div className="card-grid">{visible.map(card => <article className="card" key={card.id}><div className={`card-art ${card.art}`}><div className="art-shape shape-one"/><div className="art-shape shape-two"/><div className="art-shape shape-three"/><div className="art-shape shape-four"/><span className="art-spark">✧</span><button className={`save ${card.saved ? 'is-saved' : ''}`} aria-label={`${card.saved ? 'Unsave' : 'Save'} ${card.title}`} aria-pressed={card.saved} onClick={() => toggleSave(card.id)}><Bookmark filled={card.saved}/></button><span className="art-caption">{({ balance: 'take a breath', steps: 'one step at a time', flow: 'less, but better', create: 'stay curious', grow: 'trust the process', sunset: 'simply be' } as Record<string, string>)[card.art]}</span></div><div className="card-content"><span className={`category ${card.category.toLowerCase().replace(' ', '-')}`}>{card.category}</span><h2><button onClick={() => setSelected(card)}>{card.title}</button></h2><p>{card.description}</p><div className="card-bottom"><span><span className="tiny-flower">✳</span> A little perspective</span><button onClick={() => setSelected(card)} aria-label={`Open ${card.title}`}>↗</button></div></div></article>)}</div>
    {!visible.length && <div className="empty"><span>✧</span><h2>A little space for something good.</h2><p>{savedOnly ? 'Save a card to keep your inspiration close.' : 'Try another search or create a card of your own.'}</p><button onClick={() => { setSearch(''); setCategory('All cards'); setSavedOnly(false) }}>Explore all cards ↗</button></div>}
    </section><div className="closing"><span>✳</span><p>You don’t have to do it all. Just start with what speaks to you.</p></div></main><footer><span><strong>simple.</strong> A little less noise. A little more you.</span><span>Made for a more intentional everyday <span className="footer-flower">✳</span></span></footer>
    {(adding || selected) && <div className="modal-backdrop" onClick={() => { setAdding(false); setSelected(null) }}><dialog open className="modal" aria-label={adding ? 'Create a card' : selected?.title} onClick={event => event.stopPropagation()}><button className="modal-close" autoFocus={!adding} onClick={() => { setAdding(false); setSelected(null) }} aria-label="Close">×</button>{adding ? <form onSubmit={addCard}><span className="eyebrow">MAKE ROOM FOR AN IDEA</span><h2>Create a little inspiration.</h2><label>Title<input name="title" autoFocus required maxLength={65} placeholder="What’s on your mind?"/></label><label>Description<textarea name="description" required maxLength={220} placeholder="A thought worth keeping..."/></label><label>Category<select name="category">{categories.slice(1).map(item => <option key={item}>{item}</option>)}</select></label><button className="primary" type="submit">Create card ↗</button></form> : selected && <><span className="category">{selected.category}</span><h2>{selected.title}</h2><p>{selected.description}</p><div className="reflection"><span className="eyebrow">A MOMENT TO REFLECT</span><p>What’s one small way you can bring this idea into your day?</p></div><button className="primary" onClick={() => toggleSave(selected.id)}><Bookmark filled={cards.find(card => card.id === selected.id)?.saved}/>{cards.find(card => card.id === selected.id)?.saved ? 'Saved to your collection' : 'Save this card'}</button></>}</dialog></div>}
  </div>
}
export default App

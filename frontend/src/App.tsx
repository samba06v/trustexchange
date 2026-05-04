import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import { ToastContainer } from './components/Toast'

export default function App() {
  const [page, setPage] = useState<'landing' | 'dashboard'>('landing')

  return (
    <>
      <AnimatePresence mode="wait">
        {page === 'landing' ? (
          <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.4 }}>
            <Landing onEnterApp={() => setPage('dashboard')} />
          </motion.div>
        ) : (
          <motion.div key="dashboard" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            <Dashboard onLogout={() => setPage('landing')} />
          </motion.div>
        )}
      </AnimatePresence>
      <ToastContainer />
    </>
  )
}

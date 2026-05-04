import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, Info } from 'lucide-react'

type Toast = { id: number; message: string; type: 'success' | 'error' | 'info' }
let toastId = 0
const listeners: ((t: Toast) => void)[] = []

export function showToast(message: string, type: Toast['type'] = 'info') {
  const t = { id: toastId++, message, type }
  listeners.forEach(l => l(t))
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => {
    const handler = (t: Toast) => {
      setToasts(prev => [...prev, t])
      setTimeout(() => setToasts(prev => prev.filter(x => x.id !== t.id)), 4000)
    }
    listeners.push(handler)
    return () => { const i = listeners.indexOf(handler); if (i > -1) listeners.splice(i, 1) }
  }, [])

  const icons = { success: <CheckCircle size={16} />, error: <XCircle size={16} />, info: <Info size={16} /> }

  return (
    <div className="toast-container">
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 60 }}
            className={`toast ${t.type}`}
          >
            {icons[t.type]} {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

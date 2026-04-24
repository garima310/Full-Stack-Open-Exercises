import { useState } from 'react'

const Toggleable = ({ buttonLabel, children }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      {!visible && (
        <button onClick={toggleVisibility}>
          {buttonLabel}
        </button>
      )}

      {visible && (
        <div>
          {children}
          <button onClick={toggleVisibility}>cancel</button>
        </div>
      )}
    </div>
  )
}

export default Toggleable
const Notification = ({ notification }) => {
  if (!notification) return null

  return (
    <div style={{
      color: notification.type === 'error' ? 'red' : 'green',
      border: '1px solid',
      padding: '5px',
      marginBottom: '10px'
    }}>
      {notification.text}
    </div>
  )
}

export default Notification
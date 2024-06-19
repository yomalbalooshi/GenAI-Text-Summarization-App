import { useState, useEffect } from 'react'
import SummaryTextBox from './SummaryTextBox'
import LoadingScreen from './LoadingScreen'
const MessageResult = ({
  messageInputResult,
  requestSent,
  summaryRecieved
}) => {
  const [resultMessage, setresultMessage] = useState('')

  useEffect(() => {
    setresultMessage(messageInputResult)
  }, [messageInputResult])
  const handleChange = (e) => {
    setresultMessage(e.target.value)
  }
  const containerToDisplay = () => {
    if (requestSent && summaryRecieved === false) {
      return <LoadingScreen />
    } else {
      return (
        <SummaryTextBox
          handleChange={handleChange}
          resultMessage={resultMessage}
        />
      )
    }
  }
  return (
    <div className=" w-2/3 m-6 pt-2 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm pt-1">
        <h2 className=" text-center text-3xl font-semibold leading-9 tracking-tight text-blue">
          Summary
        </h2>
      </div>
      {containerToDisplay()}
    </div>
  )
}
export default MessageResult

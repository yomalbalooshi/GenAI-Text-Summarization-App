import { useState } from 'react'
import MessageInputBox from './MessageInputBox'
import MessageResult from './MessageResult'
const MainContainer = () => {
  const [messageInputResult, setmessageInputResult] = useState(
    'Your Summary Goes Here!'
  )
  const [summaryRecieved, setsummaryRecieved] = useState(false)
  const [requestSent, setrequestSent] = useState(false)
  return (
    <div className="px-6  lg:px-8">
      <div className=" shadow-2xl mx-auto pb-2 my-10 rounded-2xl ">
        <div className="flex justify-center">
          <MessageInputBox
            setmessageInputResult={setmessageInputResult}
            setrequestSent={setrequestSent}
            setsummaryRecieved={setsummaryRecieved}
          />
          <MessageResult
            messageInputResult={messageInputResult}
            requestSent={requestSent}
            summaryRecieved={summaryRecieved}
          />
        </div>
      </div>
    </div>
  )
}
export default MainContainer

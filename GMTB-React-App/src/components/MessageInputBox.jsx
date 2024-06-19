import { useState } from 'react'
import Client from '../services/api'
const MessageInputBox = ({
  setmessageInputResult,
  setsummaryRecieved,
  setrequestSent
}) => {
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setrequestSent(true)
      let response = await Client.post('', {
        prompt: message
      })
      const parser = new window.DOMParser()
      const xmlDoc = parser.parseFromString(response.data, 'text/xml')
      const summaryElement = xmlDoc.getElementsByTagName('summary')[0]
      const summaryText = summaryElement.textContent.trim()
      setmessageInputResult(summaryText)
      setsummaryRecieved(true)
    } catch (error) {
      setmessageInputResult('error fetching summary:' + error)
    }
  }
  const handleChange = (e) => {
    setMessage(e.target.value)
    setsummaryRecieved(false)
    setrequestSent(false)
  }
  return (
    <form className="space-y-8 w-2/3 m-6 pt-2 " onSubmit={handleSubmit}>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm pt-1">
        <h2 className=" text-center text-3xl font-semibold leading-9 tracking-tight text-blue">
          Text to Summarize
        </h2>
      </div>
      <div className="mt-2">
        <textarea
          id="message"
          name="message"
          type="text"
          placeholder="Add your text here!"
          required
          rows="12"
          className="block p-2.5 w-full text-lg resize-none text-medium-grey bg-light-grey rounded-lg border border-pink"
          onChange={handleChange}
        />
      </div>
      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-pink px-3 py-1.5 text-lg font-semibold leading-6 text-white shadow-sm mt-13 min-h-12 hover:bg-opacity-85"
        >
          Give me the butter
        </button>
      </div>
    </form>
  )
}

export default MessageInputBox

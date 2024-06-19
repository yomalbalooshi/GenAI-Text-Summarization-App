import CopyToClipboardButton from './CopyToClipboardButton'

const SummaryTextBox = ({ resultMessage, handleChange }) => {
  return (
    <div className="mt-8 flex flex-wrap justify-end">
      <textarea
        id="message"
        name="message"
        type="text"
        value={resultMessage}
        onChange={handleChange}
        required
        rows="12"
        className="resize-none block p-2.5 w-full text-lg text-medium-grey bg-white rounded-lg border border-pink"
      />
      <CopyToClipboardButton resultMessage={resultMessage} />
    </div>
  )
}
export default SummaryTextBox

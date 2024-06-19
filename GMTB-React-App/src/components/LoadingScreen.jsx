const LoadingScreen = () => {
  return (
    <div className=" pb-20 flex items-center flex-col justify-center h-full">
      <img
        src="../loadingAnimation.gif"
        alt="loading screen"
        className=" max-w-20 opacity-65"
      />
      <p className=" text-blue">Just a moment . . .</p>
    </div>
  )
}
export default LoadingScreen

const Header = () => {
  return (
    <header className="bg-blue  border-b border-light-grey">
      <div className="px-4 mx-auto py-4 w-full sm:px-6 lg:px-8">
        <div className="flex-shrink-0">
          <span href="#" title="" className="flex justify-start">
            <img
              className="w-auto h-8 lg:h-10"
              src="/appLogo.png"
              alt="GMTB app logo"
            />
            <h3 className=" text-white text-3xl font-semibold pl-3">
              Give me the butter
            </h3>
          </span>
        </div>
      </div>
    </header>
  )
}
export default Header

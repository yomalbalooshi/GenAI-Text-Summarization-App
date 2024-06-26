import './App.css'
// import 'primereact/resources/themes/bootstrap4-light-blue/theme.css'
import Header from './components/Header'
import MainContainer from './components/MainContainer'
const App = () => {
  return (
    <main className="font-nunito">
      <Header />
      <div>
        <MainContainer />
      </div>
    </main>
  )
}

export default App

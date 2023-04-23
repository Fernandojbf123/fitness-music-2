import './App.css'
import ExerciseCard from './components/exerciseCard'
import Header from "./components/header"

function App() {
  
  return (
    <>
      <section>
        <Header />

      </section>
        
      <section>

        <div>
          Agregar tarjeta de ejercicios
        </div>

        <div>
          <ExerciseCard />
          <ExerciseCard />
          <ExerciseCard />
        </div>



      </section>
      
      
    </>
  )
}

export default App

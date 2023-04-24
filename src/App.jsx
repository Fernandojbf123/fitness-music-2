import './App.css'
import AddExercise from './components/addExercise'
import ExerciseCard from './components/exerciseCard'
import Header from "./components/header"
import exerciseCards from './exampleData'

function App() {
  
  return (
    
    <div className='App'>
      <section className='AppHeader'>
        <Header />

      </section>
        
      <section className='AppBody'>

        {exerciseCards.length > 0 ? (
            exerciseCards.map( (exerciseCard,idx) => (  
              <ExerciseCard 
                exerciseCard={exerciseCard}
                key={idx}
              />
            ))  
        ):(
            <div>
              AGREGA UN SET DE EJERCICIOS
            </div>
        )}
        <div className='addSet'>
          Add a new set
        </div>



      </section>
      
      
    </div>
  )
}

export default App

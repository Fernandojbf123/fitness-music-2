import ExerciseCard from "./components/exerciseCard"
import Header from "./components/header"
import useFitness from "./hooks/useFitness";
import Modal from "./components/modal";

function App() {

  const {data,isModalActive, timeLeft} = useFitness();
  const groups = data.sets;


  return (
      <div className="min-h-screen flex flex-col">
        
        
        <Header />  

        <main className="mt-[100px] bg-gradient-to-br from-purple-700 to-violet-800 flex-grow">
          {groups?.length>0 ? ( 

            groups?.map ( group => (
              <ExerciseCard 
                key={group.id}
                groupId={group.id}
                data={data}/>
              
            ))
          
          ):(
            null
          )
        }   
        </main>
      
      {isModalActive && <Modal/>   }
      
          
      </div>
  )
}

export default App

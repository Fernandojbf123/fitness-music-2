import ExerciseCard from "./components/exerciseCard"
import Header from "./components/header"
import useFitness from "./hooks/useFitness";


function App() {

  const {data} = useFitness();
  const groups = data.sets;

  console.log(data)

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

        <div>
          <button className='btn'>{`START`}</button>
        </div>     
      </div>
  )
}

export default App

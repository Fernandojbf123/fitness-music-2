import ExerciseCard from "./components/exerciseCard"
import Header from "./components/header"
import useFitness from "./hooks/useFitness";
import Modal from "./components/modal";

function App() {

  const {data,isModalActive, timeLeft} = useFitness();
  const groups = data.sets;


  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-700 to-gray-900">

      <div className="md:w-1/3 md:mx-auto">
        <Header />

        <main className="mt-[100px] flex-grow">
          {groups?.length > 0 ? (

            groups?.map(group => (
              <ExerciseCard
                key={group.id}
                groupId={group.id}
                data={data} />

            ))

          ) : (
            null
          )
          }
        </main>

        {isModalActive && <Modal />}
      </div>

    </div>
  )
}

export default App

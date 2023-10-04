
import useFitness from "../hooks/useFitness";
import ExerciseForm from "./ExerciseForm"

const ExerciseCard = ({groupId}) =>  {

    const {data, handleAddExercise, handleCopySet} = useFitness();
    const exercisesData = data.exercisesData.filter( exercise => exercise.groupId === groupId)
    const idx = data.sets.findIndex(set => set.id === groupId)
    const title = data.sets[idx].title;

    return (
        <div className=''>
            <header className='mt-2 flex flex-row items-center bg-green-600 rounded-t-md '>
                <h2 className="w-1/2 text-3xl font-bold text-slate-100 text-center uppercase">{title}</h2> 
                
                <div className="w-1/2 p-2 flex justify-end">
                    <button
                        onClick={e => handleCopySet(groupId)}
                        className="w-[50px] h-[50px] text-gray-800 font-bold text-center rounded-full bg-slate-200 active:scale-90 active:bg-green-200"
                        >Copy set
                    </button>
                </div>
            </header>

            <section className="w-full bg-slate-300 rounded-b-md">
                {exercisesData?.length>0 ? (     
                    exercisesData?.map (exercise => (
                        <ExerciseForm 
                            key={exercise.id}
                            exerciseData={exercise}
                            groupId={groupId}
                            />
                    ))           
                ):(
                    null
                )}
            </section>

            <button
                onClick={e => handleAddExercise(e,groupId)}
                className="px-5 py-2 text-center text-gray-800 font-bold rounded-full bg-slate-200 active:scale-90"
                >ADD EXERCISE
            </button>

        </div>
    )
}

export default ExerciseCard
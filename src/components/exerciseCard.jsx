
import useFitness from "../hooks/useFitness";
import ExerciseForm from "./ExerciseForm"
import { useState } from "react";

const ExerciseCard = ({groupId}) =>  {

    const {data} = useFitness();
    const exercisesData = data.exercisesData.filter( exercise => exercise.groupId === groupId)
    
    return (
        <div className='px-3'>
            <header className='mt-2 flex flex-row items-center bg-pink-600 '>
                <h2 className="w-1/2 text-center">{`SET Nº 1`}</h2> 
                
                <div className="w-1/2 p-2 flex justify-end">
                    <button
                        className="w-[50px] h-[50px] text-center rounded-full bg-purple-400 active:scale-90"
                        >Copy set
                    </button>
                </div>
            </header>

            <section className="w-full bg-slate-300">
                {exercisesData?.length>0 ? (     
                    exercisesData?.map (exercise => (
                        <ExerciseForm 
                            key={exercise.id}
                            exerciseData={exercise}
                            />
                    ))           
                ):(
                    null
                )}
            </section>

            <button
                className="px-5 py-2 text-center rounded-full bg-purple-400 active:scale-90"
                >ADD EXERCISE
            </button>

        </div>
    )
}

export default ExerciseCard
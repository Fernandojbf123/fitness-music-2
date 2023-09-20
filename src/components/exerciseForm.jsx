import useFitness from "../hooks/useFitness"

const ExerciseForm = ({exerciseData}) => {

  const {id, name, duration} = exerciseData;
  const {handleUpdateExercise, handleChangeExerciseDuration, handleDeleteExercise} = useFitness();

  return (

    <form className='py-3 flex flew-row gap-2'>
      <div className='w-3/6'>
        <input
          name="name"
          className="w-full"
          type='text'
          placeholder='add an exercise'
          value={name}
          onChange={e => handleUpdateExercise(e,id)}
          />
      </div>

      <div className='w-1/6'>
        <input
          name="duration"
          className="w-full"
          type='number'
          placeholder="30"
          value={duration}
          onChange={e => handleUpdateExercise(e,id)}
          />
      </div>

      <div className='w-1/6 flex flex-row items-center justify-center gap-2'>
        <button 
          onClick={e => handleChangeExerciseDuration(e,id,+5)}
          className='w-[30px] h-[30px] bg-pink-600 rounded-md active:scale-90'>{`+`}</button>
        <button 
          onClick={e => handleChangeExerciseDuration(e,id,-5)}
          className='w-[30px] h-[30px] bg-pink-600 rounded-md active:scale-90'>{`-`}</button>
      </div>

      <div className='w-1/6 flex flex-row items-center justify-center'>
        <button
          className="w-[30px] h-[30px] bg-red-800 rounded-md text-white active:scale-90"
          onClick={e => handleDeleteExercise(e, id)}
        >X</button>
      </div>
    </form>  
  )
}

export default ExerciseForm

            
            
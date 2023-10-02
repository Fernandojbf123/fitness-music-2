import useFitness from "../hooks/useFitness"
import ErrorMsg from "./errorMsg"

const Header = () => {

  const {errorMsg, handleAddSet, handleStart} = useFitness()
  return (
    <header className='fixed w-full h-[100px] px-5 bg-gradient-to-br from-violet-900 to-violet-800 flex flex-col justify-center'>

        <div className="flex flex-row">
          <div className="flex-1">
            <button 
              className="px-3 py-2 bg-slate-200 rounded-md active:bg-pink-500 active:scale-90"
              onClick={handleStart}
              >{`START`}</button>
          </div>
          
          <button 
            className="w-[50px] h-[50px] text-center rounded-full bg-purple-400 active:scale-90"
            onClick={handleAddSet}
            >Add Set</button>
        </div>

        {errorMsg &&
          <ErrorMsg 
            errorMsg={errorMsg}
          />
        }
        
        
        
    </header>
  )
}

export default Header

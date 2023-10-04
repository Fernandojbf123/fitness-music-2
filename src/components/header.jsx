import useFitness from "../hooks/useFitness"
import ErrorMsg from "./errorMsg"

const Header = () => {

  const {errorMsg, handleAddSet, handleStart} = useFitness()
  return (
    <header className='fixed md:w-1/3 w-full h-[100px] px-5 bg-gradient-to-br from-green-900 to-slate-800 flex flex-col justify-center'>

        <div className="flex flex-row">
          <div className="flex-1">
            <button 
              className="px-3 py-2 text-gray-800 font-bold bg-slate-200 rounded-md active:bg-green-400 active:scale-90"
              onClick={handleStart}
              >{`START`}</button>
          </div>
          
          <button 
            className="w-[50px] h-[50px] text-gray-800 font-bold text-center rounded-full bg-slate-200 active:scale-90 active:bg-green-400"
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

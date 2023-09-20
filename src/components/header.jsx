import useFitness from "../hooks/useFitness"

const Header = () => {

  const {handleAddSet} = useFitness()

  return (
    <header className='fixed w-full h-[100px] px-5 bg-gradient-to-br from-violet-900 to-violet-800 flex justify-end items-center'>

        <button 
          className="w-[50px] h-[50px] text-center rounded-full bg-purple-400 active:scale-90"
          onClick={handleAddSet}
          >Add Set</button>

    </header>
  )
}

export default Header

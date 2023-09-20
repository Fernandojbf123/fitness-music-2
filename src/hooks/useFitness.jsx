import { useContext } from "react";
import FitnessContext from "../context/fitnessProvider";

const useFitness = () => {
    return useContext(FitnessContext)
}

export default useFitness
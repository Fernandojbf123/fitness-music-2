let initialData = {
    sets: {
      "set-1": {id: "set-1", title: "set 1", exercisesId: ["1-1", "1-2", "1-3","1-4","1-5"]},
    },
    exercisesData:{
      "1-1": {id:"1-1", name: "Saltar la cuerda", duration: 90, preparation: 20, isValid: false},
      "1-2": {id:"1-2", name: "Sentadilla", duration: 60, preparation: 20, isValid: false,},
      "1-3": {id:"1-3", name: "Flexiones", duration: 45, preparation: 20, isValid: false,},
      "1-4": {id:"1-4", name: "Plancha", duration: 45, preparation: 20, isValid: false,},
      "1-5": {id:"1-5", name: "Descanso", duration: 90, preparation: 20, isValid: false,},
    },
    setsOrder: ["set-1"],

    addExcercise: function (keyOfCurrentSet, newExerciseId) {
      this.sets[keyOfCurrentSet].exercisesId.push(newExerciseId);
      this.exercisesData[newExerciseId] = {
        id: newExerciseId,
        name: "",
        duration: 30,
        preparation: 20,
        isValid: false,
      }
    },

    addSet: function () {
      let newSet = Object.keys(this.sets).length + 1;
      let newKeyOfSet= `set-${newSet}`
      let newExerciseId = `${newSet}-1`

      this.sets[newKeyOfSet] = {
        id: newKeyOfSet,
        title: `set ${newSet}`,
        exercisesId: []
      }
      this.addExcercise(newKeyOfSet,newExerciseId)
      this.setsOrder.push(newKeyOfSet)
    },

    copySet: function (currentSet) {
      //currentSet = number of current set
      let newSet = Object.keys(this.sets).length + 1; //number of the new set
      let keyOfNewSet= `set-${newSet}`
      let keyOfCurrentSet = `set-${currentSet+1}`
      let numberOfExercisesInCurrentSet = this.sets[keyOfCurrentSet].exercisesId.length

      this.sets[keyOfNewSet] = {
        id: keyOfNewSet,
        title: `set ${newSet}`,
        exercisesId: []
      }

      this.setsOrder.push(keyOfNewSet)
      
      for (let iexercise=0; iexercise<numberOfExercisesInCurrentSet;iexercise++){
        let newExerciseId = `${newSet}-${iexercise+1}`
        let oldExerciseId = this.sets[keyOfCurrentSet].exercisesId[iexercise]
        this.sets[keyOfNewSet].exercisesId.push(newExerciseId);
        this.exercisesData[newExerciseId] = this.exercisesData[oldExerciseId]
        this.exercisesData[newExerciseId].id = newExerciseId
      }
    }
}


export {initialData}
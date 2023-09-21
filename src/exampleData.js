let initialData = {
    sets: [
      {id: "asd", title: "set 1", exercisesId: ["123", "1234", "12345","123456","1234567"]},
      {id: "asdf", title: "set 2", exercisesId: ["2","23"]},
    ],
    exercisesData:[
      {groupId:"asd", id:"123", name: "Saltar la cuerda", duration: 90, preparation: 20, isValid: false},
      {groupId:"asd", id:"1234", name: "Sentadilla", duration: 60, preparation: 20, isValid: false,},
      {groupId:"asd", id:"12345", name: "Flexiones", duration: 45, preparation: 20, isValid: false,},
      {groupId:"asd", id:"123456", name: "Plancha", duration: 45, preparation: 20, isValid: false,},
      {groupId:"asd", id:"1234567", name: "Descanso", duration: 90, preparation: 20, isValid: false,},
      {groupId:"asdf", id:"2", name: "Saltar la cuerda", duration: 90, preparation: 20, isValid: false,},
      {groupId:"asdf", id:"23", name: "Saltar la 1", duration: 90, preparation: 20, isValid: false,},
    ],
    setsOrder: ["asd","asdf"],

    // addExcercise: function (keyOfCurrentSet, newExerciseId) {
    //   this.sets[keyOfCurrentSet].exercisesId.push(newExerciseId);
    //   this.exercisesData[newExerciseId] = {
    //     id: newExerciseId,
    //     name: "",
    //     duration: 30,
    //     preparation: 20,
    //     isValid: false,
    //   }
    // },

    // addSet: function () {
    //   let newSet = Object.keys(this.sets).length + 1;
    //   let newKeyOfSet= `set-${newSet}`
    //   let newExerciseId = `${newSet}-1`

    //   this.sets[newKeyOfSet] = {
    //     id: newKeyOfSet,
    //     title: `set ${newSet}`,
    //     exercisesId: []
    //   }
    //   this.addExcercise(newKeyOfSet,newExerciseId)
    //   this.setsOrder.push(newKeyOfSet)
    // },

    // copySet: function (currentSet) {
    //   //currentSet = number of current set
    //   let newSet = Object.keys(this.sets).length + 1; //number of the new set
    //   let keyOfNewSet= `set-${newSet}`
    //   let keyOfCurrentSet = `set-${currentSet+1}`
    //   let numberOfExercisesInCurrentSet = this.sets[keyOfCurrentSet].exercisesId.length

    //   this.sets[keyOfNewSet] = {
    //     id: keyOfNewSet,
    //     title: `set ${newSet}`,
    //     exercisesId: []
    //   }

    //   this.setsOrder.push(keyOfNewSet)
      
    //   for (let iexercise=0; iexercise<numberOfExercisesInCurrentSet;iexercise++){
    //     let newExerciseId = `${newSet}-${iexercise+1}`
    //     let oldExerciseId = this.sets[keyOfCurrentSet].exercisesId[iexercise]
    //     this.sets[keyOfNewSet].exercisesId.push(newExerciseId);
    //     this.exercisesData[newExerciseId] = this.exercisesData[oldExerciseId]
    //     this.exercisesData[newExerciseId].id = newExerciseId
    //   }
    // }
}


export {initialData}
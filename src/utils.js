/* GENERATE RANDOM UNIQUE ID */
export function uuid() {
  //1. generate random number between 0 and 1 -> 0.31827174884176346
  //2. convert to string -> 0.517a41e0841f2
  //3. slice(startIndex, endIndex) string from 2 to the end of string -> 517a41e0841f2
  return Math.random()
    .toString(16)
    .slice(2);
}

/* UPDATE BOARD SAVED IN LOCALSTORAGE EVERY TIME WHEN IT IS CHANGED */
export function saveStatePlugin(store) {
  //subscribe to store mutations in vuex (pass a callback to be executed)
  //console.log(mutation.type)
  //console.log(mutation.payload)
  store.subscribe((mutation, state) => {
    localStorage.setItem("board", JSON.stringify(state.board));
  });

  //subscribe to store actions in vuex
  // store.subscribeAction((action, state) => {
  //   console.log(action.type)
  //   console.log(action.payload)
  // })
}

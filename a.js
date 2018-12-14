const current = require('./myzone').current;

// a zone has a name, a parent, and data
console.log(
  current.name,   // "<root>"
  current.parent, // null
  current.data    // { __proto__: null }
)

// create a new child zone
const myZone = current.fork('my zone')

console.log(
  myZone.name,   // "my zone"
  myZone.parent, // current
  myZone.data    // { __proto__: current.data }
)

// run some code in it
myZone.run(() => {
  console.log(current.name) // "my zone"

  // zone is preserved in async functions
  process.nextTick(() => {
    console.log(current.name) // "my zone"
  })
})

console.log(current.name) // "<root>"

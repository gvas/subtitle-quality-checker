/*global Promise, FileReader*/
export function readFile(file, encoding = 'UTF-8') {

  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.addEventListener('load', (event) => {
      resolve(event.target.result)
    })

    reader.addEventListener('error', (event) => {
      reject(`${event.name}: ${event.message}`)
    })

    reader.readAsText(file, encoding)
  })
}

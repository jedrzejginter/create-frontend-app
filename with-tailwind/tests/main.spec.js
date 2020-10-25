const fs = require('fs')

test('has tailwind.config.js', () => {
  expect(fs.existsSync('out/tailwind.config.js')).toBe(true)
})

test('has tailwind css file', () => {
  expect(fs.existsSync('out/src/assets/css/tailwind.css')).toBe(true)
})

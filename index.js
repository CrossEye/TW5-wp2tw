const csvFilePath='./exports.csv'
const csv = require('csvtojson')
const {writeFile:wf} = require ('fs/promises')
const writeObj = (name) => (content) => wf (name, JSON.stringify(content, null, 4))

const convert = (s) =>  Object .entries (s) .map (([Title, rest]) => ({Title, ...rest})) .map (
  ({Title, Text, Date: d, tags = '', ...rest}) => ({
  title: Title,
  tags: `[[${tags .split ('|') .join(']] [[')}]]`,
  date: d,
  created: `${d .replace (/\D/g, '')}120000000`,
  modified: `${d .replace (/\D/g, '')}120000000`,
  ...rest,
  'wordpress-sourced': 'yes',
  text: Text
    .replace (/<!-- wp:paragraph -->\s*/g, '')
    .replace(/<!-- \/wp:paragraph -->\s*/g, '\n')
    .replace(/<!-- wp:[^>]+>\s*/g, '')
    .replace(/<!-- \/wp:[^>]+>/g, '')
}))

const main = (input, output) => csv()
  .fromFile (input)
  .then (convert)
  .then (writeObj (output))
  .then (() => console .log (`convered "${input}" to "${output}".`))
  .catch (console .warn)

main (process .argv [2], process .argv [3])


import * as fs from 'fs'
const msgPath = process.env.HUSKY_GIT_PARAMS
const msg = fs.readFileSync(msgPath, 'utf-8').trim()

console.log('123')
console.log(msg)
const commitRE = /^(v\d+\.\d+\.\d+(-(alpha|beta|rc.\d+))?$)|((revert: )?(feat|fix|docs|style|refactor|perf|test|workflow|ci|chore|types|build)(\(.+\))?: .{1,50})/

if (!commitRE.test(msg)) {
  console.log()
  console.error(
    `  ${' ERROR '} ${`invalid commit message format.`}\n\n` +
    `  Proper commit message format is required for automated changelog generation. Examples:\n\n` +
    `    ${`feat(compiler): add 'comments' option`}\n` +
    `    ${`fix(v-model): handle events on blur (close #28)`}\n\n` +
    `  See .github/COMMIT_CONVENTION.md for more details.\n` +
    `  You can also use ${`npm run commit`} to interactively generate a commit message.\n`
  )
  process.exit(1)
}

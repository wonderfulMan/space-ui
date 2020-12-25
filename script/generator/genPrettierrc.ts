import {PACKAGES_CONFIG} from '../config'
import {writeFile} from '../help'
const baseConfig = JSON.stringify(
    {
        printWidth: 120,
        semi: false,
        singleQuote: true,
        trailingComma: 'all',
        bracketSpacing: false,
        jsxBracketSameLine: true,
        arrowParens: 'avoid',
        insertPragma: false,
        tabWidth: 4,
        useTabs: false,
        requirePragma: false,
    },
    null,
    2,
)

export default async (targetPath: string): Promise<void> => {
    const content = `module.exports = ${baseConfig}`
    await writeFile(targetPath, PACKAGES_CONFIG['prettierrc'], content)
}

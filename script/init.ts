import {existsFile, getDirsPathConfig, readDirNames, throwError} from './help'
import {PACKAGES_CONFIG} from './config'

function rewritePackageJson(path: string): Array<string> {}

/**
 * @description 初始化每个package文件夹的开发配置选项（eslint，typescript等）
 * @returns {Promise<void>}
 */
async function initPackages(): Promise<void> {
    const packagesNames = readDirNames('../' + PACKAGES_CONFIG.packages)
    if (packagesNames) {
        const packagesNameConfigs = getDirsPathConfig(packagesNames, '../' + PACKAGES_CONFIG.packages)

        for await (const {resolveDirPath} of packagesNameConfigs) {
            const eslintrcPath = `${resolveDirPath}/${PACKAGES_CONFIG['eslintrc']}`
            const tsconfigPath = `${resolveDirPath}/${PACKAGES_CONFIG['tsconfig']}`
            const prettierrcPath = `${resolveDirPath}/${PACKAGES_CONFIG['prettierrc']}`
            const packageJsonPath = `${resolveDirPath}/${PACKAGES_CONFIG['packageJson']}`

            switch (true) {
                case existsFile(eslintrcPath):
                    break
                case existsFile(tsconfigPath):
                    break
                case existsFile(prettierrcPath):
                    break
                default:
                    break
            }

            await rewritePackageJson(packageJsonPath)
        }
    }
}

initPackages().catch(error => {
    throwError(error)
})

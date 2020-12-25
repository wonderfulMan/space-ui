import {existsFile, getDirsPathConfig, readDirNames, throwError, genPackagesDevelopConfigsPath} from './help'
import {PACKAGES_CONFIG} from './config'
import genPrettierrc from './generator/genPrettierrc'

function rewritePackageJson(path: string): void {}

/**
 * @description 初始化每个package文件夹的开发配置选项（eslint，typescript等）
 * @returns {Promise<void>}
 */
async function initPackages(): Promise<void> {
    const packagesNames = readDirNames(PACKAGES_CONFIG.components)

    if (packagesNames) {
        const packagesNameConfigs = getDirsPathConfig(packagesNames, PACKAGES_CONFIG.components)

        for await (const {resolveDirPath} of packagesNameConfigs) {
            const {eslintrcPath, tsconfigPath, prettierrcPath, packageJsonPath} = genPackagesDevelopConfigsPath(
                resolveDirPath,
                PACKAGES_CONFIG,
            )
            switch (true) {
                case !existsFile(prettierrcPath):
                    genPrettierrc(resolveDirPath)
                    break
                case !existsFile(eslintrcPath):
                    break
                case !existsFile(tsconfigPath):
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

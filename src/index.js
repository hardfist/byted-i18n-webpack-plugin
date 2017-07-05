/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import ModuleFilenameHelpers from 'webpack/lib/ModuleFilenameHelpers';

const textTable = {};

/**
 *
 * @param {object|function} localization
 * @param {object|string} Options object or obselete functionName string
 * @constructor
 */
class I18nPlugin {
  constructor(localization, options) {
    this.localization = localization || {};
    this.options = options || {};
    this.failOnMissing = !!this.options.failOnMissing;
    this.hideMessage = this.options.hideMessage || false;
    this.objectName = this.options.objectName || '__';
  }

  apply(compiler) {
    const { options } = this;
    const name = this.objectName;
    const outputPath = compiler.options.output.path;

    compiler.plugin('compilation', (compilation) => {
      compilation.plugin('optimize-chunk-assets', (chunks, callback) => {
        const files = [];
        chunks.forEach(chunk => files.push(...chunk.files));
        files.push(...compilation.additionalChunkAssets);
        const filteredFiles = files.filter(ModuleFilenameHelpers.matchObject.bind(null, options));
        Object.keys(this.localization).forEach((lan) => {
          textTable[lan] = {};
          filteredFiles.forEach((file) => {
            const asset = compilation.assets[file];
            const input = asset.source();
            const regex = new RegExp(`\\W${name}\\.\\w+?\\W`, 'g');
            const match = input.match(regex);
            if (match) {
              const table = {};
              textTable[lan][file] = table;
              match.forEach((item) => {
                const itemName = item.slice(name.length + 2, item.length - 1);
                table[itemName] = (this.localization[lan] || {})[itemName];
              });
            }
          });
        });
        callback();
      });
    });
    // 编译完成
    compiler.plugin('done', () => {
      Object.keys(this.localization).forEach((lan) => {
        const outputFilePath = path.join(outputPath, `${lan}.table.json`);
        const relativeOutputPath = path.relative(process.cwd(), outputFilePath);
        mkdirp.sync(path.dirname(relativeOutputPath));
        fs.writeFileSync(relativeOutputPath.split('?')[0], JSON.stringify(textTable[lan]));
      });
    });
  }
}

export default I18nPlugin;

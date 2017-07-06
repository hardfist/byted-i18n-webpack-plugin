<div align="center">
  <!-- replace with accurate logo e.g from https://worldvectorlogo.com/ -->
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200" vspace="" hspace="25"
      src="https://cdn.rawgit.com/webpack/media/e7485eb2/logo/icon.svg">
  </a>
  <h1>i18n Plugin</h1>
  <p>i18n (localization) plugin for Webpack.<p>
</div>

## Install

```bash
npm i -D topbuzz-i18n-webpack-plugin
```

## Usage

This plugin will extract all text items for i18n into different files， classify with different js packages. example:

```json
{
  "js/pgc/signin": {
    "PasswordLengthWrong": "パスワードは、6文字以上が必要です",
    "PasswordSpaceWrong": "パスワードの最初と最後にスペースを使うことはできませんが、それ以外の場所には使うことができます",
    "SignMethodEmail": "Emailで無料会員登録する"
  },
  "js/pgc/fault": {
    "ErrorWhoops": "...あれ？...",
    "Error404": "該当するページは見つかりませんでした。",
    "Error500": "エラーが発生しました。再度お試しください。",
    "GoHome": "ホームへ"
  }
}
```
> the package name is the some as webpack entry file

## Options

```
plugins: [
  ...
  new I18nPlugin(languageConfig, optionsObj)
],
```
 - `optionsObj.objectName`: the default value is `__`, you can change it to other function name.
 - `optionsObj.devPath`: the default value is `./`, which defalut path to write files, when start in webpack dev server.
  - `optionsObj.outputPath`: the default value is output path in webpack config, which defalut path to write files.
 - `optionsObj.fileMap`: the default value is `{}`, which will map the text items in different files into the same one.

> objectName is different when you use import(es6 commonjs) or require;
  require i18n file just set modules name, 
##example
```js
  new I18nPlugin(localization, {
    devPath: './output_source',
    objectName: '_localization2.default',
    fileMap: {
      'js/pgc/earning-setting': 'js/pgc/revenue',
      'js/pgc/earning-billing': 'js/pgc/revenue',
      'js/pgc/earning-contract': 'js/pgc/revenue',
      'js/pgc/earning-overview': 'js/pgc/revenue',
      'js/pgc/stats-summary': 'js/pgc/statistics',
      'js/pgc/stats-video-analysis': 'js/pgc/statistics',
      'js/pgc/stats-content-detail': 'js/pgc/statistics'
    }
  })
```
## Maintainers

<table>
  <tbody>
    <tr>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars1.githubusercontent.com/u/3362483?v=3&s=460">
        </br>
        <a href="https://github.com/bebraw">dlutwuwei</a>
      </td>
    </tr>
  <tbody>
</table>

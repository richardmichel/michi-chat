const path = require('path');
const { override, addWebpackAlias } = require('customize-cra')

module.exports = function (config, env) {
  return Object.assign(
    config,
    override(
      addWebpackAlias({
        react: path.resolve(path.join(__dirname, './node_modules/react')),
        ['@actions'] : path.resolve(__dirname, './src/actions'),
        ['@assets'] : path.resolve(__dirname, './src/assets'),
        ['@components'] : path.resolve(__dirname, './src/components'),
        ['@config'] : path.resolve(__dirname, './src/config'),
        ['@hooks'] : path.resolve(__dirname, './src/hooks'),
        ['@reducers'] : path.resolve(__dirname, './src/reducers'),
        ['@utils'] : path.resolve(__dirname, './src/utils'),
        ['@routes'] : path.resolve(__dirname, './src/routes'),
        ['@services'] : path.resolve(__dirname, './src/services'),
        ['@store'] : path.resolve(__dirname, './src/store'),
        ['@styles'] : path.resolve(__dirname, './src/styles'),
        ['@types'] : path.resolve(__dirname, './src/types'),        
        ['@atoms'] : path.resolve(__dirname, './src/components/atoms'),
        ['@molecules'] : path.resolve(__dirname, './src/components/molecules'),
        ['@organisms'] : path.resolve(__dirname, './src/components/organisms'),
        ['@templates'] : path.resolve(__dirname, './src/components/templates'),
        ['@pages'] : path.resolve(__dirname, './src/components/pages'),
        ['@helpers'] : path.resolve(__dirname, './src/helpers'),
        ['@contexts'] : path.resolve(__dirname, './src/contexts'),
        ['@socket'] : path.resolve(__dirname, './src/socket'),
        ['@sw'] : path.resolve(__dirname, './src/sw'),
        ['@src'] : path.resolve(__dirname, './src'),
      })
    )(config, env)
  )
}
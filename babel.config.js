module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@config': './src/config',
        '@models': './src/infra/typeorm/models',
        '@controllers': './src/infra/http/controllers',
        '@middlewares': './src/infra/http/middlewares',
        '@repositories': './src/infra/typeorm/repositories',
        '@services': './src/services',
        '@providers': './src/providers',
        '@database': './src/infra/typeorm/database',
        '@dtos': './src/dtos',
        '@logger': './src/logs',
        '@ormConfig': './src/infra/typeorm',
      }
    }],
    'babel-plugin-transform-typescript-metadata',
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose": true }],
    ["@babel/plugin-transform-runtime"]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}

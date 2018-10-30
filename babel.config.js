module.exports = {
    env: {
        test: {
            presets: [
                [
                    '@babel/preset-env',
                    {
                        debug: false
                    }
                ],
                '@babel/preset-react'
            ],
            plugins: [
                '@babel/plugin-syntax-dynamic-import',
            ]
        },
        production: {
            presets: [
                ['@babel/preset-env'],
                '@babel/preset-react'
            ],
        },
        development: {
            presets: [
                ['@babel/preset-env'],
                '@babel/preset-react'
            ],
        }
    }
};
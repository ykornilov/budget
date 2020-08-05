import merge from 'webpack-merge';

export const loadTypeScript = () => {
    const { NODE_ENV } = process.env;

    const DEV = NODE_ENV === 'development';

    return merge({
        module: {
            rules: [
                {
                    test: /\.(ts)x?$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'ts-loader',
                            options: {
                                configFile: DEV ? 'tsconfig.json' : 'tsconfig.prod.json',
                            },
                        },
                    ],
                },
            ],
        },
    });
};

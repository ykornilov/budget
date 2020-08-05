import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

export const cleanBuildDirectory = () => ({
    plugins: [new CleanWebpackPlugin()],
});

export const setupBuildAnalysis = () => ({
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: 'disabled',
            openAnalyzer: false,
            generateStatsFile: true,
        }),
    ],
});

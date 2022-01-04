/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            outputPath: 'static/image/public'
          }
        }
      ]
    })

    return config
  }
}

module.exports = {
    // Avoid this unless necessary:
    webpack: (config) => {
        config.plugins.push(new SomePlugin());
        return config;
    },
};
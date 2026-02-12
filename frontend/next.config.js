module.exports = {
    
    webpack: (config) => {
        config.plugins.push(new SomePlugin());
        return config;
    },
};
const isProduction = !(!process.env.NODE_ENV || process.env.NODE_ENV === 'development');


const devConfig = {
    graphQlUrl: process.env['GQL_URL'] || 'http://localhost:3000/graphql'
};

const prodConfig = {
    graphQlUrl: '/graphql'
};

function getConfig() {
    return isProduction ? prodConfig : devConfig;
}

const Config = getConfig();
export default Config;

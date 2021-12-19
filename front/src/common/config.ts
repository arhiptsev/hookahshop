const isProduction = !(
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
);

const devConfig = {
  graphQlUrl: process.env['GQL_URL'] || 'http://localhost:4001/graphql',
  graphQlSubscriptionsUrl:
    process.env['GQL_WS_URL'] || 'ws://localhost:4001/graphql',
};

const prodConfig = {
  graphQlUrl: '/graphql',
  graphQlSubscriptionsUrl: `ws://${window.location.host}/graphql`,
};

function getConfig() {
  return isProduction ? prodConfig : devConfig;
}

const Config = getConfig();
export default Config;

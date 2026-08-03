export default () => ({
  couriers: {
    urbanebolt: {
      baseUrl: process.env.URBANEBOLT_BASE_URL,
      username: process.env.URBANEBOLT_USERNAME,
      password: process.env.URBANEBOLT_PASSWORD,
      timeout: Number(process.env.URBANEBOLT_TIMEOUT ?? 10000),
    },
  },
});

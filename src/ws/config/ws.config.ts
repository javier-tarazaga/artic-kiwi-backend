export const wsConfig = {
  maxConcurrentUserDevices: process.env.MAX_CONCURRENT_DEVICES
    ? +process.env.MAX_CONCURRENT_DEVICES
    : 5,
};

import convict from 'convict';

export const appConfig = convict({
  Port: {
    doc: 'The port to bind.',
    format: 'Number',
    default: 3000
  },
  Host: {
    doc: 'The host to bind.',
    format: 'String',
    default: '0.0.0.0'
  }
});

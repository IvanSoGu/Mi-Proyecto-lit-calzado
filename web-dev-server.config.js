const hmr = process.argv.includes('--hmr');

export default ({
  open: '/',
  watch: !hmr,
  nodeResolve: {
    exportConditions: ['browser', 'development'],
  },
  appIndex: './index.html',
  plugins: [],
});

const ghpages = require('gh-pages');

const repo = process.env.REPO_URL || 'https://newsgitlab.meishubao.com/msb-ai/dv.git';
const src = 'dist';
const dest = 'public';
console.info('publish:', repo, src, dest);
ghpages.publish(src, {dest, repo}, (err) => {
  if (err) {
    console.error(err);
  }
  console.info('publish end');
});

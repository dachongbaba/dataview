const ghpages = require('gh-pages');

const repo = process.env.REPO_URL || 'https://newsgitlab.meishubao.com/msb-ai/dataview.git';
const src = 'dist';

var dest = 'public';
if (repo.indexOf('https://github.com') === 0) {
  dest = 'public';
}

ghpages.publish(src, {dest, repo}, (err) => {
  if (err) {
    console.error(err);
  }
  console.info('publish end:', src, dest, repo);
});

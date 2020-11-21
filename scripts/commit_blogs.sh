npm run blogs

git checkout -b Blogs

git add src/content/blogs.ts
CHANGED=$(git diff-index --quiet --cached HEAD)

if [ -z $CHANGED ]; then
  git config user.name "andnp"
  git config user.email "andnpatterson@gmail.com"
  git commit -m "add blog"
  git push --set-upstream origin Blogs
  curl -H "Authorization: token $1" -X POST -d '{ "title": "Add Blog", "head": "Blogs", "base": "develop" }' "https://api.github.com/repos/andnp/andnp.github.io/pulls" -H "Content-Type:application/json"
fi

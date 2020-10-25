npm run publications

git checkout -b Publication

git add src/content/publications.ts
CHANGED=$(git diff-index --quiet --cached HEAD)

if [ -z $CHANGED ]; then
  echo "hey there"
  git push --set-upstream origin Publication
  curl -H "Authorization: token $1" -X POST -d '{ "title": "Add Publication", "head": "Publication", "base": "develop" }' "https://api.github.com/repos/andnp/andnp.github.io/pulls" -H "Content-Type:application/json"
fi

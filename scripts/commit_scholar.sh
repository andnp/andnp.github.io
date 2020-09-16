npm run publications

git checkout -b Publication

git add src/content/publications.ts
CHANGED=$(git diff-index --quiet --cached HEAD) || git commit -m "updating papers"

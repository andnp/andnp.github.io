tmp=`git subtree split --prefix build develop`
echo ${tmp}
git push origin $tmp:master --force


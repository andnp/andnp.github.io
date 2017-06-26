tmp=`git subtree split --prefix dist develop`
echo ${tmp}
git push origin $tmp:master --force


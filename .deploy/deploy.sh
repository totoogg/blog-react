cd ~/blog-react
npm run build:prod

rm -rf ~/../var/www/blog_react/html
mv ~/blog-react/build ~/../var/www/blog_react/html
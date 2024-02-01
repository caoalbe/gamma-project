enter environment (`env`):
`env\Scripts\activate.bat` <-- root directory

start server:
`python manage.py runserver` <-- root/gamma directory

synchronize db in drastic situations:
https://stackoverflow.com/questions/25771755/django-operationalerror-no-such-table

or try:
delete every file, then
`python manage.py createmigrations backend`
`python manage.py migrate backend`
`python manage.py migrate`

run the frontend:
`npm start` <-- frontend directory

build:
`npm run build` <-- same directory

TODO frontend:

- reply function
- replace fake data (like/reply count for post)
- image upload
- css styling lookup table
- different screen sizes (use absolute sizes i think)
- replace 'React App' and atom icon in tab bar
- make scrollbar consistent
- edit profile page
- settings page
- this profile doesnt exist page
- no posts recovered page
- prettier 404 page
- pattern match @<username> so that it links to /<username>

TODO backend:

- prevent user handles matching route urls
- implement bookmarks
- implement replying to posts
- implement qrts?

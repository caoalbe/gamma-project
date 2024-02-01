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

- action row
- replace fake data (following/follower/post count, join date)
- css styling lookup table
- tweet hover colour
- different screen sizes
- replace 'React App' and atom icon in tab bar
- make scrollbar consistent
- this profile doesnt exist page
- no posts recovered page
- prettier 404 page

TODO backend:

- prevent user handles matching route urls
- implement bookmarks
- implement replying to posts
- implement qrts?

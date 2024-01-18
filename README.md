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

TODO:

- css styling lookup table
- account creation form
- account sign in form
- prevent user handles matching route urls
- automate datetime in post creation
- prettier 404 page

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

\*\*for some reason; we cant detect the global python install??

run the frontend:
`npm start` <-- frontend directory

build:
`npm run build` <-- same directory

TODO:

- account creation form
- accoung sign in form
- connect posts to accounts with foreign key
- add time of day to posts models
- automate datetime in post creation

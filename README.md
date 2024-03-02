enter environment (`env`):
`env\Scripts\activate.bat` <-- root directory

start server:
`python manage.py runserver` <-- root/gamma directory

run the frontend:
`npm start` <-- frontend directory

build:
`npm run build` <-- same directory

TODO frontend:

- replace 'React App' and atom icon in tab bar
- persist login on page refresh (cookies?)
- settings page
- make scrollbar consistent
- enforce character limit on frontend
- this profile doesnt exist page
- no posts recovered page
- prettier 404 page
- pattern match @<username> so that it links to /<username>

TODO backend:

- prevent user handles matching route urls
- implement bookmarks
- implement qrts

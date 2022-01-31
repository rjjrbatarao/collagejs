# collagejs
Collagejs is a solution i've created for microcontrollers embedded ui for serverside processing of frontend with direct injection of preprocessed data. I've previously
used React and Preact as web ui of esp8266 and esp32 but updating their gui is a pain since you have to deal with changes on both frontend and backend, also its not intended for microcontroller use because of the large build size. Collagejs aims to provide convenience of updating the ui just from the backend, without ever touching the fronetend files, another bonus is that its very light weight (about 1kb gzipped).

# features
* Event or Manual driven Lazyloading
* Server side templating
* Direct integration from Firebase, MongoDb, GrapHql, Mysql or any Database that can store json
* Frontend from Database (FFD)
* Super lightweight
* Canbe used as library for popular framework like Reactjs

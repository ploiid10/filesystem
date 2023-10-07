# filesystem

# HOW TO RUN
1. install packages by running npm install
2. run the app by running `npm run start`

#  HOW TO TEST APIs

## GET `localhost:3000/files`
### returns a list of files and folders in the public directory

## POST `localhost/3000/file/create`
### creates a file in the public directory
### accepts bot url encoded and json data
 ** sample url encoded curl request**
> curl --location 'localhost:3000/file/create' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'content={ "json": "sample"  }' \
--data-urlencode 'name=sample data'

 ** sample json data request **
> curl --location 'localhost:3000/file/create' \
--header 'Content-Type: application/json' \
--data '{
    "content": { "json": "new"  },
    "name": "sample data"
}'


## GET `localhost:3000/file/:filename`
### returns the content of a json file in the public directory
 ** sample curl request **
> curl --location 'localhost:3000/file/sample data'



## PUT `localhost:3000/file/:filename`
### updates a file in the public directory
### accepts bot url encoded and json data
 ** sample url encoded curl request**
> curl --location --request PUT 'localhost:3000/file/sample data(1)' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'content={ "updated": "sample"  }'

 ** sample json data request**
> curl --location --request PUT 'localhost:3000/file/sample data(1)' \
--header 'Content-Type: application/json' \
--data '{
    "content": { "updated": "data"  }
}'


## DELETE `localhost:3000/file/:filename`
### deletes a file in the public directory
  ** sample curl request **
> curl --location --request DELETE 'localhost:3000/file/sample data(1)'
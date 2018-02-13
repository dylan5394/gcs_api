## To run local webserver on port 3000:

1. Clone git repo
2. cd gcs_api
3. npm install
4. npm run dev

## Testing:

npm test

## Notes:

To get a signed url, send a get request to the following api endpoint:

localhost:3000/signed_urls

The response will be in the format:
{
	"signed_url": "..."
}

The above endpoint takes 3 query parameters:

1. expires - The time the signed url will expire. Must be a timestamp in seconds. (Default 1 hour from the time the API receives your request)
2. requestType - Must be GET, PUT, DELETE, or POST. Note that a signed url using POST may not work due to policy issues with GCS. PUT is more reliable. (Default GET)
3. contentType - Must be application/json or application/xml due to simplicity and issues when combining certain content types with GCS urls (Default none)

The returned signed url will be encoded according to any query parameters you supply. If no parameters are supplied in your request, the signed url will be a GET request expiring in 1 hour.

example request with parameters: 

localhost:3000/signed_urls?requestType=PUT&contentType=application/json

All signed urls generated will allow access to a file called 'info.json' in a bucket called 'hangar-demo-bucket'.

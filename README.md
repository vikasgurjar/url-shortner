# A simple URL Shortner written in Node.js

Set *MONGODB_URL* and *BASE_URL* in **.env** file of root folder

Run "npm i"

Run test Cases using "npm test"

Run application using "npm start"


### 1.  Create New Short Uri
    
    method:POST

    url: ${base_url}/short 
    
    body: {
        url:'http://www.google.com'
    }
   

### 2.   Redirect request
    
        method:GET

        url: ${base_url}/:shortUrl
       
   

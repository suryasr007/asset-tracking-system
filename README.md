# Asset Tracking System
All the requirments is being captured in [google docs](https://docs.google.com/document/d/1l1tBejaVB3IMFXDzTWkdkq_hxscNkiufSKnMuHZFkPw)


## To run the App
1. Make sure node in installed
2. Clone the repo
``` bash
   git clone git@github.com:suryasr007/asset-tracking-system.git
```

3. Insert your mongo key.
Create a file *keys* and file it under *config* folder and insert your mongo key in the following format.
``` javascript
module.exports={
    MongoURI:"<mongokey>"
}
```
4. Install the node modules and run the app.
``` bash
   npm install
   npm run start
```



## Design
We will use Model-View-(Component/Controller) design pattern for this.
  * #### Models
    * ~~User(or Company) Model: To store details of comapany. It has the following fields~~
       * ~~user.id: Generated by mongo schema~~
       * ~~Name: Pushed from form/component~~
       * ~~E-mail: Pushed from form/component~~
       * ~~Password (Hashed): Pushed from form/component~~
       * ~~Address: Geometrical co-ordinates: Pushed from form/component~~
       * ~~Mobile: Pushed from form/component~~
       * ~~Type: (Manufacturer, Supplier, Sub-Supplier) : Pushed from form/component~~
    
    * Part Request: To store supplier details for a product.
       * request.id: Generated by mongo schema 
       * user.id (Manufacturer): Fetch from session variable
       * user.type: Fetch from session variable
       * Part Name: Fetched from form
       * Part Number: Fetched from form
       * Supplier Name: Fetched from form
       * Supplier E-mail (Should exists in User db): Fetched from form
       * Supplier Address: Fetched from user db
       * Path of uploaded file: Fetched from component
       * Supplier Acceptance Status: Fetched from component
       * Total Bill value: Fetched from component
       * Dependent-Supplier Name: 
       * Dependent-Supplier Address: Geometrical co-ordinates: Fetched from form
       * Date and time of registration: Generated at time of registration.
    
    * Manufacturer-Supplier-sub-supplier Mapping:
       * Request.id:
       * Manufacturer.id:
       * Supplier.id:
       * Sub-Supplier.id:

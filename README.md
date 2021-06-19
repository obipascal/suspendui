# Getting Started with SuspendUI



## Installing The Package Using NPM

To use this package you need to install it via npm. This tutorial asume that you have already installed Node on your machine if not grap it  [here](https://nodejs.org/en/download/)

### `npm i suspendui`

After installing the package from npm registry import it into your react project like so:

```js
import React, { Component} from "react";
import { SuspendUI } from "suspendui";
import APIReq from "./../modules/request/JQRequest";
import Header from "./header/Header";
import Content from "./content/Content";
import Views from "./Views/Views";


export default class Dashboard extends Component {

  render(){
    return (
      <SuspendUI
          loader={() => {
            return <DashPlaceholder />;
          }}
          errorfallback={() => {
            return <span>Something Went wrong!</span>;
          }}
          fetch={() => {
            return APIReq.Res("resources/v1/pa/oauth/authorized")
              .POST({
                oauth_usn: "saopinvestment@gmail.com",
                oauth_key: "obi",
              })
              .done((res) => {
                // send response to data consumers (update state here with
                // server return data) or update context with new data
                console.log(res);
              });
          }}
        >
          <ErrorHandler message="Error! Couldn't render UIs.">
            {/* <Suspense fallback={<DashPlaceholder />}> */}
            <Header />
            <Content />
            <Views />
            {/* laoders */}
            {/* </Suspense> */}
          </ErrorHandler>
        </SuspendUI> 
    );
 }
}

```

# API Docs
The loader, errorfallback and fetch explained

## loader: `function`
This function returns a valid react JSX element. The loader can been enything you want to show before the content arrive from the api server.

## errorfallback: `function`
This function returns a valid react JSX element. The errorfallback returns ui to display to the user incase the requst promise in the fetch was rejected.

  ### NOTE: 
  The fetch function can toggle the hasError which will cause this function to run if nothing is return this might cause a very bad user experience in production.
  
## fetch:  `function`
This function returns any ajax promise lib request `return $.ajax('api/v1/user/:id')`. The lib must return a promise base chianing of then(res).catch(err).

This function calls the  `.then(res=>{...}).catch(err=>{...})` after invoking the function to make a request to the server but does not cusome the data returned by the request.
you can update you component state or context depending on the use case.
  

# Thenaks for trying this React UI out please do well to report bugs 

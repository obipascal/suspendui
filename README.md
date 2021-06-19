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


#API Docs
The loader, errorfallback and fetch explained

##loader: `function`
  


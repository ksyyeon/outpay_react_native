/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
 import {WebView} from 'react-native-webview';
 
 export default class App extends React.Component {
   render() {
     return (
       <WebView
         source={{
           uri: 'http://172.16.21.58/osiris/.development/appIndex.html?mode=devMode&telNum=010-5060-3160#',
         }}
       />
     );
   }
 }

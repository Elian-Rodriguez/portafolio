import React, { useState, useEffect } from "react";
import * as contentful from "contentful";

const client = contentful.createClient({
    space: process.env.REACT_APP_SPACE,
    environment: process.env.REACT_APP_ENVIRONMENT,
    accessToken: process.env.REACT_APP_ACCESS_TOKEN,
    
  });
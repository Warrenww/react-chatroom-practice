import React from 'react';
import {Alert, AlertTitle} from '@material-ui/lab';

export default function NotLogin() {
  return(
    <Alert severity="warning">
      <AlertTitle>You are not login</AlertTitle>
      Please login to see this page.
    </Alert>
  );
}

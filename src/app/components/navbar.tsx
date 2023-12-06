import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Link from 'next/link';

const Navbar = (): JSX.Element => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Task Manager
        </Typography>
        <Button color="inherit">
          <Link style={{ textDecoration: 'none' }} href='/'>Home</Link>
        </Button>
        <Button color="inherit">
          <Link style={{ textDecoration: 'none' }}  href='/tasks-axios'>Tasks_Axios</Link>
        </Button>
        <Button color="inherit">
          <Link style={{ textDecoration: 'none' }}  href='/tasks'>Tasks_useEffect_For_Comparison_Only</Link>
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar;

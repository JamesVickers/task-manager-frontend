import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Link from 'next/link';

const Navbar = (): JSX.Element => {
  return (
    <AppBar position='static' color='secondary'>
      <Toolbar>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          Task Manager
        </Typography>
        <Button>
          <Link style={{ color: 'white', textDecoration: 'none' }} href='/'>Home</Link>
        </Button>
        <Button>
          <Link style={{ color: 'white', textDecoration: 'none' }} href='/tasks-react-query'>Tasks_React_Query</Link>
        </Button>
        <Button>
          <Link style={{ color: 'white', textDecoration: 'none' }} href='/tasks-use-effect'>Tasks_useEffect_For_Comparison_Only</Link>
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar;

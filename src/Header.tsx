import * as React from 'react'
import { AppBar, Box, Toolbar, Typography, IconButton } from '@mui/material'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'

interface IHeader {
    setIsDask: (isDark: boolean) => void
    isDark: boolean
}
export const Header = React.memo<IHeader>(({ setIsDask, isDark }) => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color={'primary'} enableColorOnDark>
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                        fontWeight="bolder"
                        paddingLeft="1.87rem"
                        className="headerTitle"
                    >
                        Where in the world?
                    </Typography>
                    <div
                        style={{ paddingRight: '1.87rem' }}
                        className="headerMode"
                    >
                        <IconButton
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setIsDask(!isDark)
                            }}
                        >
                            <DarkModeOutlinedIcon />
                            Dark Mode
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    )
})

Header.displayName = 'Header'

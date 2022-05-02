import {
  ClickAwayListener,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined'
import DeliveryDiningOutlinedIcon from '@mui/icons-material/DeliveryDiningOutlined'
import GradingOutlinedIcon from '@mui/icons-material/GradingOutlined'
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined'
import AutoAwesomeMotionOutlinedIcon from '@mui/icons-material/AutoAwesomeMotionOutlined'
import FormatListNumberedOutlinedIcon from '@mui/icons-material/FormatListNumberedOutlined'
import { useTheme } from '@emotion/react'
import { useSelector } from 'react-redux'

const Dashboard = ({ roles }) => {
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const { userInfo } = useSelector((state) => state.userAuth)

  const panelHandler = () => setOpen((open) => !open)

  const options = [
    {
      tab: 'Profile',
      icon: <PermIdentityIcon style={{ color: theme.palette.common.white }} />,
      link: '/user/profile',
      accessBy: [roles.user, roles.provider, roles.admin],
    },
    {
      tab: 'Bookings',
      icon: (
        <BookmarksOutlinedIcon style={{ color: theme.palette.common.white }} />
      ),
      link: '/user/bookings',
      accessBy: [roles.user, roles.provider, roles.admin],
    },
    {
      tab: 'Add Parkade',
      icon: (
        <DeliveryDiningOutlinedIcon
          style={{ color: theme.palette.common.white }}
        />
      ),
      link: '/user/add-parkade',
      accessBy: [roles.provider, roles.admin],
    },
    {
      tab: 'My Parkades',
      icon: (
        <AutoAwesomeMotionOutlinedIcon
          style={{ color: theme.palette.common.white }}
        />
      ),
      link: '/user/my-parkades',
      accessBy: [roles.provider, roles.admin],
    },
    {
      tab: 'All Parkades',
      icon: (
        <FormatListNumberedOutlinedIcon
          style={{ color: theme.palette.common.white }}
        />
      ),
      link: '/user/all-parkades',
      accessBy: [roles.admin],
    },
    {
      tab: 'All Users',
      icon: <GroupOutlinedIcon style={{ color: theme.palette.common.white }} />,
      link: '/user/all-users',
      accessBy: [roles.admin],
    },
    {
      tab: 'New Request',
      icon: (
        <GradingOutlinedIcon style={{ color: theme.palette.common.white }} />
      ),
      link: '/user/new-requests',
      accessBy: [roles.admin],
    },
  ]

  return (
    <Grid container className="db">
      <Grid item md={1} sm={2} xs={2}>
        <Box ml={2} mb={2}>
          <Box mb={1}>
            {open ? (
              <IconButton aria-label="close" onClick={() => panelHandler()}>
                <CloseOutlinedIcon color="secondary" />
              </IconButton>
            ) : (
              <IconButton aria-label="menu" onClick={() => panelHandler()}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    y1="8"
                    x2="24"
                    y2="8"
                    stroke="#a91eff"
                    strokeWidth="3"
                  />
                  <line
                    y1="16"
                    x2="20"
                    y2="16"
                    stroke="#a91eff"
                    strokeWidth="3"
                  />
                </svg>
              </IconButton>
            )}
          </Box>

          <Box
            className="db__left"
            style={{
              width: open ? 'auto' : 60,
              transition: 'all .3s ease',
              zIndex: 10,
            }}
            // onClick={() => panelHandler()}
          >
            <List className="db__list">
              {/* <ClickAwayListener onClickAway={() => setOpen(false)}> */}
              {options.map(
                (data, id) =>
                  data.accessBy.includes(userInfo?.role) && (
                    <Tooltip key={id} title={`${data.tab}`} placement="right">
                      <NavLink
                        to={data.link}
                        end={true}
                        style={{ textDecoration: 'none' }}
                        className={(p) =>
                          p.isActive ? 'db__activeLink' : 'db__inactiveLink'
                        }
                        onClick={() => setOpen(false)}
                      >
                        <ListItemButton style={{ maxHeight: 50 }}>
                          <ListItemIcon sx={{ minWidth: 40 }}>
                            {data.icon}
                          </ListItemIcon>
                          <ListItemText
                            primary={`${data.tab}`}
                            sx={{
                              width: open ? 'auto' : 0,
                              opacity: open ? 1 : 0,
                              transition: 'all .3s ease',
                              color: theme.palette.common.white,
                            }}
                          />
                        </ListItemButton>
                      </NavLink>
                    </Tooltip>
                  )
              )}
              {/* </ClickAwayListener> */}
            </List>
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        p={1}
        md={11}
        sm={10}
        xs={10}
        sx={{ height: '90vh', overflowY: 'auto' }}
      >
        <Box
          sx={{
            background: theme.palette.grey.A100,
            height: '100%',
            overflowY: 'auto',
            borderRadius: '1rem',
            padding: '1rem',
          }}
        >
          <Outlet />
        </Box>
      </Grid>
    </Grid>
  )
}

export default Dashboard

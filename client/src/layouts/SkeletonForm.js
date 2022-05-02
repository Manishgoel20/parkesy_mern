import { Grid, Skeleton } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const SkeletonForm = () => {
  return (
    <Box height="100%" width="100%">
      <Grid spacing={2} container justifyContent="center">
        <Grid
          my={3}
          item
          container
          md={12}
          xs={12}
          justifyContent="space-around"
        >
          {[1, 2, 3].map((x, id) => (
            <Skeleton
              key={id}
              variant="circular"
              animation="wave"
              height={40}
              width={40}
            />
          ))}
        </Grid>

        <Grid item container md={6} xs={12}>
          <Skeleton
            variant="rectangular"
            animation="wave"
            height={60}
            width="100%"
          />
        </Grid>
        <Grid item container md={6} xs={12}>
          <Skeleton
            variant="rectangular"
            animation="wave"
            height={60}
            width="100%"
          />
        </Grid>
        <Grid item container md={6} xs={12}>
          <Skeleton
            variant="rectangular"
            animation="wave"
            height={60}
            width="100%"
          />
        </Grid>
        <Grid item container md={6} xs={12}>
          <Skeleton
            variant="rectangular"
            animation="wave"
            height={60}
            width="100%"
          />
        </Grid>
        <Grid item container md={6} xs={12}>
          <Skeleton
            variant="rectangular"
            animation="wave"
            height={60}
            width="100%"
          />
        </Grid>
        <Grid item container md={6} xs={12}>
          <Skeleton
            variant="rectangular"
            animation="wave"
            height={60}
            width="100%"
          />
        </Grid>
        <Grid item container md={6} xs={12}>
          <Skeleton
            variant="rectangular"
            animation="wave"
            height={60}
            width="100%"
          />
        </Grid>
        <Grid item container md={6} xs={12}>
          <Skeleton
            variant="rectangular"
            animation="wave"
            height={60}
            width="100%"
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default SkeletonForm

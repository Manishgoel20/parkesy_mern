import { Grid, Skeleton } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const SkeletonList = ({ lt, rt }) => {
  return (
    <>
      {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((x, id) => (
        <Box mb={2} className="card" key={id}>
          <Grid container spacing={2} justifyContent="space-between">
            <Grid item md={lt ? lt : 2} xs={lt ? lt : 2}>
              <Skeleton
                variant="rectangular"
                animation="wave"
                height={150}
                width="100%"
              />
            </Grid>
            <Grid
              item
              md={rt ? rt : 8}
              xs={rt ? rt : 8}
              pr={1}
              mt={2}
              container
            >
              <Box width="100%">
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  height={30}
                  style={{ marginBottom: 10 }}
                />

                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  height={10}
                  style={{ marginBottom: 5 }}
                />
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  height={10}
                  style={{ marginBottom: 5 }}
                />

                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  height={10}
                  style={{ marginBottom: 5 }}
                />

                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  height={10}
                  width="60%"
                  style={{ marginBottom: 5 }}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      ))}
    </>
  )
}

export default SkeletonList

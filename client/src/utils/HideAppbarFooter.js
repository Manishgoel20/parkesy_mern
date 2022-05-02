export const HideAppbarFooter = () => {
  const appbar = document.getElementById('appbar')
  // const footer = document.getElementById('footer')

  appbar.style.display = 'none'
  // footer.style.display = 'none'
}

export const ShowAppbarFooter = () => {
  const appbar = document.getElementById('appbar')
  // const footer = document.getElementById('footer')

  appbar.style.display = 'initial'
  // footer.style.display = 'initial'
}

export const HideBody = () => {
  document.body.style.overflow = 'hidden'
}
export const ShowBody = () => {
  document.body.style.overflow = 'initial'
}

// export const HideBody = () => {
//   document.body.style.height = '100vh'
//   document.body.style.width = '100vw'
// }
// export const ShowBody = () => {
//   document.body.style.height = 'initial'
//   document.body.style.width = 'initial'
// }

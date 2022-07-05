import darkBack from './assets/images/darkBack.png'
import lightBack from './assets/images/lightBack.png'

export const theme = {
  colors: {
    main: {
      800: '#a7e657',
      400: '#0ad6eb',
      500: '#0b0c10',
      600: '#0b0c10',
      700: '#0b0c10',
      900: '#0b0c10',
      300: '#66fcf1',
      200: '#66fcf1',
    },
    text: {
      400: '#c5c6c7',
    },
    back: {
      400: '#1f2833',
      800: '#ffffff',
    },
    header: {
      400: '#0b0c10',
      800: '#000000',
    },
    link: {
      400: '#0ad6eb',
    },
  },
  /*  components: props => ({
    Button: {
      baseStyle: {
        background: () => (props.colorMode === 'dark' ? 'main.400' : 'main.800'),
      },
    },
  }), */
  components: {
    Divider: {
      baseStyle: props => ({
        borderColor: () => {
          console.log('props: ', props)
          return (props.colorMode === 'dark' ? 'white' : 'black')
        },
        opacity: 0.2,
      }),
    },
    Button: {
      baseStyle: props => ({
        bg: () => {
          console.log('props: ', props)
          return (props.colorMode === 'dark' ? 'main.400' : 'main.800')
        },
      }),
      _hover: props => ({
        bg: 'none',
        border: () => `1px solid ${props.colorMode === 'dark' ? 'main.400' : 'main.800'}`,
      }),
    },
  },
  styles: {
    global: props => ({
      p: {
        color: () => (props.colorMode === 'dark' ? 'white' : 'black'),
      },
      body: {
        fontSize: 14,
        background: () => (`url(${props.colorMode === 'dark' ? darkBack : lightBack}) center / cover`),
        // color: () => (props.colorMode === 'dark' ? 'white' : 'black'),
      },
      header: {
        h: '36px',
        py: 3,
        bg: () => (props.colorMode === 'dark' ? 'header.400' : 'header.800'),
      },
      h1: {
        fontSize: 20,
        fontWeight: 700,
        color: () => (props.colorMode === 'dark' ? 'main.400' : 'main.800'),
        textShadow: () => (props.colorMode === 'dark' ? 'none' : '-1px 1px 0 #000, '
          + '1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000'),
        marginBottom: 5,
      },
      Checkbox: {
        _focus: {
          boxShadow: 'none !important',
        },
        _checked: {
          background: 'main.400 !important',
        },
      },
      Button: {
        px: 2,
        fontSize: 14,
        _hover: {
          boxShadow: 'none !important',
        },
        _active: {
          boxShadow: 'none !important',
        },
        _focus: {
          boxShadow: 'none !important',
        },
      },
      a: {
        fontWeight: 700,
        textDecoration: 'underline',
        _hover: {
          textDecoration: 'underline',
        },
      },
    }),
  },
}

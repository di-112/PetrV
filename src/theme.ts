import darkBack from './assets/images/darkBack.png'
import lightBack from './assets/images/lightBack.png'

export const theme = {
  colors: {
    main: {
      800: '#000000',
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
    green: {
      400: '#a7e657',
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
  components: {
    Divider: {
      baseStyle: props => ({
        borderColor: () => (props.colorMode === 'dark' ? 'white' : 'black'),
        opacity: 0.2,
      }),
    },
    Input: {
      baseStyle: {
        field: {
          border: '1px solid rgb(226, 232, 240)',
          color: 'black',
          '::placeholder': {
            color: 'gray.400',
          },
        },
      },
      variants: {
        main: {
          display: 'block',
          background: 'white',
          color: 'black',
          '::placeholder': {
            color: 'gray.400',
          },
        },
      },
      defaultProps: {
        variant: 'main',
      },
    },
    Select: {
      baseStyle: {
        field: {
          border: '1px solid rgb(226, 232, 240)',
          background: 'white',
          color: 'black',
          '::placeholder': {
            color: 'gray.400',
          },
        },
      },
    },
    Textarea: {
      baseStyle: {
        field: {
          border: '1px solid rgb(226, 232, 240)',
          color: 'black',
          '::placeholder': {
            color: 'gray.400',
          },
        },
      },
      variants: {
        main: {
          display: 'block',
          background: 'white',
          color: 'black',
          '::placeholder': {
            color: 'gray.400',
          },
        },
      },
      defaultProps: {
        variant: 'main',
      },
    },

    Button: {
      baseStyle: props => ({
        background: props.colorMode === 'dark' ? 'main.400' : 'green.400',
        borderWidth: '2px',
        color: 'black',
        borderStyle: 'solid',
        borderColor: props.colorMode === 'dark' ? 'main.400' : 'green.400',
        _hover: {
          bg: 'none',
        },
        _focus: {
          boxShadow: 'none !important',
        },
      }),
      variants: {
        unstyled: {
          borderWidth: 0,
        },
        main: props => ({
          background: props.colorMode === 'dark' ? 'main.400' : 'green.400',
          borderWidth: '2px',
          color: 'black',
          borderStyle: 'solid',
          borderColor: props.colorMode === 'dark' ? 'main.400' : 'green.400',
          _hover: {
            bg: 'none',
            color: props.colorMode === 'dark' ? 'main.400' : 'green.400',
          },
          _focus: {
            boxShadow: 'none !important',
          },
        }),
      },
      defaultProps: {
        variant: 'main',
      },
    },
    Checkbox: {
      baseStyle: props => ({
        borderColor: () => (props.colorMode === 'dark' ? 'main.400' : 'green.400'),
        _focus: {
          boxShadow: 'none !important',
        },
        _checked: {
          background: 'main.400 !important',
        },
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
        marginBottom: 5,
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

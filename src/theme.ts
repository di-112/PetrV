export const theme = {
  colors: {
    main: {
      800: '#45a28e',
      400: '#0ad6eb',
      300: '#66fcf1',
      200: '#66fcf1',
    },
    text: {
      400: '#c5c6c7',
    },
    bg: {
      400: '#1f2833',
    },
    header: {
      400: '#0b0c10',
    },
    link: {
      400: '#0ad6eb',
    },
  },
  styles: {
    global: {
      body: {
        fontSize: 14,
        bg: 'bg.400',
        color: 'white',
      },
      header: {
        h: '36px',
        py: 3,
        bg: 'header.400',
      },
      h1: {
        fontSize: 20,
        fontWeight: 700,
        color: 'main.400',
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

      button: {
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
        color: '#4f9fee',
        fontWeight: 700,
        textDecoration: 'underline',
        _hover: {
          textDecoration: 'underline',
        },
      },
    },
  },
}

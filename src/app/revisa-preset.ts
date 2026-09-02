import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';


export const RevisaPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#fdf8ee',
      100: '#faedd3',
      200: '#f4d9a4',
      300: '#ecc06f',
      400: '#e3a744',
      500: '#d99327',
      600: '#c4841f',
      700: '#b57a16',
      800: '#9c6712',
      900: '#8a5c0f',
      950: '#5c3d0a',
    },
    colorScheme: {
      light: {
        surface: {
          0: '#ffffff',
          50: '#fbf9f5',
          100: '#f3eee4',
          200: '#e7e0d5',
          300: '#ddd4c6',
          400: '#c4b8a5',
          500: '#8a827a',
          600: '#6b625a',
          700: '#57504a',
          800: '#3d352a',
          900: '#1c1917',
          950: '#12100e',
        },
        formField: {
          background: '#fdfcfa',
          borderColor: '{surface.300}',
          hoverBorderColor: '{surface.400}',
          focusBorderColor: '{primary.500}',
          color: '{surface.900}',
          placeholderColor: '{surface.500}',
        },
        text: {
          color: '{surface.900}',
          mutedColor: '{surface.700}',
        },
        content: {
          background: '#ffffff',
          borderColor: '{surface.200}',
        },
      },
    },
    formField: {
      paddingX: '1rem',
      paddingY: '0.9375rem',
      borderRadius: '0.625rem',
      fontSize: '1rem',
    },
    focusRing: {
      width: '2px',
      style: 'solid',
      color: '{primary.500}',
      offset: '2px',
    },
  },
  components: {
    floatlabel: {
      root: {
        color: '{surface.500}',
        activeColor: '{surface.800}',
        active: {
          fontSize: '0.875rem',
          fontWeight: '600',
        },
      },
      over: {
        active: {
          top: '-1.5rem',
        },
      },
      in: {
        input: {
          paddingTop: '1.75rem',
          paddingBottom: '0.75rem',
        },
        active: {
          top: '0.625rem',
        },
      },
    },
    iftalabel: {
      root: {
        top: '0.625rem',
        fontSize: '0.75rem',
      },
      input: {
        paddingTop: '1.75rem',
        paddingBottom: '0.75rem',
      },
    },
  },
});

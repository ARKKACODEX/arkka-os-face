import * as styled from "styled-components";

const GlobalStyle = styled.createGlobalStyle`
  *,
  *::before,
  *::after {
    border: 0;
    box-sizing: border-box;
    cursor: default;
    font-variant-numeric: tabular-nums;
    margin: 0;
    outline: 0;
    padding: 0;
    -webkit-tap-highlight-color: transparent;
    text-rendering: optimizeLegibility;
    -webkit-touch-callout: none;
    user-select: none;
  }

  body,
  html {
    font-family: ${({ theme }) => theme.formats.systemFont};
  }

  body {
    height: 100%;
    overflow: hidden;
    position: fixed;
    text-size-adjust: none;
  }

  html {
    background-color: ${({ theme }) => theme.colors.background};
    /* stylelint-disable value-no-vendor-prefix */
    height: -webkit-fill-available;
    height: -moz-available;
    /* stylelint-enable value-no-vendor-prefix */

    &::before,
    &::after {
      background-blend-mode: var(--background-blend-mode);
      background-position: center;
      content: "";
      height: 100%;
      position: absolute;
      transition: opacity var(--background-transition-timing, 0s) ease-in-out;
      width: 100%;
      z-index: -1;
    }

    &::before {
      background: var(--before-background);
      opacity: var(--before-background-opacity, 0%);
    }

    &::after {
      background: var(--after-background);
      opacity: var(--after-background-opacity, 100%);
    }
  }

  input::selection,
  textarea::selection {
    background-color: rgb(0 120 215);
    color: #fff;
  }

  input,
  textarea {
    cursor: text;
    user-select: text;
  }

  picture > img {
    display: block;
  }

  ol,
  ul {
    list-style: none;
  }
`;
/* ================================================= */
  /* ARKKA OS - ESTILO DACHLY (OVERRIDE) - FASE 2 COMPLETA */
  /* ================================================= */

  /* 1. VARIÁVEIS DE COR E FUNDO (TEMA DARK BASE) */
  :root {
    /* Fundo super escuro (quase preto) - Primário */
    --color-dark-bg: #0B0B0E;   
    /* Fundo para elementos flutuantes (transparente) */
    --color-float-bg: rgba(11, 11, 14, 0.9);
    /* Roxo/Magenta Vibrante para destaque (Primário) */
    --color-primary-arkka: #7D55F3; 
    /* Cor secundária para brilho (Neon) */
    --color-secondary-arkka: #E600FF; 
    /* Cor do texto principal (Claro/Cinza) */
    --color-text-main: #e0e0e0;
    /* Cor do texto sutil/secundário */
    --color-text-secondary: #a0a0a0;
    /* Cor da borda de Glassmorphism (suave) */
    --color-border-glass: rgba(125, 85, 243, 0.3);
    /* Intensidade do desfoque */
    --blur-intensity: 20px;

    /* Aplica o fundo escuro global */
    --color-background: var(--color-dark-bg);
    background-color: var(--color-background);
  }

  body {
    color: var(--color-text-main);  
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  /* 2. GLASSMORPHISM (JANELAS E ELEMENTOS FLUTUANTES) */
  .window, .taskbar, .start-menu, .context-menu, .popup {
    background-color: var(--color-float-bg) !important; 
    backdrop-filter: blur(var(--blur-intensity)) !important;
    -webkit-backdrop-filter: blur(var(--blur-intensity)) !important;
    border: 1px solid var(--color-border-glass) !important; 
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
    border-radius: 12px;
    color: var(--color-text-main);
  }

  /* 3. ESTADOS DE INTERAÇÃO (HOVER, FOCO E BOTÕES) */
  .window:focus-within {
    border: 1px solid rgba(125, 85, 243, 0.7) !important;
  }

  .button {
    background-color: rgba(255, 255, 255, 0.05); 
    color: var(--color-text-main);
    border: none;
    border-radius: 6px;
    padding: 8px 15px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .button:hover {
    background-color: rgba(125, 85, 243, 0.2) !important; 
    box-shadow: 0 0 5px rgba(125, 85, 243, 0.5); 
  }

  .button.primary {
    background-color: var(--color-primary-arkka) !important;
    color: #ffffff;
    font-weight: bold;
  }

  .taskbar button:hover, .start-menu li:hover, .list-item:hover {
    background-color: var(--color-primary-arkka);
    color: #ffffff;
    border-radius: 8px;  
    transition: background-color 0.2s, color 0.2s;
  }

  /* 4. ELEMENTOS DE FORMULÁRIO E INPUTS */
  input[type="text"], input[type="password"], textarea {
    background-color: rgba(255, 255, 255, 0.08); 
    color: var(--color-text-main);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 6px;
    padding: 10px;
    transition: border-color 0.2s;
  }

  input:focus, textarea:focus {
    border-color: var(--color-primary-arkka); 
    outline: none;
    box-shadow: 0 0 5px rgba(125, 85, 243, 0.5);
  }

  /* 5. SCROLLBARS (Opcional - Customização do Navegador) */
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  ::-webkit-scrollbar-track {
    background: var(--color-dark-bg);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--color-primary-arkka);
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--color-secondary-arkka);
  }
`; // A crase de fechamento do template literal deve estar AQUI

export default GlobalStyle;

import { useCallback } from 'react';
import type { ComponentType } from 'react';
import { BASE_2D_CONTEXT_MENU } from 'components/system/StartMenu/constants';
import { useMenu } from 'contexts/menu';
import { useProcesses } from 'contexts/process';
import { useSession } from 'contexts/session';
import { useTheme } from 'contexts/theme';
import type { MenuContextProps } from 'contexts/menu/useMenu';
import { useGlobalContext } from 'contexts/global';
import type { GlobalContextState } from 'contexts/global';
import type { NotificationProps } from 'types/components/system/taskbar/Notification'; 

// 1. URL COMPLETA DO CÉREBRO (Render) - AJUSTE AQUI SE NECESSÁRIO
const BRAIN_API_URL = 'https://arkka-os-brain.onrender.com/api/codex';

// 2. FUNÇÃO CRÍTICA DE INTEGRAÇÃO (Chamada no backend)
const sendCommandToBrain = async (command: string, notification: (props: NotificationProps) => void, closeStartMenu: () => void) => {
    
    // Notificação de 'Pensando...'
    notification({
        title: 'Codex AI',
        message: 'A analisar o seu pedido... (Processo de 6 passos iniciado)',
        icon: '/Icons/codex.svg',
        autoClose: 5000,
    });
    
    closeStartMenu(); // Fecha o menu iniciar

    try {
        const response = await fetch(BRAIN_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ command }),
        });

        if (!response.ok) {
            // Se o status for 4xx ou 5xx (erro do servidor)
            throw new Error(`Erro de Servidor: ${response.status}`);
        }

        const data = await response.json(); // Recebe o JSON do Prompt 4
        
        // 3. Exibe a mensagem final da IA
        notification({
            title: 'Codex AI',
            message: data.userMessage || 'Comando executado, mas a resposta da IA é incompleta.',
            icon: '/Icons/codex.svg',
            autoClose: 15000,
        });

    } catch (error: any) {
        // Exibe o erro
        notification({
            title: 'Erro no Sistema ARKKA',
            message: `Falha na comunicação com o Cérebro. Motivo: ${error.message.substring(0, 100)}`,
            icon: '/Icons/error.svg',
        });
        console.error('Erro na comunicação com o Cérebro:', error);
    }
};


// 4. COMPONENTE STARTMENU
const StartMenu: ComponentType<MenuContextProps> = ({
  x,
  y,
  ...menuContext
}) => {
  const { url } = useGlobalContext() as GlobalContextState;
  const { contextMenu } = useMenu();
  const { minimize } = useProcesses();
  const { session, setSession } = useSession();
  const { setThemeName } = useTheme();

  // 5. SUBSTITUIÇÃO DA LÓGICA DE PESQUISA
  const onSearch = useCallback(
    (value: string) => {
      const { closeStartMenu, notification } = useGlobalContext() as GlobalContextState;
      
      // LÓGICA DE INTEGRAÇÃO DO CÉREBRO:
      if (value) {
        // Chama a função de integração em vez da lógica de busca local
        sendCommandToBrain(value, notification, closeStartMenu);
      } else {
        closeStartMenu();
      }
    },
    [contextMenu, minimize, session, setSession, setThemeName, url]
  );
  
  // Aqui você deve retornar o JSX do StartMenu...
  return (
    <div
      // Adaptar o restante do seu componente StartMenu aqui.
    >
      {/* Exemplo de barra de pesquisa que chama onSearch */}
      <input type="text" onChange={(e) => onSearch(e.target.value)} />
    </div>
  );
};
export default StartMenu;

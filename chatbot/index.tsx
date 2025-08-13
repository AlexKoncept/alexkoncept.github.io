import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { createRoot } from 'react-dom/client';

// --- ACTION REQUISE ---
// Remplacez cette URL par celle de votre fonction Netlify une fois déployée.
// Le format sera : https://NOM-DE-VOTRE-APP.netlify.app/api/chat
const API_PROXY_URL = 'https://alexbotfromalexkonceptuniverse.netlify.app/api/chat';

// Chemin absolu depuis la racine du site, plus robuste pour l'intégration.
const avatarImage = "/chatbot/avatar.png";

const cleanResponseText = (text: string): string => {
    return text.replace(/[*#]/g, '').replace(/^\s*[-•]\s*/gm, '');
};

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Vérifie si l'URL du proxy API a bien été configurée.
    useEffect(() => {
        if (API_PROXY_URL.includes('YOUR_NETLIFY_APP_NAME')) {
            const errorMessage = "Erreur de configuration : L'URL du proxy API n'est pas définie. Mettez à jour la variable `API_PROXY_URL` dans `index.tsx` avec l'URL de votre fonction Netlify.";
            setMessages([{ role: 'model', text: errorMessage }]);
            console.error(errorMessage);
        }
    }, []);


    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading]);

    const handleSendMessage = async (e: FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = { role: 'user' as const, text: input };
        const currentMessages = [...messages, userMessage];
        setMessages(currentMessages);
        const userInput = input;
        setInput('');
        setIsLoading(true);

        const history = currentMessages.slice(0, -1);
        
        setMessages(prev => [...prev, { role: 'model', text: '' }]); 

        try {
            const response = await fetch(API_PROXY_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    history: history,
                    message: userInput,
                }),
            });

            if (!response.ok || !response.body) {
                const errorText = await response.text();
                throw new Error(`Erreur de l'API: ${response.status} - ${errorText}`);
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let botResponse = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                
                botResponse += decoder.decode(value, { stream: true });
                
                setMessages(prev => {
                    const newMessages = [...prev];
                    const lastMessage = newMessages[newMessages.length - 1];
                    if (lastMessage.role === 'model') {
                        lastMessage.text = cleanResponseText(botResponse);
                    }
                    return newMessages;
                });
            }

        } catch (error) {
            console.error("Erreur lors de l'envoi du message:", error);
            const errorMsg = { role: 'model' as const, text: "Oups! Je rencontre un problème de communication avec mes circuits. Veuillez réessayer."};
            setMessages(prev => {
                const newMessages = [...prev];
                const lastMessage = newMessages[newMessages.length - 1];
                if (lastMessage?.role === 'model' && lastMessage.text === '') {
                     newMessages[newMessages.length - 1] = errorMsg;
                     return newMessages;
                }
                return [...newMessages, errorMsg];
            });
        } finally {
            setIsLoading(false);
        }
    };
    
    const toggleChat = () => setIsOpen(!isOpen);

    const handleRestart = () => {
        if (isLoading) return;
        setMessages([]);
    };

    return (
        <>
            <div className={`chat-window ${isOpen ? 'open' : ''}`}>
                <div className="chat-header">
                     <img src={avatarImage} alt="AlexBot Avatar" className="avatar" />
                    <span>AlexBot</span>
                    <button onClick={handleRestart} className="restart-button" aria-label="Recommencer la conversation" disabled={isLoading}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/></svg>
                    </button>
                </div>
                <div className="message-list">
                    {messages.length === 0 && isOpen && (
                         <div className="message bot-message">
                            Bonjour ! Je suis AlexBot, l'assistant virtuel d'Alex. En quoi puis-je vous aider à explorer ses projets ?
                        </div>
                    )}
                    {messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.role === 'user' ? 'user-message' : 'bot-message'}`}>
                            {msg.role === 'model' && msg.text === '' && isLoading ? (
                                <div className="loading-indicator">
                                    <span />
                                    <span />
                                    <span />
                                </div>
                            ) : (
                                msg.text
                            )}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                <form className="chat-input-form" onSubmit={handleSendMessage}>
                    <input
                        type="text"
                        className="chat-input"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Posez votre question..."
                        disabled={isLoading}
                        aria-label="Votre message"
                    />
                    <button type="submit" className="send-button" disabled={isLoading || !input.trim()}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                    </button>
                </form>
            </div>
            <button className={`chat-bubble-button ${isOpen ? 'open' : ''}`} onClick={toggleChat} aria-label="Ouvrir le chat">
                 <svg className="icon-open" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M21 6h-2v9H6v2c0 1.1.9 2 2 2h11l4 4V8c0-1.1-.9-2-2-2zm-4 6V4c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v13l4-4h9c1.1 0 2-.9 2-2z"/></svg>
                 <svg className="icon-close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
            </button>
        </>
    );
};

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(<ChatBot />);
}
